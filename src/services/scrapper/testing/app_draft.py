from rich import print
import json
import requests
import time

from bs4 import BeautifulSoup
import re

from datetime import date
from pydantic import AliasPath, BaseModel, Field
from typing import List, Literal, Optional

import numpy as np
import chromadb


from consts import DESCRIPTION, PROFIL, HEADERS, ld, OLLAMA_GENERATE_URL, OLLAMA_EMBED_URL


def cosine(a, b):
  a = np.array(a).flatten()
  b = np.array(b).flatten()
  return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def chunk_text(html):
  soup = BeautifulSoup(html, "lxml")
  text = BeautifulSoup(soup.prettify(), "lxml").getText()
  clean = re.sub(r"[ \t\r\f\v]{1,}", " ", text)
  clean = re.sub(r"\n+", "\n", clean)
  return [re.sub("\n", " ", c).strip() for c in clean.split("\n") if len(c) > 2]


def clean_up(html):
  soup = BeautifulSoup(html, "lxml")
  text = BeautifulSoup(soup.prettify(), "lxml").getText()
  clean = re.sub(r"[ \t\r\f\v]{1,}", " ", text)
  clean = re.sub(r"\n*", "", clean)
  return clean

  # "prompt": "extract the information from the following schema.org JobPosting json\n"
  # + json.dumps(ld),

  # payload = {
  #   "model": "gemma3",
  #   "prompt": "Read the following job offer json and extract data from it, if it is a programming job, precise what position it is. Return as json : \n"
  #   + json.dumps(ld),
  #   # "messages": [
  #   #   {"role": "system", "content": "You are an efficient data extractor"},
  #   #   {
  #   #     "role": "user",
  #   #     "content": json.dumps(ld),
  #   #   },
  #   # ],
  #   "stream": False,
  #   "think": False,
  #   "keep_alive": -1,
  #   "option": {
  #     "temperature": 0,
  #     "num_predict": 150,
  #   },
  #   "format": JobOffer.model_json_schema(),
  # }

  # r = requests.post(
  #   # "http://localhost:11434/api/chat",
  #   "http://localhost:11434/api/generate",
  #   headers=headers,
  #   data=json.dumps(payload),
  # )

  # with open("cmd.txt", "a") as f:
  #   f.write(json.dumps(r.json()["response"]))

  # print(r.json()["response"])
  #
  #
  #
  #
  #


class JobOffer(BaseModel):
  """Information about the job offer"""

  title: str = Field(description="Title of the offer", alias="title")
  company_name: str = Field(
    description="hiring organisation name", validation_alias=AliasPath("hiringOrganization", "name")
  )
  location: str = Field(
    description="City name", validation_alias=AliasPath("jobLocation", "address", "addressLocality")
  )
  contract_type: str = Field(validation_alias="employmentType")

  # is_it: bool = Field(
  #   description="Is the job position about software development"
  # )
  # [category for category in software_engineering_categories].contains(occupationalCategory)


def make_embeddings(text):
  url = "http://localhost:11434/api/embed"
  payload = json.dumps({"model": "nomic-embed-text", "input": text})
  req = requests.post(OLLAMA_EMBED_URL, headers=HEADERS, data=payload)
  if not req.json():
    print(req.reason)
    return "okey"

  embeddings = req.json()["embeddings"]
  return embeddings


def embed(chunk):
  payload = json.dumps({"model": "qwen3-embedding", "input": chunk})
  r = requests.post(OLLAMA_EMBED_URL, headers=HEADERS, data=payload)
  return r.json()["embeddings"]


def gen_from_embeds(query, embedded_query, embedded_chunks):
  top_chunk = max(embedded_chunks, key=lambda chunk: cosine(chunk[1], embedded_query))[0]
  prompt = f"Use this data: \n\n {top_chunk} \n\nQuestion: {query}"

  req = requests.post(
    OLLAMA_GENERATE_URL,
    headers=HEADERS,
    json={"model": "gemma3", "prompt": prompt, "format": "json", "think": False, "stream": False},
  )
  return req.json()["response"]


def extract(ld):
  targets = ["title", "hiringOrganization", "jobLocation"]
  d = {key: ld[key] for key in ld.keys() if key in targets}
  return d


def mainbak():
  start_time = time.time()
  extract(ld)

  chunks = chunk_text(DESCRIPTION)
  embedded_chunks = [(chunk, embed(chunk)) for chunk in chunks]

  query = "Nom de l'entreprise qui fait l'offre d'emploi"
  embedded_query = embed(query)

  res = gen_from_embeds(query, embedded_query, embedded_chunks)
  print(res)

  end_time = time.time() - start_time
  print(f"ELAPSED : {end_time:.4f}")


def main_w_chroma():
  start_time = time.time()
  doc = chunk_text(DESCRIPTION)
  client = chromadb.Client()
  collection = client.create_collection("job-description")

  collection.add(documents=doc, ids=[str(index) for index in range(len(doc))])

  results = collection.query(query_texts=["Nom de l'entreprise"])

  print(results)

  end_time = time.time() - start_time
  print(f"ELAPSED : {end_time:.4f}")


class jf(BaseModel):
  first: str = Field(description="first name", alias="prenom")
  last: str = Field(description="last name", validation_alias="nom")


def main():
  # - [ ] create a joboffer model from the schema org
  # - [ ] lookup: user = User(**some_data) # called a keywords arguments
  start_time = time.time()

  d = {"nom": "john", "prenom": "doe"}

  x = JobOffer(**ld)
  print(x.model_dump())

  end_time = time.time() - start_time
  print(f"ELAPSED : {end_time:.4f}")


if __name__ == "__main__":
  main()

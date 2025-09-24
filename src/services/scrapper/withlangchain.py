import os
import json

import bs4
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_ollama.llms import OllamaLLM
from langchain_ollama import ChatOllama
from langchain_text_splitters import RecursiveCharacterTextSplitter

from pydantic import BaseModel, Field
from typing import List, Optional, Type


class JobOfferData(BaseModel):
  title: str = Field(description="Titre du post")
  city: str = Field(description="Ville, localisation de l'ffre")
  tech_stack: List[str] = Field(
    description="Technologies utilisées pour ce poste"
  )


class Scrapper:
  def __init__(
    self,
    schema: Optional[Type[BaseModel]] = JobOfferData,
    model: str = "llama3.2",
    embedding_model: str = "nomic-embed-text",
    question: str = "extract job offer information",
  ):
    self.question = question
    self.embeddings = OllamaEmbeddings(model=embedding_model)
    self.llm = ChatOllama(model=model).with_structured_output(
      schema, method="json_schema"
    )
    self.splitter = RecursiveCharacterTextSplitter(
      chunk_size=1200, chunk_overlap=100, add_start_index=True
    )

  def _handle_url(self, url: str):
    loader = WebBaseLoader(url)
    docs = loader.load()
    splits = self.splitter.split_documents(docs)
    vectorstore = Chroma.from_documents(
      documents=splits, embedding=self.embeddings
    )

    retriever = vectorstore.as_retriever(
      search_type="similarity", search_kwargs={"k": 3}
    )

    retrieved_docs = retriever.invoke(self.question)
    self.context = " ".join([doc.page_content for doc in retrieved_docs])

  def _prompt(self):
    return f"""Answer the question according to the context given very briefly:
              Question: {self.question}.
              Context: {self.context}
    """

  def scrap(self, url: str):
    self._handle_url(url)
    response = self.llm.invoke(self._prompt())
    print(response)


def main():
  url = "https://cgi.njoyn.com/corp/xweb/XWeb.asp?page=jobdetails&clid=21001&JobID=J0125-0411&BRID=1199099&sbdid=936&lang=2&xpse=SoDM6_I3t7QRTHgMB70LbzkdCdPP&xfps=99568702-dc4a-43f3-b8fc-763ac0bc0575"

  s = Scrapper()
  result = s.scrap(url)
  print(json.dumps(result, indent=2))


if __name__ == "__main__":
  os.environ["USER_AGENT"] = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
  )
  main()

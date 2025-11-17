from typing import List, Optional
from scrapling.fetchers import StealthyFetcher, StealthySession
from urllib.parse import urlparse, parse_qs
from langchain_ollama import ChatOllama
from pydantic import BaseModel, Field
import json

from models import JobOffer

# notes
# - [ ] xpath selector ?
# - [ ] peut être qu'on peut créer un faux compte linkedin avec lequel on pourraît fetch?..
# - [ ] add browser session when deployed with docker
# - [ ] Error handling
# - [ ] logger


StealthyFetcher.adaptive = True


# class Diplome(BaseModel):
#   """Information sur un diplôme"""
#
#   niveau: int = Field(description="Niveau du diplôme")
#   domaine: str = Field(description="Domaine du diplôme")
#
#
# class JobOff(BaseModel):
#   """Information about the job offer"""
#
#   ville: str = Field(description="Nom de la ville")
#   nom_entreprise: str = Field(description="Nom de l'entreprise qui recrute")
#   diplome: Optional[Diplome] = Field(
#     description="Diplôme mentionné ou requis"
#   )
#   tech_stack: Optional[List[str]] = Field(
#     description="Les technologies utilisées, Si l'offre est dans le domaine du numérique",
#     default=None,
#   )


def handle_indeed_url(url):
  base = "https://fr.indeed.com/viewjob?jk="
  id = parse_qs(urlparse(url).query)["vjk"][0]
  if not id:
    return url
  return base + id


def get_page(url):
  print("BREAKPONT: CALL TO scrapling")
  if "linkedin" in url:
    return "Cannot handle linkedin"

  elif "indeed" in url:
    url = handle_indeed_url(url)

  with StealthySession(
    headless=True,
    solve_cloudflare=True,
    geoip=True,
  ) as s:
    page = s.fetch(url)

  # fetcher = StealthyFetcher.fetch(
  #   headless=True,
  #   solve_cloudflare=True,
  #   geoip=True,
  # )

  print("BREAKPONT: END TO fetcher")
  with open("./data.html", "w") as f:
    f.write(page.html_content)
    f.close()

  print("BREAKPONT: END TO scrapling")
  return page


def get_ldjson(page) -> str | None:
  lds = page.css('script[type="application/ld+json"]')

  for ld in lds:
    if "JobPosting" in ld.html_content:
      return json.dumps(ld.json())


def get_do_your_best(page):
  return "the body of the job offer"


def extract_to_structured(data):
  print("BREAKPONT: CALL TO ollama")
  # num_predict, repeat_last_n, keep_alive = "10m"
  # Q: Comment est ce que je peux acceder au mmême model
  llm = ChatOllama(
    model="gemma3:1b", reasoning=False, temperature=0.7, keep_alive=-1
  ).with_structured_output(JobOffer)  # possible ?

  # structllm = llm.with_structured_output(JobOffer)

  r = llm.invoke(data)
  jso = r.model_dump_json(indent=2)

  return jso


def main(url):
  page = get_page(url)
  data = get_ldjson(page)
  struc = extract_to_structured(data)
  print(struc)


if __name__ == "__main__":
  url = "https://www.hellowork.com/fr-fr/emplois/68058246.html"
  main(url)

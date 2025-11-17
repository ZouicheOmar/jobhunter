from typing import List, Optional
from scrapling.fetchers import StealthyFetcher
from urllib.parse import urlparse, parse_qs
from langchain_ollama import ChatOllama
from pydantic import BaseModel, Field
import json

# notes
# - [ ] xpath selector ?
# - [ ] peut être qu'on peut créer un faux compte linkedin avec lequel on pourraît fetch?..
# - [ ] add browser session when deployed with docker
# - [ ] Error handling
# - [ ] logger


StealthyFetcher.adaptive = True


class Diplome(BaseModel):
  """Information sur un diplôme"""

  niveau: int = Field(description="Niveau du diplôme")
  domaine: str = Field(description="Domaine du diplôme")


class JobOff(BaseModel):
  """Information about the job offer"""

  ville: str = Field(description="Nom de la ville")
  nom_entreprise: str = Field(description="Nom de l'entreprise qui recrute")
  diplome: Optional[Diplome] = Field(
    description="Diplôme mentionné ou requis"
  )
  tech_stack: Optional[List[str]] = Field(
    description="Les technologies utilisées, Si l'offre est dans le domaine du numérique",
    default=None,
  )


def handle_indeed_url(url):
  base = "https://fr.indeed.com/viewjob?jk="
  id = parse_qs(urlparse(url).query)["vjk"][0]
  if not id:
    return url
  return base + id


def get_page(url):
  if "linkedin" in url:
    return "Cannot handle linkedin"

  elif "indeed" in url:
    url = handle_indeed_url(url)

  page = StealthyFetcher.fetch(
    url=url,
    headless=True,
    solve_cloudflare=True,
    geoip=True,
  )

  with open("./data.html", "w") as f:
    f.write(page.html_content)
    f.close()

  return page


def get_ldjson(page) -> str | None:
  lds = page.css('script[type="application/ld+json"]')

  for ld in lds:
    if "JobPosting" in ld.html_content:
      return ld.json()


def get_do_your_best(page):
  return "the body of the job offer"


def extract_to_structured(data):
  llm = ChatOllama(model="gemma3:1b", reasoning=False, temperature=0.7)
  structllm = llm.with_structured_output(JobOff)

  r = structllm.invoke(data)
  jso = r.model_dump_json(indent=2)

  return jso


def main():
  url = "https://www.hellowork.com/fr-fr/emplois/71652236.html"
  page = get_page(url)
  data = get_ldjson(page)
  struc = extract_to_structured(json.dumps(data))
  print(struc)


if __name__ == "__main__":
  main()

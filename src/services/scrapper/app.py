from flask import Flask, request
from pydantic import ValidationError
from scrapling.fetchers import StealthyFetcher

from models import JobPosting
from service import JobhunterUrlService

app = Flask(__name__)
jhser = JobhunterUrlService()


@app.after_request
def add_headers(response):
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  response.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
  return response


def get_ld(page):
  els = page.find_all('script[type="application/ld+json"]')
  for el in els:
    d = el.json()
    if "@type" in d and d["@type"] == "JobPosting":
      return d


session = StealthyFetcher(headless=True, solve_cloudflare=True, geoip=True)


@app.route("/")
def application():
  return "hello app\n"


@app.get("/test/")
def make_scrap_valid():
  url = "https://www.hellowork.com/fr-fr/emplois/67890369.html"
  data = jhser.handle(url)
  return data


@app.post("/scrap/")
def handle_scrap_url():
  json = request.get_json()
  url = json.get("url")
  page = session.fetch(url)
  ld = get_ld(page)
  if not ld:
    return "problem fetching"
  try:
    data = JobPosting(**ld)
    return data.model_dump_json()
  except ValidationError as e:
    return e.json(include_input=True, include_context=True)


if __name__ == "__main__":
  app.run(debug=True)

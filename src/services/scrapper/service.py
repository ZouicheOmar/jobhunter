import requests

from models import JobPosting
from scrapling.fetchers import StealthySession

from utils import pj, save_head, save_page


class JobhunterUrlService:
  def __init__(self):
    requests.get("http://localhost:11434")

  def _get_page(self, url):
    with StealthySession(headless=True, solve_cloudflare=True, geoip=True) as session:
      page = session.fetch(url)
      save_page(page)
      save_head(page)
      return page

  def _get_ld(self, page):
    els = page.find_all('script[type="application/ld+json"]')
    for el in els:
      d = el.json()
      if "@type" in d and d["@type"] == "JobPosting":
        return d

  def handle(self, url):
    page = self._get_page(url)
    ld = self._get_ld(page)
    if not ld:
      return "problem"
    else:
      data = JobPosting(**ld)
      return data.model_dump_json()

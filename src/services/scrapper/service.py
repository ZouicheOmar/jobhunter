from scrapling.engines.toolbelt.custom import Response
from scrapling.parser import Selectors
from models import JobOfferData
from flask import jsonify
from typing import List, Optional
from scrapling.fetchers import StealthyFetcher, StealthySession
from urllib.parse import urlparse, parse_qs
from langchain_ollama import ChatOllama
from pydantic import BaseModel, Field
import json


class JobhunterUrlService:
  def __init__(self):
    print("INTIALIZING HEADLESS BROWSER & OLLAMA")
    # self.fetcher = StealthyFetcher(
    #   headless=True,
    #   geoip=True,
    #   solve_cloudflare=True,
    # )
    self.llm = ChatOllama(
      model="gemma3:1b", reasoning=False, temperature=0.7, keep_alive=-1
    ).with_structured_output(JobOfferData)

  def _hdle_indeed_url(self, url):
    return "indeed url"

  def _hdle_linkedin_url(self, url):
    return "linkedin url"

  def _get_page(self, url):
    if "linkedin" in url:
      return self._hdle_linkedin_url(url)

    elif "indeed" in url:
      url = self._hdle_indeed_url(url)

    with StealthySession(
      headless=True,
      solve_cloudflare=True,
      geoip=True,
    ) as s:
      page = s.fetch(url)
      self.page = page

  def _get_ld(self):
    lds: Selectors = self.page.css('script[type="application/ld+json"]')
    for ld in lds:
      if "JobPosting" in ld.html_content:
        self.data = json.dumps(ld.json())
      # handle else

  def _llm_work(self):
    r = self.llm.invoke(self.data)
    if not r:
      return "ERROR: JobhunterUrlService._llm_work no result"
    return r.model_dump_json()

  def handle(self, url):
    self._get_page(url)
    self._get_ld()
    r = self._llm_work()
    return r

from langchain_core.language_models import LanguageModelInput
from scrapling.core.custom_types import TextHandler
from scrapling.engines.toolbelt.custom import Response
from scrapling.parser import Selector, Selectors
from models import JobOffer
from flask import jsonify
from typing import List, Optional
from scrapling.fetchers import StealthyFetcher, StealthySession
from urllib.parse import urlparse, parse_qs
from langchain_ollama import ChatOllama
from langchain.chat_models import init_chat_model
import requests

from utils import html_to_text
from rich import print

from bs4 import BeautifulSoup

from pydantic import BaseModel, Field
import json


class JobhunterUrlService:
  def __init__(self):
    requests.get("http://localhost:11434")

  def _hdle_indeed_url(self, url):
    return "indeed url"

  def _hdle_linkedin_url(self, url):
    return "linkedin url"

  def _get_page(self, url):
    # if "linkedin" in url:
    #   return self._hdle_linkedin_url(url)
    #
    # elif "indeed" in url:
    #   url = self._hdle_indeed_url(url)

    with StealthySession(headless=True, solve_cloudflare=True, geoip=True) as s:
      page = s.fetch(url)
      self.page = page

  def _get_ld(self):
    lds: Selectors = self.page.css('script[type="application/ld+json"]')
    for ld in lds:
      if "JobPosting" in ld.html_content:
        self.data = ld.json()

  def handle(self, url):
    self._get_page(url)
    self._get_ld()
    job_offer_data = JobOffer(**self.data)
    return job_offer_data.model_dump_json()

from urllib.parse import urlparse
import re
from bs4 import BeautifulSoup
import json


def add_headers(response):
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  response.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
  return response


def write_to_file(data, path: str):
  with open(path, "w") as f:
    f.write(data)


def get_domain_name(url):
  parsed = urlparse(url)
  print(parsed.hostname)


def html_to_text(html: str) -> str:
  return BeautifulSoup(html, "lxml").get_text(strip=True)


def clean_up(html):
  soup = BeautifulSoup(html, "lxml")
  text = BeautifulSoup(soup.prettify(), "lxml").getText()
  clean = re.sub(r"[ \t\r\f\v]{1,}", " ", text)
  clean = re.sub(r"\n*", "", clean)
  return clean

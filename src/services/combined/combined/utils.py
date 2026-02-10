import json
import re
import os
from typing import Dict
from urllib.parse import urlparse
from typing import List
from ollama import GenerateResponse

from combined.models import LLMExtractResponse
from bs4 import BeautifulSoup

from scrapling.engines.toolbelt.custom import Response
from scrapling.parser import Selector


def normalize(s: str) -> str:
  s = s.strip()
  s = s.replace(' ', '_')
  s = s.lower()
  return s

def cleanup_result(name: str) -> str | List[str]:
  if '(' in name or ',' in name or ')' in name:
    v = [] 
    first = normalize(name[0:name.index('(')])
    v.append(first)
    found = re.findall(r'\([^()]*\)', name)
    for f in found:
      f = f.replace('(', '')
      f = f.replace(')', '')
      f = f.split(',')
      for i in f:
        i = normalize(i)
        v.append(i)
    return v
  else:
    name = normalize(name)
    return name

def getDataFromResponse(request: GenerateResponse) -> List[str] | None:
  key = 'Tech Stack' 
  if "response" in request :
    d = json.loads(request.response)
    if key in d:
      return d[key]

def cleanup_response(response: GenerateResponse) -> LLMExtractResponse | None:
  result = []
  data = getDataFromResponse(response)
  if not data:
    return None
  for item in data:
    citem = cleanup_result(item)
    print("clean item", citem)
    if(isinstance(citem, list)):
      result.extend(citem)
    else:
      result.append(citem) 
  return LLMExtractResponse(data=result)


TEST_DATA_DIR = "../tests/data/html/no_ld/"
TEST_DATA_DIR = "../tests/data/heads/"


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


def pj(d: Dict):
  print(json.dumps(d, indent=2))


def save_page(page: Response):
  files = os.listdir(TEST_DATA_DIR)
  filename = TEST_DATA_DIR + "scrapped_" + str(len(files)) + ".html"

  with open(filename, "w") as file:
    file.write(page.html_content)


def save_head(page: Response):
  head = page.find("head")
  if head is None:
    return

  files = os.listdir(TEST_HEAD_DATA_DIR)
  filename = TEST_HEAD_DATA_DIR + "scrapped_head_" + str(len(files)) + ".html"

  with open(filename, "w") as file:
    file.write(head.html_content)


def find_head(path):
  with open(path, "r") as rawfile:
    page = Selector(rawfile.read())
    head = page.find("head")
    return head.get().html_content if head else "NOT FOUND"


def get_head(path="./test/scrapped_3.html"):
  with open(path, "r") as file:
    return file.read()

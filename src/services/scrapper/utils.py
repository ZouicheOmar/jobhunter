import json
from urllib.parse import urlparse
import re


def add_headers(response):
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Headers"] = (
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  )
  response.headers["Access-Control-Allow-Methods"] = (
    "POST, GET, PUT, DELETE, OPTIONS"
  )
  return response


def write_to_file(data, path: str):
  with open(path, "w") as f:
    f.write(data)


def get_domain_name(url):
  parsed = urlparse(url)
  print(parsed.hostname)

import json
from urllib.parse import urlparse
import re


def write_to_file(data, path: str):
  with open(path, "w") as f:
    f.write(data)


def get_domain_name(url):
  parsed = urlparse(url)
  print(parsed.hostname)

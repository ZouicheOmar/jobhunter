import json
import re
from typing import List
from ollama import GenerateResponse
from models import LLMExtractResponse

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

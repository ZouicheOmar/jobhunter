from scrapling.engines.toolbelt.custom import Response as ScrapResponse
from scrapling.parser import Selector
from scrap.models import JobPosting

class PageParser:
  def cleanup(self, text):
    s = Selector(content=text)
    return s.get_all_text()

  def make_dict(self,d): 
    if "qualifications" in d: 
      desc = self.cleanup(d["description"])
      quali = self.cleanup(d["qualifications"])
      d["description"] = desc + quali
    else : 
      d["description"] = self.cleanup(d["description"])
    return d 

  def extract_ld(self, page: ScrapResponse) -> dict | None:
    nodes = page.find_all('script[type="application/ld+json"]')
    if not len(nodes):
      return None
    for node in nodes:
      node_json = node.json()
      if "@type" in node_json and node_json["@type"] == "JobPosting":
        return self.make_dict(node_json)
      continue
    return None

  def process(self, page: ScrapResponse) -> dict | None:
    ldjson_node = self.extract_ld(page)
    if not ldjson_node:
      return None
    data = JobPosting(**ldjson_node)
    return data.model_dump()


from scrapper import Scrapper
from models import TestModel
from flask import jsonify


def get_json():
  return TestModel(first="john", last="doe", message="hello from GET JSON")


class UrlService:
  def __init__(self):
    self.ai_scrapper = Scrapper()

  def handle(self, url):
    result = self.ai_scrapper.scrap(url)
    # return jsonify(result.model_dump_json())
    return jsonify(result.dict())

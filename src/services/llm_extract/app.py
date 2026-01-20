# import json
from flask import Flask, request
from service import ExtractService

app = Flask(__name__)
service = ExtractService()


@app.after_request
def add_headers(response):
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  response.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
  return response


@app.route("/")
def application():
  return "hello app\n"


@app.get("/api/test/")
def test():
  return "check log"


@app.post("/api/extract/")
def extract():
  data = request.get_json()
  text = data.get("text")
  res = service.handle(text)
  return res

def get_test_text():
  path = "./test/1.txt"
  with open(path, "r") as file:
    return file.read()

if __name__ == "__main__":
  app.run(debug=True, port=5001)



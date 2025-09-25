from flask import Flask, request
from service import UrlService

app = Flask(__name__)


@app.after_request
def add_headers(response):
  response.headers["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Allow-Headers"] = (
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  )
  response.headers["Access-Control-Allow-Methods"] = (
    "POST, GET, PUT, DELETE, OPTIONS"
  )
  return response


@app.route("/")
def application():
  return "hello app\n"


@app.post("/handle_scrap_url/")
def handle_scrap_url():
  url_service = UrlService()
  json = request.get_json()
  url = json.get("url")
  res = url_service.handle(url)
  return res


if __name__ == "__main__":
  app.run(debug=True)

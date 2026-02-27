from flask import Blueprint, Response, request
import requests
from http import HTTPStatus
import os

from combined.service import ExtractService

extract_service = ExtractService()

extract_bp = Blueprint('extract', __name__)

@extract_bp.post("/job-application")
def handle_scrap_job_posting():
    print("handling a extract request")
    json = request.get_json() 
    text = json.get("text")

    if not text:
        return Response(status=HTTPStatus.BAD_REQUEST) 

    data = extract_service.handle(text)

    if not data : 
        return Response(status=HTTPStatus.NO_CONTENT)

    return data

@extract_bp.get("/ping")
def ping():
    extract_service.ping()
    print("check log")
    return { "message" : "check log" }

@extract_bp.get("/test")
def get_test_text():
    # r = requests.get("https://dummyjson.com/test")
    # print("json ?", r.json())
    r = requests.get("http://host.docker.internal:11434")
    print("text ?", r.text)
    print("ollama host ?", os.environ['OLLAMA_HOST'])
    return "okey running\n"

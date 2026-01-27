from flask import Blueprint, Response, request
from http import HTTPStatus

from extract.service import ExtractService

extract_service = ExtractService()

extract_bp = Blueprint('extract', __name__)

@extract_bp.post("/extract")
def handle_scrap_job_posting():
    json = request.get_json() 
    text = json.get("text")

    if not text:
        return Response(status=HTTPStatus.BAD_REQUEST) 

    data = extract_service.handle(text)

    if not data : 
        return Response(status=HTTPStatus.NO_CONTENT)

    return data

@extract_bp.get("/test")
def get_test_text():
    return "okey running\n"

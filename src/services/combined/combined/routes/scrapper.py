from flask import Blueprint, Response, request
from http import HTTPStatus

from combined.service.page_scrap import PageScrap
from combined.service.page_parser import PageParser

scrapper_bp = Blueprint('scrap', __name__)

page_scrap_service = PageScrap()
page_parser_service = PageParser()

@scrapper_bp.post("/job_posting")
def handle_scrap_job_posting():
    print("=============HANDLING A SCRAP REQUEST==============")
    json = request.get_json()
    url = json.get("url") 

    if not url:
        return Response(status=HTTPStatus.BAD_REQUEST)

    page = page_scrap_service.get_page(url)
    data = page_parser_service.process(page)

    print("=============DATA==============")
    print(data)

    if not data : 
        return Response(status=HTTPStatus.NO_CONTENT)
    return data

from scrapling.engines.toolbelt.custom import Response

def make_response(html) -> Response:
    return Response(url="", content=html, status=200, reason="reason", cookies = { "cookie": "cookie" }, headers={ "header": "header", }, request_headers={"header": "header"})

def get_content(path:str) -> str:
    with open(path, "r") as file:
        return file.read()


def test_parsed_when_json_ld_present(page_parser):
    path = "./tests/data/html/ld/wttj_0.html"
    html = get_content(path)
    page = make_response(html)
    ld = page_parser.extract_ld(page)

    print("quali ?",ld["qualifications"])

    assert "Développeur.se backend Typescript expérimenté.e" in ld["title"]
    assert "Toulouse" in ld["jobLocation"][0]["address"]["addressLocality"]
    assert "31400" in ld["jobLocation"][0]["address"]["postalCode"]
    assert "Haute-Garonne" in ld["jobLocation"][0]["address"]["addressRegion"]   
    assert "Chemin de Malepère, 31400 Toulouse, France" in ld["jobLocation"][0]["address"]["streetAddress"]   
    assert "FR" in ld["jobLocation"][0]["address"]["addressCountry"]   
    assert "FULL_TIME" in ld["employmentType"]

    assert len(ld["description"]) > 0
    assert len(ld["qualifications"]) > 0

    assert isinstance(ld["qualifications"], str)

    # assert ld["description"] == ""
    # TODO add qualifications or concat with desc

def test_no_qualifications(page_parser):
    path = "./tests/data/cases/ld_no_qualifications.html"

    html = get_content(path)
    page = make_response(html)
    ld = page_parser.extract_ld(page)

    assert "qualifications" not in ld

    assert "Développeur.se backend Typescript expérimenté.e" in ld["title"]
    assert "Toulouse" in ld["jobLocation"][0]["address"]["addressLocality"]
    assert "31400" in ld["jobLocation"][0]["address"]["postalCode"]
    assert "Haute-Garonne" in ld["jobLocation"][0]["address"]["addressRegion"]   
    assert "Chemin de Malepère, 31400 Toulouse, France" in ld["jobLocation"][0]["address"]["streetAddress"]   
    assert "FR" in ld["jobLocation"][0]["address"]["addressCountry"]   
    assert "FULL_TIME" in ld["employmentType"]

    assert len(ld["description"]) > 0

    # assert ld["description"] == ""
    # TODO add qualifications or concat with desc

def test_parsed_no_json_ld(page_parser):
    path = "./tests/data/html/no_ld/indeed_0.html"
    html = get_content(path)
    page = make_response(html)

    html = ""
    page: Response = Response(url="", content=html, status=200, reason="reason", cookies = { "cookie": "cookie" }, headers={ "header": "header", }, request_headers={"header": "header"})

    ld = page_parser.extract_ld(page)
    assert ld is None

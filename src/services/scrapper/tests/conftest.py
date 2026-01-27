import pytest
from scrap import create_app
from scrap.service import PageParser

@pytest.fixture()
def app():
    app = create_app()
    app.config.update({ "TESTING": True })
    yield app

@pytest.fixture()
def client(app):
    return app.test_client()

@pytest.fixture()
def page_parser():
    return PageParser()


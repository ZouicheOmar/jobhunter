from flask import Flask

from extract.routes.extract import extract_bp
from extract.config_cors import config_cors


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping( SECRET_KEY='dev')

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)
    app.after_request(config_cors)

    app.register_blueprint(extract_bp, url_prefix="/api")

    return app

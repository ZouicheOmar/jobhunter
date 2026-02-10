from flask import Flask

from extract.routes.extract import extract_bp
from extract.config_cors import config_cors


def create_app(config_name='dev', test_config=None):

    app = Flask(__name__, instance_relative_config=True)
    from config import config_mapper
    app.config.from_object(config_mapper[config_name])

    app.after_request(config_cors)
    app.register_blueprint(extract_bp, url_prefix="/api")

    return app

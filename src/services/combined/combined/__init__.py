from flask import Flask

from combined.routes import extract_bp, scrapper_bp
from combined.config_cors import config_cors


def create_app(config_name='dev'):

    app = Flask(__name__, instance_relative_config=True)
    from config import config_mapper
    app.config.from_object(config_mapper[config_name])

    app.after_request(config_cors)
    app.register_blueprint(extract_bp, url_prefix="/extract")
    app.register_blueprint(scrapper_bp, url_prefix="/scrap")

    return app

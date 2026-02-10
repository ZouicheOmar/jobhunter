class Config:
    SECRET_KEY = 'maclesecrete'

class DevConfig(Config):
    DEBUG = True
    SERVER_NAME = 'localhost:5010'

class TestConfig(Config):
    DEBUG = True
    SERVER_NAME = 'localhost:5002'

class ProdConfig(Config):
    DEBUG = False
    SERVER_NAME = 'localhost:5003'


config_mapper = {
        'dev': DevConfig,
        'test': TestConfig,
        'prod': ProdConfig
}

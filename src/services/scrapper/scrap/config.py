from scrap import create_app
app = create_app()
app.config.update( TRUSTED_HOSTS = None)

from flask import Blueprint

debug_bp = Blueprint('debug', __name__)

@debug_bp.get("/foo")
def handle_debug():
    print("handling debug request\n")
    return { "message": "Hello form combined services" }

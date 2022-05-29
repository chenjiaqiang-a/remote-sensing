from flask import Blueprint

user_blue = Blueprint('user_blue', __name__, url_prefix="/user")

from .views import *
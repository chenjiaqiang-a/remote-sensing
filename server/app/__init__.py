from flask import Flask
from app.extensions.db import db
from app.extensions.login_manager import login_manager
from app.user import user_blue
from app.extensions.configs import config
from app.models.model import User
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.secret_key = "r3m0teSense"

app.config.from_object(config)
app.register_blueprint(user_blue)
login_manager.init_app(app)
db.init_app(app)

"""
with app.app_context():
    db.drop_all()
    db.create_all()
    user = User(username="username", phone="phone", password="password")
    db.session.add(user)
    db.session.commit()
"""
from flask_login import UserMixin
from app.extensions.db import db


class User(db.Model, UserMixin):
    __tablename__ = 'user'

    user_id = db.Column('id', db.Integer, primary_key=True)
    phone = db.Column(db.String(11), unique=True)
    password = db.Column(db.String(20), unique=True)
    username = db.Column(db.String(10), unique=True)

    def __init__(self, user_id=None, username=None, phone=None, password=None):
        self.user_id = user_id
        self.phone = phone
        self.password = password
        self.username = username

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.user_id

    def __repr__(self):
        return '<User %r>' % (self.phone)

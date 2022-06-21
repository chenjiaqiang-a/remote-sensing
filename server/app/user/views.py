from flask import jsonify, request
from flask_login import login_user, login_required, logout_user

from . import user_blue
from app.models.model import User
from app.extensions.db import db
from app.extensions.login_manager import login_manager


def message(status, msg, data):
    jsonObj = {
        'code': status,
        'msg': msg,
        'data': data
    }
    return jsonify(jsonObj)


@user_blue.route("/register", methods=['GET', 'POST'])
def register():
    data = request.get_json()
    username = data["username"]
    phone = data["phone"]
    password = data["password"]
    password1 = data["password1"]
    if username and phone and password and password1:
        if password != password1:
            return message(-1, "两次密码不一致", None)
        user = User.query.filter_by(phone=phone).first()
        if user:
            return message(-2, "用户已经注册", None)
        else:
            user = User(username=username, phone=phone, password=password)
            db.session.add(user)
            db.session.commit()
            return message(1, "用户注册成功!", None)


@login_manager.user_loader  # 使用user_loader装饰器的回调函数非常重要，他将决定 user 对象是否在登录状态
def user_loader(user_id):  # 这个id参数的值是在 login_user(user)中传入的 user 的 id 属性
    user = User.query.filter_by(user_id=user_id).first()
    return user


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@user_blue.route("/login", methods=['GET', 'POST'])
def login():
    data = request.get_json()
    phone = data["phone"]
    password = data["password"]
    if phone and password:
        user = User.query.filter(User.phone == phone, User.password == password).first()
        if user:
            login_user(user)
            return message(1, "用户登录成功", None)
    else:
        return message(-1, "登陆失败!", None)


@user_blue.route('/logout')
@login_required
def logout():
    logout_user()  # 登出用户
    return '已经退出登录'

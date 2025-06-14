from flask import Blueprint, request, jsonify
from models import db, User

user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    username = data.get("username")
    email =  data.get("email")

    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success":"User created successfully"}), 201
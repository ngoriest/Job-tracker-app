from flask import Blueprint, request, jsonify
from models import db, User

user_bp = Blueprint("user_bp", __name__)

# registering user 
@user_bp.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    username = data.get("username")
    email =  data.get("email")

    if not username or not email:
        return jsonify({"error": "Username and email are required"}), 400
    
    username_exists = User.query.filter_by(username=username).first()
    email_exists = User.query.filter_by(email=email).first()

    if username_exists:
        return jsonify({"error": "Username already exists"}), 400
    
    if email_exists:
        return jsonify({"error": "Email already exists"}), 400


    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success":"User created successfully"}), 201

# delete user
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"success": "User deleted successfully"}), 200 

# get all users
@user_bp.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    user_list = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
    return jsonify(user_list), 200

# get user by id
@user_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_admin,
        "created_at": user.created_at.isoformat()
    }
    return jsonify(user_data), 200

# update user
@user_bp.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    is_admin = data.get("is_admin")

    if username:
        user.username = username
    if email:
        user.email = email
    if is_admin is not None:
        user.is_admin = is_admin

    db.session.commit()

    return jsonify({"success": "User updated successfully"}), 200
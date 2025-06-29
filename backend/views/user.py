from flask import Blueprint, request, jsonify, current_app
from models import db, User
from werkzeug.security import generate_password_hash
from flask_mail import Message
from datetime import datetime

user_bp = Blueprint("user_bp", __name__)

# Create user
@user_bp.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not all([username, email, password]):
        return jsonify({"error": "Username, email and password are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    try:
        new_user = User(
            username=username,
            email=email,
            password=generate_password_hash(password),
            created_at=datetime.utcnow()
        )
        db.session.add(new_user)

        msg = Message(
            subject="Welcome to Job Tracker",
            recipients=[email],
            sender=current_app.config['MAIL_DEFAULT_SENDER'],
            body=f"""Hello {username},

Welcome to Job Tracker! Your account has been successfully created.

Start tracking your job applications and interviews with us.

Best regards,
The Job Tracker Team"""
        )
        current_app.extensions['mail'].send(msg)

        db.session.commit()
        return jsonify({"success": "User created successfully", "user_id": new_user.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Registration failed: {str(e)}"}), 500

# Get all users
@user_bp.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "username": u.username,
            "email": u.email,
            "is_admin": u.is_admin,
            "is_blocked": u.is_blocked,
            "created_at": u.created_at.isoformat()
        } for u in users
    ]), 200

# Get single user
@user_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_admin,
        "is_blocked": user.is_blocked,
        "created_at": user.created_at.isoformat()
    }), 200

# Update user
@user_bp.route("/users/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    username = data.get("username", user.username).strip()
    email = data.get("email", user.email).strip().lower()
    is_admin = data.get("is_admin", user.is_admin)
    is_blocked = data.get("is_blocked", user.is_blocked)

    try:
        if username != user.username and User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        if email != user.email and User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 400

        user.username = username
        user.email = email
        user.is_admin = is_admin
        user.is_blocked = is_blocked

        msg = Message(
            subject="Your Job Tracker Profile Was Updated",
            recipients=[email],
            sender=current_app.config['MAIL_DEFAULT_SENDER'],
            body=f"""Hello {username},

Your Job Tracker profile information has been successfully updated.

If you didn't make these changes, please contact us immediately.

Best regards,
The Job Tracker Team"""
        )
        current_app.extensions['mail'].send(msg)

        db.session.commit()
        return jsonify({"success": "User updated successfully", "user_id": user.id}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Update failed: {str(e)}"}), 500

# Delete user
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success": "User deleted successfully", "user_id": user_id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Deletion failed: {str(e)}"}), 500

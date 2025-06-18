from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from backend.models import User, db

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401
    if user.is_blocked:
        return jsonify({"error": "Account suspended"}), 403

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # JWT revocation would be handled via token blocklist (like your tutor's)
    return jsonify({"message": "Logout successful"}), 200
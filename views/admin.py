from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Application, Category, Task

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/admin/users', methods=['GET'])
@jwt_required()
def get_all_users():
    # Check if current user is admin
    current_user = User.query.get(get_jwt_identity())
    if not current_user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    users = User.query.all()
    return jsonify([{
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_admin": user.is_admin,
        "is_blocked": user.is_blocked
    } for user in users]), 200

@admin_bp.route('/admin/users/<int:user_id>/toggle-block', methods=['PATCH'])
@jwt_required()
def toggle_user_block(user_id):
    current_user = User.query.get(get_jwt_identity())
    if not current_user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.is_blocked = not user.is_blocked
    db.session.commit()
    return jsonify({
        "message": f"User {'blocked' if user.is_blocked else 'unblocked'}",
        "is_blocked": user.is_blocked
    }), 200

@admin_bp.route('/admin/stats', methods=['GET'])
@jwt_required()
def get_stats():
    current_user = User.query.get(get_jwt_identity())
    if not current_user.is_admin:
        return jsonify({"error": "Admin access required"}), 403

    stats = {
        "total_users": User.query.count(),
        "total_applications": Application.query.count(),
        "total_categories": Category.query.count(),
        "total_tasks": Task.query.count()
    }
    return jsonify(stats), 200
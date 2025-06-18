from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models import db, Category, Application

category_bp = Blueprint('category_bp', __name__)

# Create Category
@category_bp.route('/categories', methods=['POST'])
@jwt_required()
def create_category():
    data = request.get_json()
    user_id = get_jwt_identity()

    if not data.get('name'):
        return jsonify({"error": "Category name is required"}), 400

    # Check for duplicate category names per user
    existing_category = Category.query.filter_by(
        name=data['name'], 
        user_id=user_id
    ).first()
    if existing_category:
        return jsonify({"error": "Category already exists"}), 400

    new_category = Category(
        name=data['name'],
        user_id=user_id
    )
    db.session.add(new_category)
    db.session.commit()

    return jsonify({
        "id": new_category.id,
        "name": new_category.name
    }), 201

# Get All Categories (with application counts)
@category_bp.route('/categories', methods=['GET'])
@jwt_required()
def get_categories():
    user_id = get_jwt_identity()
    categories = Category.query.filter_by(user_id=user_id).all()

    categories_data = []
    for category in categories:
        categories_data.append({
            "id": category.id,
            "name": category.name,
            "application_count": Application.query.filter_by(
                category_id=category.id
            ).count()
        })

    return jsonify(categories_data), 200

# Update Category
@category_bp.route('/categories/<int:category_id>', methods=['PATCH'])
@jwt_required()
def update_category(category_id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(
        id=category_id, 
        user_id=user_id
    ).first()

    if not category:
        return jsonify({"error": "Category not found"}), 404

    data = request.get_json()
    if 'name' in data:
        # Check for duplicate names
        if Category.query.filter(
            Category.name == data['name'],
            Category.user_id == user_id,
            Category.id != category_id
        ).first():
            return jsonify({"error": "Category name already in use"}), 400
        category.name = data['name']

    db.session.commit()
    return jsonify({
        "id": category.id,
        "name": category.name
    }), 200

# Delete Category (only if no applications are linked)
@category_bp.route('/categories/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    user_id = get_jwt_identity()
    category = Category.query.filter_by(
        id=category_id, 
        user_id=user_id
    ).first()

    if not category:
        return jsonify({"error": "Category not found"}), 404

    # Prevent deletion if category has applications
    if Application.query.filter_by(category_id=category_id).count() > 0:
        return jsonify({
            "error": "Cannot delete category with linked applications"
        }), 400

    db.session.delete(category)
    db.session.commit()
    return jsonify({"message": "Category deleted"}), 200
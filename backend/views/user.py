from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from flask_mail import Message
from app import app, mail

user_bp = Blueprint('user_bp', __name__)

# User Registration
@user_bp.route('/users', methods=['POST'])
def register_user():
    data = request.get_json()

    # Validate required fields
    required_fields = ['username', 'email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Check for existing user
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create new user
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        created_at=datetime.utcnow()
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "created_at": new_user.created_at.isoformat()
        }
    }), 201

    # Sending a welcome email to the new user
    try:
        msg = Message("Welcome to Job Tracker",
                      sender=app.config['MAIL_DEFAULT_SENDER'],
                      recipients=[data['email']])
        msg.body = f"Hello {data['username']},\n\nThank you for registering with Job Tracker!\n\nBest regards,\nJob Tracker Team"
        mail.send(msg)
        db.session.commit()
        return jsonify({"success": "User created successfully"}), 201
    except Exception as e:
        print(f"Failed to send email: {e}")
        return jsonify({"message": "User registered, but failed to send welcome email"}), 201
    
    


# Get User by ID
@user_bp.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "created_at": user.created_at.isoformat(),
        "is_admin": user.is_admin
    }), 200

# Update User
@user_bp.route('/users/<int:user_id>', methods=['PATCH'])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    
    # Update password if provided
    if 'password' in data:
        user.password = generate_password_hash(data['password'])
    
    # Update email if provided
    if 'email' in data:
        if User.query.filter(User.email == data['email'], User.id != user_id).first():
            return jsonify({"error": "Email already in use"}), 400
        user.email = data['email']
    
    # Update username if provided
    if 'username' in data:
        if User.query.filter(User.username == data['username'], User.id != user_id).first():
            return jsonify({"error": "Username already in use"}), 400
        user.username = data['username']

    db.session.commit()
    return jsonify({
        "message": "User updated successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200
    #  send an email when user updates their information
    try:
        msg = Message(subject="Alert! Profile Update",
        recipients=[email],
        sender=app.config['MAIL_DEFAULT_SENDER'],
        body=f"Hello {user.username},\n\nYour profile has been updated successfully on JOB TRACKER.\n\nBest regards,\nJOB TRACKER Team")
        mail.send(msg)        
        # Commit the new user to the database after sending the email
        db.session.commit()
        return jsonify({"success":"User updated successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to regsiter/send welcome email"}), 400
   

# Delete User
@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
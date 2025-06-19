from flask import Blueprint, request, jsonify
from models import db, Application
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

application_bp = Blueprint('application_bp', __name__)

@application_bp.route('/applications', methods=['POST'])
@jwt_required()
def create_application():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    required_fields = ['company', 'job_title']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    new_app = Application(
        company=data['company'],
        job_title=data['job_title'],
        status=data.get('status', 'Applied'),
        notes=data.get('notes'),
        deadline=datetime.fromisoformat(data['deadline']) if 'deadline' in data else None,
        user_id=user_id,
        category_id=data.get('category_id')
    )
    db.session.add(new_app)
    db.session.commit()
    return jsonify({"message": "Application created"}), 201

@application_bp.route('/applications', methods=['GET'])
@jwt_required()
def get_applications():
    user_id = get_jwt_identity()
    apps = Application.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": app.id,
        "company": app.company,
        "job_title": app.job_title,
        "status": app.status,
        "deadline": app.deadline.isoformat() if app.deadline else None
    } for app in apps]), 200
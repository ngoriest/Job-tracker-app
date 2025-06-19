from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Task, Application
from datetime import datetime

task_bp = Blueprint('task_bp', __name__)

# Create Task
@task_bp.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    data = request.get_json()
    user_id = get_jwt_identity()

    if not data.get('description'):
        return jsonify({"error": "Description is required"}), 400

    # Validate application_id if provided
    application_id = data.get('application_id')
    if application_id:
        app = Application.query.filter_by(
            id=application_id, 
            user_id=user_id
        ).first()
        if not app:
            return jsonify({"error": "Invalid application ID"}), 400

    new_task = Task(
        description=data['description'],
        due_date=datetime.fromisoformat(data['due_date']) if 'due_date' in data else None,
        is_completed=data.get('is_completed', False),
        user_id=user_id,
        application_id=application_id
    )
    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        "id": new_task.id,
        "description": new_task.description,
        "is_completed": new_task.is_completed,
        "due_date": new_task.due_date.isoformat() if new_task.due_date else None,
        "application_id": new_task.application_id
    }), 201

# Get All Tasks (with optional filters)
@task_bp.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id)

    # Optional filters
    if 'completed' in request.args:
        tasks = tasks.filter_by(is_completed=(request.args['completed'].lower() == 'true'))
    if 'application_id' in request.args:
        tasks = tasks.filter_by(application_id=request.args['application_id'])

    tasks_data = []
    for task in tasks.all():
        tasks_data.append({
            "id": task.id,
            "description": task.description,
            "is_completed": task.is_completed,
            "due_date": task.due_date.isoformat() if task.due_date else None,
            "application_id": task.application_id,
            "application_title": task.application.job_title if task.application else None
        })

    return jsonify(tasks_data), 200

# Update Task
@task_bp.route('/tasks/<int:task_id>', methods=['PATCH'])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(
        id=task_id, 
        user_id=user_id
    ).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json()
    if 'description' in data:
        task.description = data['description']
    if 'due_date' in data:
        task.due_date = datetime.fromisoformat(data['due_date'])
    if 'is_completed' in data:
        task.is_completed = data['is_completed']
    if 'application_id' in data:
        if data['application_id']:
            app = Application.query.filter_by(
                id=data['application_id'], 
                user_id=user_id
            ).first()
            if not app:
                return jsonify({"error": "Invalid application ID"}), 400
        task.application_id = data['application_id']

    db.session.commit()
    return jsonify({
        "id": task.id,
        "description": task.description,
        "is_completed": task.is_completed,
        "due_date": task.due_date.isoformat() if task.due_date else None,
        "application_id": task.application_id
    }), 200

# Delete Task
@task_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(
        id=task_id, 
        user_id=user_id
    ).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"}), 200
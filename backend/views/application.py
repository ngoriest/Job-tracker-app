from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Application
from datetime import datetime

application_bp = Blueprint("application_bp", __name__)

def application_to_dict(app):
    return {
        "id": app.id,
        "company": app.company,
        "job_title": app.job_title,
        "status": app.status,
        "application_date": app.application_date.isoformat() if app.application_date else None,
        "deadline": app.deadline.isoformat() if app.deadline else None,
        "notes": app.notes,
        "user_id": app.user_id
    }

# Create application
@application_bp.route("/applications", methods=["POST"])
@jwt_required()
def create_application():
    print("📥 Reached POST /applications")

    try:
        data = request.get_json(force=True)
        print("📦 Payload:", data)
    except Exception as e:
        print("❌ Failed to parse JSON:", e)
        return jsonify({"error": "Invalid JSON", "details": str(e)}), 400

    # Convert string user_id back to int
    user_id = int(get_jwt_identity())
    print("🔐 User ID:", user_id)

    # Basic validation
    if not data.get("company") or not data.get("job_title"):
        print("❌ Missing fields")
        return jsonify({"error": "Company and job title are required"}), 400

    try:
        application_date = data.get("application_date")
        deadline = data.get("deadline")

        new_app = Application(
            company=data["company"].strip(),
            job_title=data["job_title"].strip(),
            status=data.get("status", "Applied"),
            application_date=datetime.fromisoformat(application_date.replace("Z", "")) if application_date else datetime.utcnow(),
            deadline=datetime.fromisoformat(deadline.replace("Z", "")) if deadline else None,
            notes=data.get("notes", "").strip(),
            user_id=user_id
        )

        db.session.add(new_app)
        db.session.commit()

        print("✅ Application created successfully:", new_app.id)
        return jsonify({"application": application_to_dict(new_app)}), 201

    except Exception as e:
        print("❌ Error while saving application:", e)
        return jsonify({"error": "Failed to create application", "details": str(e)}), 422

# Get all applications
@application_bp.route("/applications", methods=["GET"])
@jwt_required()
def get_applications():
    user_id = int(get_jwt_identity())
    apps = Application.query.filter_by(user_id=user_id).all()
    return jsonify({"applications": [application_to_dict(app) for app in apps]}), 200

# Update application
@application_bp.route("/applications/<int:app_id>", methods=["PATCH"])
@jwt_required()
def update_application(app_id):
    data = request.get_json()
    user_id = int(get_jwt_identity())
    app = Application.query.filter_by(id=app_id, user_id=user_id).first()

    if not app:
        return jsonify({"error": "Application not found"}), 404

    try:
        if "company" in data:
            app.company = data["company"].strip()
        if "job_title" in data:
            app.job_title = data["job_title"].strip()
        if "status" in data:
            app.status = data["status"]
        if "application_date" in data:
            app.application_date = datetime.fromisoformat(data["application_date"].replace("Z", ""))
        if "deadline" in data:
            deadline_val = data["deadline"]
            app.deadline = datetime.fromisoformat(deadline_val.replace("Z", "")) if deadline_val else None
        if "notes" in data:
            app.notes = data["notes"].strip()

        db.session.commit()
        return jsonify({"application": application_to_dict(app)}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Update failed: {str(e)}"}), 422

# Delete application
@application_bp.route("/applications/<int:app_id>", methods=["DELETE"])
@jwt_required()
def delete_application(app_id):
    user_id = int(get_jwt_identity())
    app = Application.query.filter_by(id=app_id, user_id=user_id).first()
    
    if not app:
        return jsonify({"error": "Application not found"}), 404

    db.session.delete(app)
    db.session.commit()
    return jsonify({"message": "Application deleted"}), 200
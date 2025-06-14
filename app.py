from flask import Flask, request, jsonify
from models import db, User
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)

# Registering the user blueprint
from views import *

app.register_blueprint(user_bp)
# app.register_blueprint(application_bp)
# app.register_blueprint(category_bp)
# app.register_blueprint(task_bp)


if __name__ == "__main__":
    app.run(debug=True)
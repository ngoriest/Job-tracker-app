from datetime import timedelta
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS  

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key-here'  # Replace with env var in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app)  # Enable CORS


from views import (
    auth_bp,
    user_bp,
    application_bp,  
    category_bp,     
    task_bp          
)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(application_bp)
app.register_blueprint(category_bp)
app.register_blueprint(task_bp)

if __name__ == '__main__':
    app.run(debug=True)
from datetime import timedelta
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail
from flask_jwt_extended import JWTManager
from flask_cors import CORS  

# Initialize Flask app
app = Flask(__name__)



# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///job_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
db.init_app(app)

#flask cors
CORS(app) 


app.config['MAIL_SERVER'] = 'smtp.example.com'  
app.config['MAIL_PORT'] = 587  
app.config['MAIL_USE_TLS'] = True  
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'thee.manase@gmail.com'
app.config['MAIL_PASSWORD'] = 'tpct fyni fwzb rsmv'
app.config['MAIL_DEFAULT_SENDER'] = 'job-tracker@gmail.com'

mail = Mail(app)

#JWT Configuration
app.config['JWT_SECRET_KEY'] = 'your-secret-key-here'  
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

#test
app.config["JWT_VERIFY_SUB"] = False

jwt = JWTManager(app)
jwt.init_app(app)

#register blueprints
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
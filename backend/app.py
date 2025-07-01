from datetime import timedelta
from flask import Flask
from models import db
from flask_migrate import Migrate
from flask_mail import Mail
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://your_db_connection_string'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your_app_password'
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

# Initialize extensions
mail = Mail()
jwt = JWTManager()
db.init_app(app)
mail.init_app(app)
jwt.init_app(app)
migrate = Migrate(app, db)

# CORS Configuration
CORS(app, 
     resources={
         r"/api/*": {
             "origins": [
                 "https://job-tracker-app-phi.vercel.app",
                 "http://localhost:5173"
             ],
             "supports_credentials": True,
             "allow_headers": ["Content-Type", "Authorization"],
             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
         }
     }
)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Expose-Headers'] = 'Authorization'
    return response

# Token blocklist check
from models import TokenBlocklist

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None

# Register Blueprints
from views import *

app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(user_bp, url_prefix="/api")
app.register_blueprint(application_bp, url_prefix="/api")
app.register_blueprint(task_bp, url_prefix="/api")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
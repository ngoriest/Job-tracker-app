from datetime import timedelta
from flask import Flask
from models import db
from flask_migrate import Migrate
from flask_mail import Mail
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://job_tracker_app_user:hDKCbk6f4IS3c6gbqp9evWGH37tEqzRG@dpg-d1h4e87fte5s739a6sh0-a.oregon-postgres.render.com/job_tracker_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'thee.manase@gmail.com'
app.config['MAIL_PASSWORD'] = 'tpct fyni fwzb rsmv'
app.config['MAIL_DEFAULT_SENDER'] = 'thee.manase@gmail.com'
app.config['JWT_SECRET_KEY'] = 'absdbdbggdnjdirumf'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)

# Initialize extensions
mail = Mail()
jwt = JWTManager()
db.init_app(app)
mail.init_app(app)
jwt.init_app(app)
migrate = Migrate(app, db)

# CORS Configuration
CORS(app) 

# Token blocklist check
from models import TokenBlocklist

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None

# Register Blueprints with /api prefix
from views import *

app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(user_bp, url_prefix="/api")
app.register_blueprint(application_bp, url_prefix="/api")
app.register_blueprint(task_bp, url_prefix="/api")

if __name__ == '__main__':
    app.run(debug=True, port=5000)

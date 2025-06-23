import os
import stripe
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import blueprints
from api.getstories import getstories_bp
from api.submitlore import submitlore_bp
from api.raffle import raffle_bp
from api.stripe_integration import stripe_bp

from models.db import db

# Stripe API Key setup
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# DB config from env
AIVEN_USER = os.getenv("AIVEN_USER")
AIVEN_PASSWORD = os.getenv("AIVEN_PASSWORD")
AIVEN_HOST = os.getenv("AIVEN_HOST")
AIVEN_PORT = os.getenv("AIVEN_PORT")
AIVEN_DB = os.getenv("AIVEN_DB")

# Ensure all required DB credentials are available
if not all([AIVEN_USER, AIVEN_HOST, AIVEN_PASSWORD, AIVEN_DB, AIVEN_PORT]):
    raise ValueError("Missing one or more required database credentials.")

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for frontend and Netlify
CORS(app, origins=[
    "http://localhost:3000",
    "https://bangkoklore.netlify.app"
])

# Flask app config
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"mysql+pymysql://{AIVEN_USER}:{AIVEN_PASSWORD}@{AIVEN_HOST}:{AIVEN_PORT}/{AIVEN_DB}"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Conditional SSL config (only apply in production / cloud)
if AIVEN_HOST != "localhost":
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "connect_args": {
            "ssl": {
                "ssl-mode": "REQUIRED",
            }
        }
    }

# Init DB and register routes
db.init_app(app)
app.register_blueprint(getstories_bp)
app.register_blueprint(submitlore_bp)
app.register_blueprint(raffle_bp)
app.register_blueprint(stripe_bp)

# Run the Flask app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    # IMPORTANT: Bind to 127.0.0.1 instead of 0.0.0.0 for React proxy to work reliably
    app.run(host="127.0.0.1", port=port, debug=True)

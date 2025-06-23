from models.db import db
from models.lore import submit_lore
from flask import request, jsonify, Blueprint
from datetime import datetime

submitlore_bp = Blueprint('submitlore', __name__)

@submitlore_bp.route("/api/submit-lore", methods=['POST'])
def submit_lore_story():
    try:
        data = request.get_json()
        
        required_fields = ['name', 'email', 'title', 'bodytext']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "success": False,
                    "error": f"Missing required field: {field}"
                }), 400
    
        new_story = submit_lore(
            name=data['name'].strip(),
            email=data['email'].strip(),
            title=data['title'].strip(),
            bodytext=data['bodytext'].strip()
        )
        
 
        db.session.add(new_story)
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": "Story submitted successfully!",
            "story_id": new_story.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": f"Database error: {str(e)}"
        }), 500

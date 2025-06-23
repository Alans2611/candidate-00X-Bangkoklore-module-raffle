from models.lore import submit_lore
from flask import jsonify, Blueprint

getstories_bp = Blueprint('getstories', __name__)

@getstories_bp.route("/api/getstories", methods=['GET'])
def getstories():
    try:
        stories = submit_lore.query.all()
        stories_list = [story.to_dict() for story in stories] 
        
        return jsonify({
            "success": True,
            "stories": stories_list,
            "count": len(stories_list)
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error":str(e)
        }), 500

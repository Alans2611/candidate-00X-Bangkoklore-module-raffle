from flask import Blueprint, request, jsonify

raffle_bp = Blueprint('raffle', __name__)

user_tickets = {}

@raffle_bp.route("/api/raffle-ticket", methods=['POST'])
def buy_raffle_ticket():
    try:

        user_id = "demo_user"  
        
        if user_id not in user_tickets:
            user_tickets[user_id] = 0
        
        user_tickets[user_id] += 1
        
        return jsonify({
            "success": True,
            "tickets": user_tickets[user_id]
        })
        
    except Exception as e:
        print(f"Error: {e}")  
        return jsonify({
            "success": False,
            "error": "Error purchasing ticket, please try again"
        }), 500

import os
import stripe
from flask import Blueprint, request, jsonify

stripe_bp = Blueprint('stripe', __name__)

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

user_tickets = {}

@stripe_bp.route("/api/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        amount = int(data.get("amount", 100))  # amount in cents
        currency = data.get("currency", "usd")

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": currency,
                    "product_data": {
                        "name": "Raffle Ticket",
                        "description": "Support BangkokLore and win!"
                    },
                    "unit_amount": amount,
                },
                "quantity": 1
            }],
            mode="payment",
            success_url="https://bangkoklore.netlify.app/raffle-success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url="https://bangkoklore.netlify.app/raffle-cancel",
            metadata={"user_id": "demo_user"}
        )

        return jsonify({"sessionId": session.id}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@stripe_bp.route("/api/stripe-webhook", methods=["POST"])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature")
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    if not endpoint_secret:
        return jsonify({"error": "Webhook secret not configured"}), 500

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except stripe.error.SignatureVerificationError:
        return jsonify({"error": "Invalid signature"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user_id = session["metadata"].get("user_id", "demo_user")
        user_tickets[user_id] = user_tickets.get(user_id, 0) + 1

        return jsonify({
            "success": True,
            "tickets": user_tickets[user_id],
            "message": "Payment successful! Ticket added."
        }), 200

    elif event["type"] == "payment_intent.payment_failed":
        return jsonify({
            "success": False,
            "message": "Payment failed. Please try again."
        }), 200

    return jsonify({"received": True}), 200

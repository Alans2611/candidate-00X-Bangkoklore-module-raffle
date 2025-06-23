import React, { useState, useEffect } from 'react';
import './FloatingRaffle.css';
import { loadStripe } from '@stripe/stripe-js';

const FloatingRaffle = ({ userId }) => {
  const [expanded, setExpanded] = useState(false);
  const [tickets, setTickets] = useState(0);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch current ticket count
  const fetchTickets = async () => {
    try {
      const response = await fetch(`/api/raffle-status?userId=${userId}`);
      const data = await response.json();
      setTickets(data.tickets || 0);
    } catch {
      setStatus('error');
    }
  };

  // Join raffle directly (adds ticket without payment)
  const handleJoin = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const postRes = await fetch(`/api/raffle-entry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      const postData = await postRes.json();

      if (postData.success) {
        await fetchTickets();
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }

    setLoading(false);
  };

  // Open Stripe Checkout (simulated)
  const handleStripePayment = async () => {
    const stripe = await loadStripe("pk_test_XXXXXXXXXXXXXXXX"); // ← Replace with test key or keep dummy

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 100,
        currency: "usd",
      }),
    });

    const data = await res.json();

    if (data.sessionId) {
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
    } else {
      alert("❌ Payment failed. Please try again.");
    }
  };

  useEffect(() => {
    if (expanded) fetchTickets();
  }, [expanded]);

  return (
    <div className={`raffle-container ${expanded ? 'expanded' : ''}`}>
      {!expanded ? (
        <button
          className="raffle-toggle"
          onClick={() => setExpanded(true)}
          title="Open Raffle"
        >
          🎟️
        </button>
      ) : (
        <div className="raffle-panel">
          <h4>🎟️ Raffle Entry</h4>
          <p>You have <strong>{tickets}</strong> tickets.</p>

          <button
            className="raffle-btn"
            onClick={handleJoin}
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join the Raffle'}
          </button>

          <button
            className="raffle-btn payment"
            onClick={handleStripePayment}
          >
            Proceed to Payment
          </button>

          {status === 'success' && (
            <p className="success-msg">✅ Ticket added!</p>
          )}
          {status === 'error' && (
            <p className="error-msg">❌ Error, try again.</p>
          )}

          <button className="raffle-close" onClick={() => setExpanded(false)}>✖</button>
        </div>
      )}
    </div>
  );
};

export default FloatingRaffle;

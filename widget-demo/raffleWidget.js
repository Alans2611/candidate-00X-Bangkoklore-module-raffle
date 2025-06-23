document.addEventListener("DOMContentLoaded", function () {
  const widget = document.createElement("div");
  widget.innerHTML = `
    <button id="open-raffle">🎟️</button>
    <div id="raffle-panel" style="display:none;">
      <p id="ticket-count">You have X tickets.</p>
      <button id="join-btn">Join the Raffle</button>
      <button id="pay-btn">Proceed to Payment</button>
      <p id="message"></p>
    </div>
  `;
  document.body.appendChild(widget);

  document.getElementById("open-raffle").onclick = () => {
    const panel = document.getElementById("raffle-panel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  };

  async function updateTickets() {
    const res = await fetch("/api/raffle-status?userId=123");
    const data = await res.json();
    document.getElementById("ticket-count").textContent = `You have ${data.tickets} tickets.`;
  }

  document.getElementById("join-btn").onclick = async () => {
    const res = await fetch("/api/raffle-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 123 }),
    });
    const data = await res.json();
    updateTickets();
  };

  document.getElementById("pay-btn").onclick = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100, currency: "usd" }),
    });
    const data = await res.json();
    if (data.sessionId) {
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
    }
  };

  updateTickets();
});

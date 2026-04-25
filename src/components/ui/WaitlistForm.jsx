"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="waitlist-card">
      <h3>Secure Your Boarding Pass</h3>
      <form className="waitlist-form" onSubmit={handleSubmit}>
        <input
          id="waitlist"
          type="email"
          className="input-field"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          required
        />
        <button 
          type="submit" 
          className="btn-primary"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? "Processing..." : status === "success" ? "Boarding Pass Secured! ✈️" : "Get Early Access"}
        </button>
      </form>
      {status === "success" && (
        <p style={{ color: "#a7f3d0", marginTop: "1rem", fontSize: "0.875rem", textAlign: "center" }}>
          You are on the list! Keep an eye on your inbox.
        </p>
      )}
    </div>
  );
}

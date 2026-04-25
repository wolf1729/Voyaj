"use client";

import { useState } from "react";
import { useSnackbar } from "popcrumb";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const { snackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus("success");
      snackbar.success("Welcome aboard! Your boarding pass is secured. ✈️");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err.message);
      snackbar.error(err.message);
    }
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
      {status === "error" && (
        <p style={{ color: "#f87171", marginTop: "1rem", fontSize: "0.875rem", textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
}

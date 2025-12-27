import React, { useState } from "react";

function FeedbackModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, feedback });
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow p-4 position-relative"
        style={{ width: "100%", maxWidth: "420px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            border: "none",
            background: "transparent",
            fontSize: "1.3rem",
            fontWeight: "bold",
            color: "#0b3c5d",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <h5
          className="fw-bold mb-3 text-center"
          style={{ color: "#0b3c5d" }}
        >
          Send Feedback
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Your Feedback</label>
            <textarea
              className="form-control"
              rows="4"
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white border-0"
            style={{ backgroundColor: "#0b3c5d" }}
          >
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;

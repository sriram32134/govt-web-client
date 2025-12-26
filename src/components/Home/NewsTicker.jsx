import React from "react";

const newsItems = [
  "📢 New Water Pipeline Project approved for Vizianagaram District.",
  "🗓️ Public Holiday announced for Sankranti on Jan 14th - 16th.",
  "💡 Street light maintenance drive starting in Mandal 1 this weekend.",
  "🌾 PM Kisan Yojana: Last date for E-KYC extended to Feb 10th."
];

function NewsTicker() {
  return (
    <div className="bg-warning py-1 overflow-hidden position-relative border-bottom border-dark" style={{ zIndex: 999 }}>
      <div className="d-flex align-items-center">
        <span className="bg-dark text-white px-3 fw-bold small shadow-sm z-3 py-1">LATEST</span>
        <marquee className="m-0 py-1 fw-semibold text-dark small" scrollamount="6">
          {newsItems.map((item, index) => (
            <span key={index} className="mx-5">{item}</span>
          ))}
        </marquee>
      </div>
    </div>
  );
}

export default NewsTicker;
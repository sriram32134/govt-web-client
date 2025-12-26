import React from "react";

const fullNews = [
  {
    id: 1,
    title: "Digital India: New Fiber Grid for Rural Mandals",
    date: "Dec 24, 2025",
    category: "Infrastructure",
    description: "The state government has sanctioned ₹200Cr for high-speed internet connectivity in remote villages to improve digital governance."
  },
  {
    id: 2,
    title: "Health Camp: Free Vision Checkups in Primary Schools",
    date: "Dec 22, 2025",
    category: "Health",
    description: "Starting next Monday, a team of doctors will visit all government schools for free eye checkups and distribution of spectacles."
  },
  {
    id: 3,
    title: "Monsoon Preparedness: Drainage Cleaning Drive",
    date: "Dec 20, 2025",
    category: "Sanitation",
    description: "Citizens are requested to report blocked drains via the portal to help the sanitation department prepare for the upcoming rainy season."
  }
];

function LatestNews() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold border-bottom pb-3 mb-4">Official Announcements</h2>
      <div className="row g-4">
        {fullNews.map((news) => (
          <div key={news.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm hover-shadow transition">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle">{news.category}</span>
                  <small className="text-muted">{news.date}</small>
                </div>
                <h5 className="card-title fw-bold">{news.title}</h5>
                <p className="card-text text-secondary small">{news.description}</p>
                <button className="btn btn-link p-0 text-decoration-none fw-bold text-navy">Read Full Document →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestNews;
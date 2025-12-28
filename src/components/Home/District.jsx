import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import pic1 from "../../assets/picture-1.png"; 
import pic2 from "../../assets/picture-2.png";
import pic3 from "../../assets/picture-3.png";

function District() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setShowTrackPopup } = useOutletContext();

  const slides = [
    { id: 1, image: pic1, title: "Active Governance, Digital Access", desc: "Report local issues and track resolutions in real-time with your local VRO." },
    { id: 2, image: pic2, title: "Your Voice, Our Mission", desc: "Providing a direct channel for citizens to improve infrastructure and services." },
    { id: 3, image: pic3, title: "Building a Smarter Community", desc: "Ensuring every community grievance is heard and resolved efficiently." }
  ];

  const categories = [
    { name: "ROADS", icon: "🛣️", count: 806 },
    { name: "ELECTRICITY", icon: "⚡", count: 313 },
    { name: "WATER_SUPPLY", icon: "🚰", count: 683 },
    { name: "SANITATION", icon: "🧹", count: 1076 },
    { name: "DRAINAGE", icon: "🧱", count: 271 },
    { name: "STREET_LIGHTING", icon: "💡", count: 128 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      {/* BRIGHT BACKGROUND IMAGE SLIDER HERO */}
      <section className="position-relative overflow-hidden text-white shadow-sm" style={{ height: "620px" }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="position-absolute w-100 h-100" style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            zIndex: index === currentSlide ? 1 : 0
          }}>
            <div className="container h-100 d-flex align-items-center justify-content-center text-center">
              <div style={{ maxWidth: "850px" }}>
                <h1 className="display-2 fw-bolder mb-4 animate__animated animate__fadeInDown" 
                    style={{ textShadow: "0px 4px 15px rgba(0,0,0,0.7)", letterSpacing: "-1.5px" }}>
                  {slide.title}
                </h1>
                <p className="lead mb-5 fw-bold animate__animated animate__fadeInUp" 
                   style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.7)", fontSize: "1.5rem", opacity: "0.95" }}>
                  {slide.desc}
                </p>
                <div className="d-flex gap-3 justify-content-center mt-2 animate__animated animate__zoomIn animate__delay-1s">
                  <Link to="/raise-complaint" className="btn btn-success btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg border-2 border-white border-opacity-25">
                    Report an Issue →
                  </Link>
                  <button onClick={() => setShowTrackPopup(true)} className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg text-primary">
                    View Your Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* DEPARTMENT CATEGORIES */}
      <section className="container py-5 text-center mt-4">
        <p className="text-primary fw-bold text-uppercase mb-2" style={{ letterSpacing: "1px" }}>Categories</p>
        <h2 className="fw-bolder mb-5">Find schemes based on departments</h2>
        <div className="row g-4">
          {categories.map((cat, i) => (
            <div key={i} className="col-6 col-md-4 col-lg-2">
              <div className="card h-100 border-0 shadow-sm py-4 transition-hover bg-white rounded-4 border-bottom border-4 border-transparent hover-border-primary" style={{ cursor: "pointer", transition: "all 0.3s ease" }}>
                <div className="display-5 mb-3">{cat.icon}</div>
                <small className="text-success fw-bold d-block mb-1">{cat.count} Issues</small>
                <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "0.9rem" }}>{cat.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-5 bg-white border-top border-bottom mb-5 shadow-sm">
        <div className="container text-center py-4">
          <p className="text-muted mb-2 fw-bold font-monospace text-uppercase" style={{ letterSpacing: "2px" }}>The Process</p>
          <h2 className="fw-bolder mb-5">Easy steps to resolve</h2>
          <div className="row g-5">
            {[
              { s: "1", t: "Enter Details", d: "Start by providing your mobile and location to verify identity." },
              { s: "2", t: "Smart Search", d: "Our rule-based AI automatically routes your report to the correct VRO." },
              { s: "3", t: "Track & Resolve", d: "Receive updates directly on your dashboard until the issue is fixed." }
            ].map((step, i) => (
              <div key={i} className="col-md-4">
                <div className="bg-light p-5 rounded-4 h-100 shadow-sm border border-white">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 fw-bold shadow-sm" style={{width: "60px", height: "60px", fontSize: "1.5rem"}}>
                        {step.s}
                    </div>
                    <h4 className="fw-bolder mb-3">{step.t}</h4>
                    <p className="text-muted lh-base mb-0">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default District;
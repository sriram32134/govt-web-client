import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import MobileNumberModal from "../components/Home/MobileNumberModal";
import NewsTicker from "../components/Home/NewsTicker";
import LoginModal from "../components/common/LoginModal";
import FeedbackModal from "../components/common/FeedbackModal";
import VroLogin from "./VroLogin";

function Home() {
  const [showTrackPopup, setShowTrackPopup] = useState(false);
  const [showVroLogin, setShowVroLogin] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileSubmit = (mobileNumber) => {
    setShowTrackPopup(false);
    navigate("/history", { state: { mobileNumber } });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* NAVIGATION BAR - TALLER & CLEANER */}
      <header className="sticky-top bg-white border-bottom shadow-sm" style={{ zIndex: 1100 }}>
        <div className="container d-flex justify-content-between align-items-center py-3" style={{ minHeight: "85px" }}>
          <Link to="/" className="text-decoration-none d-flex align-items-center">
            <div className="bg-primary text-white p-2 rounded-circle me-3 d-flex align-items-center justify-content-center shadow-sm" style={{width: "48px", height: "48px"}}>
                <span style={{ fontSize: "1.4rem" }}>🏛️</span>
            </div>
            <div>
                <h3 className="fw-bolder m-0 text-dark" style={{ letterSpacing: "-0.8px", lineHeight: "1.1" }}>CitizenDesk</h3>
                <small className="text-muted fw-bold d-block" style={{fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px"}}>Government of India</small>
            </div>
          </Link>

          <nav className="d-none d-lg-block">
            <ul className="nav align-items-center gap-2">
              <li><Link className="nav-link text-dark fw-bold px-3 mx-1" to="/latest-news">Latest News</Link></li>
              <li><Link className="nav-link text-dark fw-bold px-3 mx-1" to="/raise-complaint">Report Issue</Link></li>
              <li><button className="nav-link text-dark fw-bold px-3 mx-1 border-0 bg-transparent" onClick={() => setShowTrackPopup(true)}>Track Status</button></li>
              <li>
                <button 
                  className="nav-link text-danger fw-bolder px-3 mx-1 border-0 bg-transparent"
                  onClick={() => alert("Emergency Services: 100 (Police), 108 (Ambulance), 101 (Fire)")}
                >
                  🚨 Emergency
                </button>
              </li>
              <li className="ms-3">
                <button className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm" onClick={() => setShowVroLogin(true)}>
                  Officer Login
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* BLUE NEWS TICKER */}
      {location.pathname === "/" && <NewsTicker />}

      <main className="flex-grow-1">
        <Outlet context={{ setShowTrackPopup }} />
      </main>

      {/* PROFESSIONAL DARK FOOTER */}
      <footer className="pt-5 mt-auto" style={{ backgroundColor: "#1d1733", color: "#ffffff" }}>
        <div className="container pb-5">
          <div className="row gy-5">
            <div className="col-lg-4 col-md-6">
              <h5 className="fw-bold mb-4 text-white">CitizenDesk</h5>
              <p className="small text-white-50 lh-base" style={{ maxWidth: "320px" }}>
                A National Grievance Redressal Platform powered by Digital India. 
                Streamlining communication between citizens and government officials for a better community.
              </p>
              <div className="mt-4 pt-2">
                <button className="btn btn-outline-light btn-sm px-4 py-2 rounded-pill fw-bold" onClick={() => setShowFeedback(true)}>
                  Share Your Feedback
                </button>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <h6 className="fw-bold mb-4 text-white">Quick Links</h6>
              <ul className="list-unstyled small text-white-50 lh-lg">
                <li><Link to="/" className="text-white-50 text-decoration-none">About CitizenDesk</Link></li>
                <li><Link to="/latest-news" className="text-white-50 text-decoration-none">Public Schemes</Link></li>
                <li><span className="text-white-50" style={{cursor:'pointer'}} onClick={() => setShowTrackPopup(true)}>Track Status</span></li>
                <li><Link to="/" className="text-white-50 text-decoration-none">Privacy Policy</Link></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="fw-bold mb-4 text-white">Govt. Portals</h6>
              <div className="d-flex flex-wrap gap-2">
                {["Digital India", "MyGov", "UMANG", "Data.gov.in"].map(link => (
                  <span key={link} className="bg-light bg-opacity-10 border border-white-10 px-2 py-1 rounded small fw-semibold text-white-50">{link}</span>
                ))}
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="fw-bold mb-4 text-white">Contact Support</h6>
              <p className="small text-white-50 mb-1">Ministry of Electronics & IT</p>
              <p className="small text-white-50 mb-3">Lodhi Road, New Delhi - 110003</p>
              <div className="small mb-1"><span className="text-white-50">Email:</span> help@citizendesk.gov.in</div>
              <div className="small"><span className="text-white-50">Support:</span> 1800-11-4556</div>
            </div>
          </div>
        </div>

        <div className="py-3" style={{ backgroundColor: "#151126" }}>
          <div className="container d-flex justify-content-between align-items-center">
            <small className="text-white-50">© 2025 CitizenDesk | NIC Data Centre</small>
            <small className="text-white-50">Last Updated: 28 Dec 2025</small>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {showTrackPopup && <MobileNumberModal onClose={() => setShowTrackPopup(false)} onSubmit={handleMobileSubmit} />}
      {showVroLogin && (
        <LoginModal onClose={() => setShowVroLogin(false)}>
          <VroLogin onClose={() => setShowVroLogin(false)} />
        </LoginModal>
      )}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </div>
  );
}

export default Home;
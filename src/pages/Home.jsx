import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import MobileNumberModal from "../components/Home/MobileNumberModal";
import NewsTicker from "../components/Home/NewsTicker";
import LoginModal from "../components/common/LoginModal";
import VroLogin from "./VroLogin";

function Home() {
  const [showTrackPopup, setShowTrackPopup] = useState(false);
  const [showVroLogin, setShowVroLogin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileSubmit = (mobileNumber) => {
    setShowTrackPopup(false);
    navigate("/history", { state: { mobileNumber } });
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* NAVBAR */}
      <header
        className="shadow-sm sticky-top"
        style={{
          background: "linear-gradient(90deg, #0a2342 0%, #123c69 100%)",
          borderBottom: "3px solid #ff9933",
        }}
      >
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
          <Link to="/" className="text-decoration-none d-flex align-items-center">
            <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🏛️</span>
            <h4
              className="fw-bold m-0 text-white"
              style={{ letterSpacing: "1px" }}
            >
              CITIZEN DESK
            </h4>
          </Link>

          <nav className="mt-3 mt-md-0">
            <ul className="nav gap-2 gap-md-3 align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link text-white custom-nav-link"
                  to="/raise-complaint"
                >
                  Report Issue
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link text-white border-0 bg-transparent custom-nav-link"
                  onClick={() => setShowTrackPopup(true)}
                >
                  Track Status
                </button>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-white custom-nav-link"
                  to="/latest-news"
                >
                  Latest News
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link text-warning fw-bold border-0 bg-transparent custom-nav-link"
                  onClick={() =>
                    alert("Emergency Services: 100 (Police), 108 (Ambulance)")
                  }
                >
                  🚨 Emergency
                </button>
              </li>

              {/* ✅ OFFICER LOGIN → POPUP */}
              <li className="nav-item">
                <button
                  className="nav-link text-white small border-0 bg-transparent custom-nav-link"
                  onClick={() => setShowVroLogin(true)}
                >
                  Officer Login
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* SHOW NEWS TICKER ONLY ON HOME PAGE */}
      {location.pathname === "/" && <NewsTicker />}

      {/* MAIN CONTENT */}
      <main className="flex-grow-1">
        <Outlet context={{ setShowTrackPopup }} />
      </main>

      {/* TRACK STATUS MODAL */}
      {showTrackPopup && (
        <MobileNumberModal
          onClose={() => setShowTrackPopup(false)}
          onSubmit={handleMobileSubmit}
        />
      )}

      {/* ✅ VRO LOGIN MODAL */}
      {showVroLogin && (
        <LoginModal onClose={() => setShowVroLogin(false)}>
          <VroLogin onClose={() => setShowVroLogin(false)} />
        </LoginModal>
      )}

      {/* FOOTER */}
      <footer className="bg-dark text-white-50 py-4 mt-auto">
        <div className="container text-center small">
          © 2025 Citizen Desk | Public Grievance Portal
        </div>
      </footer>
    </div>
  );
}

export default Home;

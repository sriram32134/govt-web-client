import React from "react";
import { Outlet, Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="header-gradient shadow-sm">
        <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center px-3 px-md-4 py-3">
          <h4 className="text-white fw-bold m-0 mb-2 mb-md-0">Citizen Desk</h4>

          <nav>
            <ul className="nav gap-2 gap-md-3 m-0">
              <li className="nav-item">
                <Link className="nav-link text-white nav-hover px-2" to="#">
                  Raise a Complaint
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white nav-hover px-2" to="/mobile">
                  Track Complaints
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white nav-hover px-2" to="#">
                  Latest News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white nav-hover px-2" to="#">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <Outlet />

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0 small">
          © 2025 ComplainHub | Public Grievance Redressal System
        </p>
      </footer>
    </>
  );
}

export default Home;

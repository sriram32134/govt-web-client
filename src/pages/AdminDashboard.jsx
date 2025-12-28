import { useState } from "react";
import "../styles/Admin.css";
import ComplaintTable from "../components/ComplaintsTable";
import FeedbackTable from "../components/common/FeedbackTable";
import { locationData } from "../data/locations";

function AdminDashboard() {
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [department, setDepartment] = useState("");
  const [view, setView] = useState("complaints");

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setMandal("");
  };

  return (
    <div className="admin-wrapper bg-light min-vh-100 pb-5">
      {/* HERO — FIXED BACKGROUND */}
      <div
        className="dashboard-hero py-5 mb-4 text-white"
        style={{
          background:
            "linear-gradient(135deg, #0d6efd 0%, #0a2342 100%)"
        }}
      >
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-2">
            Officer Command Center
          </h1>
          <p className="lead opacity-75">
            Managing Village Grievances & Citizen Feedback
          </p>

          {/* VIEW SWITCH */}
          <div className="btn-group mt-4 bg-white p-1 rounded-pill shadow">
            <button
              className={`btn rounded-pill px-4 fw-bold ${
                view === "complaints"
                  ? "btn-primary"
                  : "btn-outline-dark"
              }`}
              onClick={() => setView("complaints")}
            >
              Complaints Ledger
            </button>

            <button
              className={`btn rounded-pill px-4 fw-bold ${
                view === "feedback"
                  ? "btn-dark text-white"
                  : "btn-outline-dark"
              }`}
              onClick={() => setView("feedback")}
            >
              Public Feedback
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container">
        {view === "complaints" ? (
          <>
            {/* FILTERS */}
            <div className="filter-card shadow-lg border-0 rounded-4 p-4 mb-5 bg-white">
              <div className="row g-4 align-items-end">
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    DISTRICT
                  </label>
                  <select
                    className="form-select border-0 bg-light shadow-sm"
                    value={district}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Select...</option>
                    {Object.keys(locationData).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    MANDAL
                  </label>
                  <select
                    className="form-select border-0 bg-light shadow-sm"
                    value={mandal}
                    onChange={(e) => setMandal(e.target.value)}
                    disabled={!district}
                  >
                    <option value="">Select...</option>
                    {district &&
                      locationData[district].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    DEPARTMENT
                  </label>
                  <select
                    className="form-select border-0 bg-light shadow-sm"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">All Departments</option>
                    <option value="ROADS">Roads</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="WATER_SUPPLY">Water Supply</option>
                    <option value="SANITATION">Sanitation</option>
                    <option value="DRAINAGE">Drainage</option>
                    <option value="STREET_LIGHTING">Street Lighting</option>
                    <option value="PUBLIC_HEALTH">Public Health</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {district && mandal ? (
              <>
                <h4 className="fw-bold mb-3">Live Reports Ledger</h4>
                <ComplaintTable
                  district={district}
                  mandal={mandal}
                  department={department}
                />
              </>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 opacity-75">
                <h5>Awaiting Selection</h5>
                <p>Filter by location to load reports.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* FEEDBACK VIEW — LIGHT & READABLE */}
            <div className="bg-white rounded-4 shadow p-4">
              <h4 className="fw-bold mb-3 text-dark">
                Citizen Feedback Stream
              </h4>
              <FeedbackTable />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

import { useState } from "react";
import "../styles/Admin.css";
import ComplaintTable from "../components/ComplaintsTable";
import { locationData } from "../data/locations";

function AdminDashboard() {
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [department, setDepartment] = useState("");

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setMandal(""); // Clear mandal when district changes
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header text-center py-4 bg-primary shadow-sm">
        <h1 className="fw-bold">VRO Dashboard</h1>
        <p className="text-muted">Manage Rural Grievances Efficiency</p>
      </div>

      <div className="filter-section container mt-4 p-4 bg-white rounded shadow-sm">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label fw-bold">District</label>
            <select className="form-select" value={district} onChange={handleDistrictChange}>
              <option value="">-- Select District --</option>
              {Object.keys(locationData).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Mandal</label>
            <select className="form-select" value={mandal} onChange={(e) => setMandal(e.target.value)} disabled={!district}>
              <option value="">-- Select Mandal --</option>
              {district && locationData[district].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Department</label>
            <select className="form-select border-primary" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">All Departments</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Power">Power</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Public Works">Public Works</option>
            </select>
          </div>
        </div>
      </div>

      {district && mandal ? (
        <div className="container mt-4">
          <ComplaintTable district={district} mandal={mandal} department={department} />
        </div>
      ) : (
        <div className="container mt-5 text-center">
          <div className="alert alert-info">Please select District and Mandal to view reports.</div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
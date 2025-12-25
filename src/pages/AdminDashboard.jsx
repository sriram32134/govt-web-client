import { useState } from "react";
import "../styles/Admin.css";
import ComplaintTable from "../components/ComplaintsTable";

function AdminDashboard() {
  const [district, setDistrict] = useState("");

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>VRO Dashboard</h1>
        <p>Rural Governance Complaint Management System</p>
      </div>

      <div className="filter-section">
        <label>Select District</label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">-- Select District --</option>
          <option value="Vizianagaram">Vizianagaram</option>
          <option value="Srikakulam">Srikakulam</option>
          <option value="Visakhapatnam">Visakhapatnam</option>
          <option value="Kakinada">Kakinada</option>
          <option value="EastGodavari">East Godavari</option>
        </select>
      </div>

      {district && (
        <div className="table-section">
          <ComplaintTable district={district} />
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

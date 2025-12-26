import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DetailPopup from "./DetailPopup"; // Create this next

function History() {
  const location = useLocation();
  const mobile = location.state?.mobileNumber || "Guest";
  const [selectedItem, setSelectedItem] = useState(null);

  const dummyData = [
    { 
      id: "CMP-9901", title: "Street Light Repair", status: "Pending", date: "2025-12-20",
      name: "Suresh Kumar", location: "Vizianagaram, Village B",
      description: "Street light is broken since last week.",
      image: "https://via.placeholder.com/500x300?text=Complaint+Image",
      lat: "18.10", lng: "83.40"
    }
  ];

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <h2 className="fw-bold mb-4 border-bottom pb-2">Reports for {mobile}</h2>
      
      <div className="table-responsive bg-white shadow-sm rounded">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(item => (
              <tr key={item.id}>
                <td className="fw-bold text-primary">#{item.id}</td>
                <td>{item.title}</td>
                <td><span className="badge bg-warning">{item.status}</span></td>
                <td>
                  <button className="btn btn-sm btn-outline-dark" onClick={() => setSelectedItem(item)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STEP 2: DETAILS POPUP */}
      {selectedItem && (
        <DetailPopup item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default History;
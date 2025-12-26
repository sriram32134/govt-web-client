import React from "react";

function DetailPopup({ item, onClose }) {
  return (
    <div className="modal-overlay" style={{ background: "rgba(0,0,0,0.8)", zIndex: 2000 }}>
      <div className="modal-box" style={{ width: "95%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h4 className="m-0">Complaint Details</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="text-center mb-4">
          <img src={item.image} alt="Evidence" className="img-fluid rounded shadow-sm border" style={{ maxHeight: "300px" }} />
        </div>

        <div className="row g-3 small">
          <div className="col-6"><strong>ID:</strong> {item.id}</div>
          <div className="col-6 text-end"><strong>Date:</strong> {item.date}</div>
          <div className="col-12"><strong>Reported By:</strong> {item.name}</div>
          <div className="col-12"><strong>Location:</strong> {item.location}</div>
          <div className="col-12 text-muted italic"><strong>GPS:</strong> {item.lat}, {item.lng}</div>
          <div className="col-12 mt-2">
            <label className="fw-bold d-block border-bottom">Problem Description:</label>
            <p className="p-2 bg-light mt-1 rounded">{item.description}</p>
          </div>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-secondary px-4" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;
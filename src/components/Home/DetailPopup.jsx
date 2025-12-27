import React from "react";

function DetailPopup({ item, onClose }) {
  if (!item) return null;

  return (
    <div 
      className="modal-overlay" 
      style={{ 
        position: "fixed", 
        inset: 0, 
        background: "rgba(0,0,0,0.8)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        zIndex: 2000 
      }}
      onClick={onClose}
    >
      <div 
        className="modal-box bg-white p-4 rounded shadow-lg" 
        style={{ width: "95%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
          <h4 className="m-0 text-primary">Report Details</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {/* Evidence Image */}
        {item.imageUrl && (
          <div className="text-center mb-4">
            <img 
              src={item.imageUrl} 
              alt="Evidence" 
              className="img-fluid rounded shadow-sm border" 
              style={{ maxHeight: "300px", objectFit: "cover" }} 
            />
          </div>
        )}

        <div className="row g-3">
          <div className="col-md-6">
            <strong>Status:</strong> 
            <span className={`ms-2 badge ${
              item.status === 'Pending' ? 'bg-warning text-dark' : 
              item.status === 'Accepted' ? 'bg-primary' : 
              item.status === 'Completed' ? 'bg-success' : 'bg-danger'
            }`}>
              {item.status}
            </span>
          </div>
          <div className="col-md-6 text-md-end">
            <small className="text-muted">
              Reported on: {new Date(item.createdAt).toLocaleDateString()}
            </small>
          </div>

          <div className="col-12">
            <strong>Department:</strong> {item.aiAnalysis?.department || "General"}
          </div>

          <div className="col-12">
            <strong>Location:</strong> {item.village}, {item.mandal}, {item.district}
          </div>

          {/* FIX: Render lat and lng separately instead of the whole object */}
          {item.location && (
            <div className="col-12 text-muted small">
              <strong>GPS Coordinates:</strong> Lat: {item.location.lat}, Lng: {item.location.lng}
            </div>
          )}

          <div className="col-12 mt-3">
            <label className="fw-bold d-block border-bottom mb-2">My Description:</label>
            <p className="p-3 bg-light rounded border-start border-4 border-primary">
              {item.description}
            </p>
          </div>

          {/* If the complaint was rejected, show the reason */}
          {item.status === "Rejected" && item.reason && (
            <div className="col-12">
              <div className="alert alert-danger">
                <strong>Rejection Reason:</strong> {item.reason}
              </div>
            </div>
          )}
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-secondary px-4" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;
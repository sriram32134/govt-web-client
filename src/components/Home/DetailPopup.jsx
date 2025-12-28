import React from "react";

function DetailPopup({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="modal-overlay animate-fade-in"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 35, 66, 0.9)", // Darker, themed blue-tinted overlay
        backdropFilter: "blur(6px)", // Modern blur effect
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2500,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        className="modal-box bg-white rounded-4 shadow-2xl animate-scale-up"
        style={{
          width: "100%",
          maxWidth: "850px", // Wider layout
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed on top */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light rounded-top-4 sticky-top">
          <div>
            <h4 className="m-0 fw-bold text-dark">Grievance Overview</h4>
            <small className="text-muted">ID: {item._id?.substring(0, 8).toUpperCase() || "N/A"}</small>
          </div>
          <button 
            className="btn-close shadow-none" 
            onClick={onClose}
            style={{ padding: "1rem" }}
          ></button>
        </div>

        <div className="p-4">
          <div className="row g-4">
            {/* Left Side: Image */}
            <div className="col-lg-5">
              {item.imageUrl ? (
                <div className="position-relative group">
                  <img
                    src={item.imageUrl}
                    alt="Evidence"
                    className="img-fluid rounded-4 shadow-sm border"
                    style={{ 
                      width: "100%", 
                      height: "320px", 
                      objectFit: "cover",
                      backgroundColor: "#f8f9fa" 
                    }}
                  />
                  <div className="position-absolute bottom-0 start-0 m-2">
                    <span className="badge bg-dark bg-opacity-75">Evidence Captured</span>
                  </div>
                </div>
              ) : (
                <div className="bg-light rounded-4 d-flex align-items-center justify-content-center border" style={{ height: "320px" }}>
                  <div className="text-center text-muted">
                    <i className="bi bi-image" style={{ fontSize: "3rem" }}></i>
                    <p className="mt-2">No Image Provided</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Quick Info */}
            <div className="col-lg-7">
              <div className="d-flex flex-column h-100">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="text-uppercase small fw-bold text-muted d-block mb-1">Status</label>
                    <span className={`badge px-3 py-2 rounded-pill shadow-sm w-100 ${
                      item.status === 'Pending' ? 'bg-warning text-dark' : 
                      item.status === 'Accepted' ? 'bg-primary' : 
                      item.status === 'Completed' ? 'bg-success' : 'bg-danger'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="col-6">
                    <label className="text-uppercase small fw-bold text-muted d-block mb-1">Filed Date</label>
                    <div className="p-2 border rounded bg-light small fw-semibold text-center">
                      {new Date(item.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="p-3 border rounded-3 bg-white">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-building text-primary me-2"></i>
                        <span className="fw-bold">Department</span>
                      </div>
                      <div className="text-dark fw-semibold">
                        {item.aiAnalysis?.department || "General / Verification Pending"}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="p-3 border rounded-3 bg-white h-100">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                        <span className="fw-bold">Location Details</span>
                      </div>
                      <div className="small text-dark lh-sm">
                        {item.village}, {item.mandal}<br/>
                        <span className="text-muted">{item.district} District</span>
                      </div>
                      {item.location && (
                        <div className="mt-2 pt-2 border-top x-small text-muted font-monospace">
                          LAT: {item.location.lat.toFixed(4)} | LNG: {item.location.lng.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Sections */}
            
            {/* Rejection Alert */}
            {item.status === "Rejected" && (
              <div className="col-12 animate-fade-in">
                <div className="alert alert-danger border-0 border-start border-4 border-danger shadow-sm py-3 mb-0">
                  <div className="d-flex">
                    <i className="bi bi-exclamation-octagon-fill h4 me-3 mb-0"></i>
                    <div>
                      <h6 className="fw-bold mb-1">Official Rejection Feedback:</h6>
                      <p className="mb-0 small">{item.reason || "The officer has not provided specific feedback for this rejection."}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="col-12">
              <div className="bg-light p-4 rounded-4 border">
                <label className="fw-bold text-uppercase small text-primary d-block mb-3 border-bottom pb-2">User Complaint Description</label>
                <p className="mb-0 text-dark lh-base fs-5" style={{ fontStyle: "italic", whiteSpace: "pre-line" }}>
                  "{item.description}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-top bg-light rounded-bottom-4 text-end">
          <button 
            className="btn btn-primary px-5 py-2 fw-bold rounded-pill shadow-sm" 
            onClick={onClose}
          >
            Close Dashboard
          </button>
        </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-scale-up { animation: scaleUp 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .x-small { font-size: 0.75rem; }
      `}</style>
    </div>
  );
}

export default DetailPopup;
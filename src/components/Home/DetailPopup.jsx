import React from "react";

function DetailPopup({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="modal-overlay animate-fade-in"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.75)", // Darker, more modern overlay
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2500,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        className="modal-box bg-white shadow-2xl animate-scale-up"
        style={{
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "24px", // Smoother rounding
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center p-4 sticky-top bg-white border-bottom">
          <div>
            <span className="badge bg-primary-soft text-primary mb-1" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
              CASE FILE
            </span>
            <h3 className="m-0 fw-bold text-dark d-block">
              Grievance Details
            </h3>
            <code className="text-muted small bg-light px-2 py-1 rounded">
              ID: {item._id?.substring(0, 12).toUpperCase()}
            </code>
          </div>
          <button
            className="btn-close bg-light p-3 rounded-circle"
            onClick={onClose}
            aria-label="Close"
          />
        </div>

        {/* CONTENT */}
        <div className="p-4 p-md-5">
          <div className="row g-5">
            {/* Left: Media Section */}
            <div className="col-lg-5">
              <div className="position-relative">
                <img
                  src={item.imageUrl}
                  alt="Evidence"
                  className="img-fluid shadow-lg border w-100"
                  style={{ 
                    height: "380px", 
                    objectFit: "cover", 
                    borderRadius: "20px",
                    display: "block"
                  }}
                />
                <div className="position-absolute bottom-0 start-0 m-3">
                    <span className="badge bg-dark bg-opacity-75 backdrop-blur px-3 py-2">
                        Evidence Image
                    </span>
                </div>
              </div>
            </div>

            {/* Right: Meta Information */}
            <div className="col-lg-7">
              <div className="row g-4">
                <div className="col-6">
                  <label className="text-uppercase text-muted fw-bold mb-2" style={{ fontSize: '0.75rem' }}>Status</label>
                  <div>
                    <span className={`badge px-3 py-2 rounded-pill ${item.status === 'Pending' ? 'bg-warning text-dark' : 'bg-success text-white'}`}>
                      ● {item.status}
                    </span>
                  </div>
                </div>

                <div className="col-6">
                  <label className="text-uppercase text-muted fw-bold mb-2" style={{ fontSize: '0.75rem' }}>Department</label>
                  <div className="d-flex align-items-center">
                    <div className="p-2 bg-light rounded-3 me-2">🏢</div>
                    <span className="fw-bold text-dark">{item.aiAnalysis?.department || "Pending Analysis"}</span>
                  </div>
                </div>

                <div className="col-12">
                  <hr className="my-2 opacity-50" />
                  <label className="text-uppercase text-muted fw-bold mb-2" style={{ fontSize: '0.75rem' }}>Location Details</label>
                  <div className="d-flex align-items-start">
                    <div className="p-2 bg-light rounded-3 me-3">📍</div>
                    <div>
                      <div className="fw-semibold text-dark">{item.village}, {item.mandal}</div>
                      <div className="text-muted">{item.district} District</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Box Integrated on Right for Large Screens */}
              <div className="mt-5 p-4 rounded-4" style={{ background: "#f8fafc", borderLeft: "4px solid #0d6efd" }}>
                <label className="fw-bold text-uppercase small text-primary mb-2 d-block">
                  User Complaint
                </label>
                <p className="mb-0 lh-base italic" style={{ fontSize: "1.1rem", color: "#334155", fontStyle: "italic" }}>
                  "{item.description}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-top bg-light text-end">
          <button
            className="btn btn-dark px-5 py-2 fw-bold rounded-pill shadow-sm"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;
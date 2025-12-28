import React from "react";

function DetailPopup({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="modal-overlay animate-fade-in"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(5px)",
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
          maxWidth: "850px",
          maxHeight: "90vh",
          overflowY: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom bg-light rounded-top-4 sticky-top">
          <div>
            <h4 className="m-0 fw-bold text-dark">
              Grievance Overview
            </h4>
            <small className="text-muted">
              ID: {item._id?.substring(0, 8).toUpperCase()}
            </small>
          </div>
          <button
            className="btn-close"
            onClick={onClose}
          />
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <div className="row g-4">
            <div className="col-lg-5">
              <img
                src={item.imageUrl}
                alt="Evidence"
                className="img-fluid rounded-4 shadow-sm border"
                style={{ height: "320px", objectFit: "cover" }}
              />
            </div>

            <div className="col-lg-7">
              <div className="mb-3">
                <label className="small fw-bold text-muted">STATUS</label>
                <div className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                  {item.status}
                </div>
              </div>

              <div className="mb-3">
                <label className="small fw-bold text-muted">DEPARTMENT</label>
                <div className="fw-semibold">
                  {item.aiAnalysis?.department || "Pending"}
                </div>
              </div>

              <div>
                <label className="small fw-bold text-muted">LOCATION</label>
                <div className="small">
                  {item.village}, {item.mandal}<br />
                  {item.district} District
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="bg-light p-4 rounded-4 border">
                <label className="fw-bold text-uppercase small text-primary">
                  User Complaint Description
                </label>
                <p className="mt-3 mb-0 fs-5 text-dark">
                  “{item.description}”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-top bg-light text-end rounded-bottom-4">
          <button
            className="btn btn-outline-secondary px-4 py-2 rounded-pill"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;

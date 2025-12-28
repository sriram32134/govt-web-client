import { useEffect, useState } from "react";
import RejectModel from "./RejectModel";
import API from "../api/axios";

/**
 * ComplaintsTable Component
 * Displays a list of grievances for the VRO with a modern, high-contrast UI.
 * Integrates status updates, permanent deletion, and detailed view popups.
 */
function ComplaintsTable({ district, mandal, department }) {
  const [complaints, setComplaints] = useState([]);
  const [showReject, setShowReject] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewComplaint, setViewComplaint] = useState(null);

  // 🔄 Fetch real reports for this specific jurisdiction
  const fetchComplaints = async () => {
    try {
      let query = `/officer/complaints?district=${district}&mandal=${mandal}`;
      if (department) query += `&department=${department}`;
      const res = await API.get(query);
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [district, mandal, department]);

  // 📝 Update complaint status with optional rejection reason
  const updateStatus = async (id, status, reason = null) => {
    try {
      await API.put(`/officer/complaints/${id}/status`, { status, reason });
      
      // Close rejection modal if open
      if (status === "Rejected") {
        setShowReject(false);
        setSelectedComplaint(null);
      }

      fetchComplaints();
    } catch (error) {
      alert("Error updating status. Please check your connection.");
    }
  };

  // 🗑️ Permanently remove the report from the ledger
  const deleteComplaint = async (id) => {
    if (window.confirm("Permanently delete this report? This action cannot be undone.")) {
      await API.delete(`/officer/complaints/${id}`);
      fetchComplaints();
    }
  };

  const openReject = (complaint) => {
    setSelectedComplaint(complaint);
    setShowReject(true);
  };

  return (
    <>
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 custom-admin-table">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="ps-4 text-muted small py-3 fw-bold">VILLAGE</th>
                <th className="text-muted small py-3 fw-bold">GRIEVANCE DESCRIPTION</th>
                <th className="text-muted small py-3 fw-bold">CATEGORY</th>
                <th className="text-muted small py-3 fw-bold">STATUS</th>
                <th className="text-center text-muted small py-3 pe-4 fw-bold">ACTION PANEL</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-5 text-muted">No records found matching your selection.</td></tr>
              ) : (
                complaints.map((c) => (
                  <tr key={c._id} onClick={() => setViewComplaint(c)} className="table-row-hover transition">
                    <td className="ps-4 fw-bold text-dark">{c.village}</td>
                    <td className="text-muted" style={{ maxWidth: "250px" }}>
                      <div className="text-truncate">{c.description}</div>
                      {c.status === "Rejected" && (
                        <div className="text-danger small mt-1 fw-semibold" style={{ fontSize: '0.7rem' }}>
                          <i className="bi bi-exclamation-triangle-fill me-1"></i>
                          Reason: {c.reason || "No reason provided"}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-2 py-1">
                        {c.aiAnalysis?.department || "General"}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()} className="text-center pe-4">
                      <div className="d-flex justify-content-center gap-2">
                        {/* 1. Pending Actions */}
                        {c.status === "Pending" && (
                          <>
                            <button className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={() => updateStatus(c._id, "Accepted")}>Accept</button>
                            <button className="btn btn-sm btn-outline-warning rounded-pill px-3" onClick={() => openReject(c)}>Reject</button>
                          </>
                        )}
                        
                        {/* 2. Accepted Actions */}
                        {c.status === "Accepted" && (
                          <button className="btn btn-sm btn-success rounded-pill px-3 shadow-sm" onClick={() => updateStatus(c._id, "Completed")}>Finalize</button>
                        )}
                        
                        {/* 3. Terminal State Actions */}
                        {(c.status === "Rejected" || c.status === "Completed") && (
                          <button className="btn btn-sm btn-outline-danger rounded-circle border-0" onClick={() => deleteComplaint(c._id)}>
                            <i className="bi bi-trash3"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* REJECTION MODAL: Capture feedback before rejecting */}
      {showReject && (
        <RejectModel
          onSubmit={(reason) => updateStatus(selectedComplaint._id, "Rejected", reason)}
          onClose={() => {
            setShowReject(false);
            setSelectedComplaint(null);
          }}
        />
      )}

      {/* DETAIL OVERLAY: High-fidelity popup */}
      {viewComplaint && (
        <div 
          className="modal-overlay" 
          onClick={() => setViewComplaint(null)} 
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}
        >
          <div 
            className="modal-box bg-white p-4 rounded shadow-lg animate-scale-in" 
            style={{ width: "95%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h4 className="m-0 text-primary fw-bold">Grievance Details</h4>
              <button className="btn-close" onClick={() => setViewComplaint(null)}></button>
            </div>

            {viewComplaint.imageUrl && (
              <div className="text-center mb-4">
                <img 
                  src={viewComplaint.imageUrl} 
                  alt="Evidence" 
                  className="img-fluid rounded shadow-sm border" 
                  style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }} 
                />
              </div>
            )}

            <div className="row g-3">
              <div className="col-md-6">
                <strong>Current Status:</strong> 
                <span className={`ms-2 status-pill ${viewComplaint.status.toLowerCase()}`}>
                  {viewComplaint.status}
                </span>
              </div>
              <div className="col-md-6 text-md-end">
                <small className="text-muted">
                  Filed on: {new Date(viewComplaint.createdAt).toLocaleDateString()}
                </small>
              </div>

              {viewComplaint.status === "Rejected" && (
                <div className="col-12 mt-2">
                  <div className="alert alert-danger border-start border-4 border-danger py-3 shadow-sm">
                    <h6 className="fw-bold mb-1 text-danger">Reason for Rejection:</h6>
                    <p className="mb-0">{viewComplaint.reason || "The officer has not provided a specific reason."}</p>
                  </div>
                </div>
              )}

              <div className="col-12">
                <strong>Assigned Department:</strong> {viewComplaint.aiAnalysis?.department || "General"}
              </div>

              <div className="col-12">
                <strong>Location:</strong> {viewComplaint.village}, {viewComplaint.mandal}, {viewComplaint.district}
              </div>

              {viewComplaint.location && (
                <div className="col-12 text-muted small">
                  <strong>GPS:</strong> {viewComplaint.location.lat.toFixed(4)}, {viewComplaint.location.lng.toFixed(4)}
                </div>
              )}

              <div className="col-12 mt-2">
                <label className="fw-bold d-block border-bottom mb-2">Complaint Description:</label>
                <p className="p-3 bg-light rounded border-start border-4 border-primary font-italic">
                  "{viewComplaint.description}"
                </p>
              </div>
            </div>

            <div className="text-end mt-4">
              <button className="btn btn-secondary px-4 rounded-pill fw-bold" onClick={() => setViewComplaint(null)}>Close Ledger</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ComplaintsTable;
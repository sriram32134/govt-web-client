import { useEffect, useState } from "react";
import RejectModel from "./RejectModel";
import API from "../api/axios";

function ComplaintsTable({ district, mandal, department }) {
  const [complaints, setComplaints] = useState([]);
  const [showReject, setShowReject] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewComplaint, setViewComplaint] = useState(null);

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

  const updateStatus = async (id, status) => {
    await API.put(`/officer/complaints/${id}/status`, { status });
    fetchComplaints();
  };

  const deleteComplaint = async (id) => {
    if (window.confirm("Permanently delete this report?")) {
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
      <div className="table-responsive bg-white shadow-sm rounded">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Village</th>
              <th>Description</th>
              <th>Dept</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4">No reports found.</td></tr>
            ) : (
              complaints.map((c) => (
                <tr key={c._id} onClick={() => setViewComplaint(c)} style={{ cursor: "pointer" }}>
                  <td>{c.village}</td>
                  <td className="text-truncate" style={{ maxWidth: "200px" }}>{c.description}</td>
                  <td><span className="badge bg-info text-dark">{c.aiAnalysis?.department || "General"}</span></td>
                  <td>
                    <span className={`badge ${c.status === 'Pending' ? 'bg-warning text-dark' : c.status === 'Accepted' ? 'bg-primary' : c.status === 'Completed' ? 'bg-success' : 'bg-danger'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()} className="text-center">
                    <div className="btn-group gap-2">
                      
                      {/* 1. INITIAL STATE (Pending) */}
                      {c.status === "Pending" && (
                        <>
                          <button className="btn btn-sm btn-success" onClick={() => updateStatus(c._id, "Accepted")}>Accept</button>
                          <button className="btn btn-sm btn-warning" onClick={() => openReject(c)}>Reject</button>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteComplaint(c._id)}>Delete</button>
                        </>
                      )}

                      {/* 2. ACCEPTED STATE */}
                      {c.status === "Accepted" && (
                        <>
                          <button className="btn btn-sm btn-success" onClick={() => updateStatus(c._id, "Completed")}>Completed</button>
                          <button className="btn btn-sm btn-warning" onClick={() => openReject(c)}>Reject</button>
                        </>
                      )}

                      {/* 3. COMPLETED STATE */}
                      {c.status === "Completed" && (
                        <button className="btn btn-sm btn-danger" onClick={() => deleteComplaint(c._id)}>Delete</button>
                      )}

                      {/* 4. REJECTED STATE */}
                      {c.status === "Rejected" && (
                        <button className="btn btn-sm btn-danger" onClick={() => deleteComplaint(c._id)}>Delete</button>
                      )}

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showReject && (
        <RejectModel
          onSubmit={async (reason) => {
            await API.put(`/officer/complaints/${selectedComplaint._id}/status`, { status: "Rejected", reason });
            setShowReject(false);
            fetchComplaints();
          }}
          onClose={() => setShowReject(false)}
        />
      )}

      {/* Detail Overlay */}
      {viewComplaint && (
        <div className="modal-overlay" onClick={() => setViewComplaint(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div className="bg-white p-4 rounded" style={{ maxWidth: "500px", width: "90%" }} onClick={e => e.stopPropagation()}>
            <h4>Complaint Details</h4>
            <hr />
            <p><strong>Description:</strong> {viewComplaint.description}</p>
            <p><strong>Status:</strong> {viewComplaint.status}</p>
            {viewComplaint.imageUrl && <img src={viewComplaint.imageUrl} className="img-fluid rounded mt-2" alt="evidence" />}
            <div className="text-end mt-3">
              <button className="btn btn-secondary" onClick={() => setViewComplaint(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ComplaintsTable;
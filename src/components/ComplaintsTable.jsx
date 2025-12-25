import { useState } from "react";
import RejectModel from "./RejectModel";

const complaintsData = [
  {
    id: 1,
    title: "No drinking water",
    village: "Gurla",
    district: "Vizianagaram",
    status: "pending",
  },
  {
    id: 2,
    title: "Road damaged",
    village: "Cheepurupalli",
    district: "Vizianagaram",
    status: "pending",
  },
  {
    id: 3,
    title: "Street lights not working",
    village: "Amadalavalasa",
    district: "Srikakulam",
    status: "pending",
  },
  {
    id: 4,
    title: "Street lights not working",
    village: "Annavaram",
    district: "Kakinada",
    status: "pending",
  },
];

function ComplaintTable({ district }) {
  const [complaints, setComplaints] = useState(complaintsData);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [viewComplaint, setViewComplaint] = useState(null);

  const filteredComplaints = complaints.filter(
    (c) => c.district === district
  );

  function handleAccept(id) {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: "approved" } : c
    );
    setComplaints(updated);
  }

  function handleReject(id) {
    setSelectedId(id);
    setShowModal(true);
  }

  function submitReject(reason) {
    const updated = complaints.map((c) =>
      c.id === selectedId
        ? { ...c, status: "rejected", reason }
        : c
    );
    setComplaints(updated);
    setShowModal(false);
  }

  return (
    <>
      <table style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Village</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredComplaints.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No complaints found
              </td>
            </tr>
          ) : (
            filteredComplaints.map((c) => (
              <tr
                key={c.id}
                onClick={() => setViewComplaint(c)}
                style={{ cursor: "pointer" }}
              >
                <td>{c.title}</td>
                <td>{c.village}</td>
                <td>{c.status}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(c.id);
                    }}
                    disabled={c.status !== "pending"}
                  >
                    Accept
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(c.id);
                    }}
                    disabled={c.status !== "pending"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <RejectModel
          onClose={() => setShowModal(false)}
          onSubmit={submitReject}
        />
      )}

      {viewComplaint && (
        <div
          onClick={() => setViewComplaint(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              width: "520px",
              maxWidth: "90%",
              padding: "22px",
              borderRadius: "10px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
            }}
          >
            <h3
              style={{
                color: "#0b3c5d",
                marginBottom: "18px",
                fontSize: "22px",
              }}
            >
              Complaint Details
            </h3>

            <p style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>Title:</strong> {viewComplaint.title}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>Village:</strong> {viewComplaint.village}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>District:</strong> {viewComplaint.district}
            </p>
            <p style={{ fontSize: "16px", margin: "8px 0" }}>
              <strong>Status:</strong> {viewComplaint.status}
            </p>

            {viewComplaint.reason && (
              <p style={{ fontSize: "16px", margin: "8px 0" }}>
                <strong>Rejection Reason:</strong>{" "}
                {viewComplaint.reason}
              </p>
            )}

            <button
              onClick={() => setViewComplaint(null)}
              style={{
                marginTop: "18px",
                padding: "10px 18px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#0b3c5d",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ComplaintTable;

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

  const filteredComplaints = complaints.filter(
    (c) => c.district === district
  );

  function handleAccept(id) {
    const updatedComplaints = complaints.map((c) =>
      c.id === id ? { ...c, status: "approved" } : c
    );
    setComplaints(updatedComplaints);
  }

  function handleReject(id) {
    setSelectedId(id);
    setShowModal(true);
  }

  function submitReject(reason) {
    const updatedComplaints = complaints.map((c) =>
      c.id === selectedId
        ? { ...c, status: "rejected", reason }
        : c
    );
    setComplaints(updatedComplaints);
    setShowModal(false);
  }

  return (
    <>
      <table style={{ marginTop: "20px" }}>
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
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.village}</td>
                <td className={`status-${c.status}`}>
                  {c.status}
                </td>
                <td>
                  <button
                    onClick={() => handleAccept(c.id)}
                    disabled={c.status !== "pending"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(c.id)}
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
    </>
  );
}

export default ComplaintTable;

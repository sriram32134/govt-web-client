import React, { useState } from "react";

function MobileNumberModal({ onClose, onSubmit }) {
  const [num, setNum] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNum(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh

    if (num.length === 10) {
      onSubmit(num);
    }
  };

  return (
    /* 🔥 Overlay click closes popup */
    <div className="modal-overlay" onClick={onClose}>
      {/* 🔥 Stop close when clicking inside popup */}
      <div
        className="modal-box shadow-lg border-0"
        style={{ maxWidth: "850px", width: "95%", padding: "50px" }}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="row align-items-center">
          {/* LEFT SIDE */}
          <div className="col-md-5 border-end pe-md-5">
            <h1 className="fw-bold mb-3" style={{ color: "#0D2C50" }}>
              Track Reports
            </h1>
            <p className="lead text-muted">
              Enter your registered mobile number to access your grievance history.
            </p>
            <div className="mt-4 p-3 bg-light rounded-3 small text-secondary">
              Check the status of your complaints and view department responses.
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-7 ps-md-5 mt-4 mt-md-0">
            {/* 🔥 FORM enables ENTER key */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold h5 mb-3">
                  Mobile Number
                </label>

                <div className="input-group input-group-lg shadow-sm mb-3">
                  <span className="input-group-text bg-white border-end-0">
                    +91
                  </span>
                  <input
                    type="tel"
                    className="form-control border-start-0 ps-0 fw-bold"
                    style={{
                      letterSpacing: "2px",
                      fontSize: "1.4rem",
                      color: "#0D2C50",
                    }}
                    placeholder="XXXXXXXXXX"
                    maxLength="10"
                    value={num}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </div>
              </div>

              <div className="d-grid gap-3">
                {/* ENTER key triggers this */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg py-3 fw-bold shadow"
                  style={{ backgroundColor: "#0b3c5d", border: "none" }}
                  disabled={num.length !== 10}
                >
                  FETCH COMPLAINTS
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary py-2 fw-semibold"
                  onClick={onClose}
                >
                  Cancel & Return
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNumberModal;

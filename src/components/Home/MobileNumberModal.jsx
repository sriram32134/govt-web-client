import React, { useState } from "react";

function MobileNumberModal({ onClose, onSubmit }) {
  const [num, setNum] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNum(value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box shadow-lg border-0" style={{ maxWidth: "850px", width: "95%", padding: "50px" }}>
        
        {/* Close Icon in Top Right */}
        <button 
          className="btn-close position-absolute" 
          style={{ top: "25px", right: "25px" }} 
          onClick={onClose} 
          aria-label="Close"
        ></button>

        <div className="row align-items-center">
          {/* Left Side: Instructions */}
          <div className="col-md-5 border-end pe-md-5">
            <h1 className="fw-bold text-primary mb-3">Track Reports</h1>
            <p className="lead text-muted">
              Enter your registered mobile number to access your grievance history.
            </p>
            <div className="mt-4 p-3 bg-light rounded-3 small text-secondary">
              Check the status of your complaints and view department responses.
            </div>
          </div>

          {/* Right Side: Input and Buttons */}
          <div className="col-md-7 ps-md-5 mt-4 mt-md-0">
            <div className="mb-4">
              <label className="form-label fw-bold h5 mb-3">Mobile Number</label>
              <div className="input-group input-group-lg shadow-sm mb-3">
                <span className="input-group-text bg-white border-end-0">+91</span>
                <input 
                  type="tel" 
                  className="form-control border-start-0 ps-0 fw-bold text-primary" 
                  style={{ letterSpacing: "3px", fontSize: "1.4rem" }}
                  placeholder="XXXXXXXXXX" 
                  maxLength="10"
                  value={num}
                  onChange={handleInputChange}
                  autoFocus
                />
              </div>
            </div>

            <div className="d-grid gap-3">
              <button 
                className="btn btn-primary btn-lg py-3 fw-bold shadow" 
                style={{ backgroundColor: "#0b3c5d", border: "none" }}
                disabled={num.length !== 10}
                onClick={() => onSubmit(num)}
              >
                FETCH COMPLAINTS
              </button>
              
              {/* Added explicit Cancel Button */}
              <button 
                type="button"
                className="btn btn-outline-secondary py-2 fw-semibold" 
                onClick={onClose}
              >
                Cancel & Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNumberModal;
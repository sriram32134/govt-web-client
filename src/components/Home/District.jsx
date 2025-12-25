import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

function District() {
  const districts = [
    "Anakapalli","Anantapur","Annamayya","Bapatla","Chittoor",
    "Dr. B.R. Ambedkar Konaseema","East Godavari","Eluru","Guntur",
    "Kakinada","Krishna","Kurnool","Nandyal","NTR","Palnadu",
    "Parvathipuram Manyam","Prakasam",
    "Sri Potti Sriramulu Nellore","Sri Sathya Sai","Srikakulam",
    "Tirupati","Visakhapatnam","Vizianagaram","West Godavari","YSR Kadapa"
  ];

  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <main className="hero-section d-flex align-items-center justify-content-center">
      <div className="container text-center py-5">
        <h1 className="display-5 fw-bold mb-3">
          Welcome to Citizen Desk
        </h1>

        <p className="lead mb-5">
          Empowering citizens by directly connecting civic grievances to the right departments
        </p>

        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-8 col-lg-6">
            <div className="row g-2">
              <div className="col-12 col-md-8">
                <select
                  className="form-select form-select-lg bg-white text-dark"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="">Select Your District</option>
                  {districts.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4 d-grid">
                <Link
                  to="/mobile"
                  className={`btn btn-primary btn-lg ${!selectedDistrict ? "disabled" : ""}`}
                >
                  Proceed
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default District;

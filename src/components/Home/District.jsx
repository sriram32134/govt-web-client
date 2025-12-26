import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

// 1. Import your local images
import pic1 from "../../assets/picture-1.png"; 
import pic2 from "../../assets/picture-2.png";
import pic3 from "../../assets/picture-3.png";

function District() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setShowTrackPopup } = useOutletContext();

  // 2. Update the slides array to use the imported variables
  const slides = [
    { 
      id: 1, 
      image: pic1, 
      title: "Active Governance", 
      desc: "Your voice matters." 
    },
    { 
      id: 2, 
      image: pic2, 
      title: "Digital Services", 
      desc: "Easy access to services." 
    },
    { 
      id: 3, 
      image: pic3, 
      title: "Community Outreach", 
      desc: "Building a better future together." 
    }
  ];

  const departments = [
    { name: "Public Works", icon: "🛣️", color: "#e3f2fd" },
    { name: "Power", icon: "⚡", color: "#fff3e0" },
    { name: "Water Supply", icon: "🚰", color: "#e1f5fe" },
    { name: "Sanitation", icon: "🧹", color: "#f1f8e9" },
    { name: "Health", icon: "🏥", color: "#fce4ec" },
    { name: "Education", icon: "🏫", color: "#f3e5f5" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div style={{ backgroundColor: "#fdfdfd" }}>
      {/* HERO SECTION */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-start">
              <h1 className="display-5 fw-bold" style={{ color: "#0a2342" }}>
                Grievance Redressal <br/><span style={{ color: "#ff9933" }}>Made Simple.</span>
              </h1>
              <p className="lead text-muted my-4">
                Connect directly with your local Village Revenue Officer (VRO). 
                Report issues, track progress, and improve your community.
              </p>
              <div className="d-flex gap-3">
                <Link to="/raise-complaint" className="btn btn-primary btn-lg px-4 shadow-sm" style={{ backgroundColor: "#0a2342", border: "none" }}>
                  Raise Complaint
                </Link>
                <button 
                  onClick={() => setShowTrackPopup(true)} 
                  className="btn btn-outline-dark btn-lg px-4"
                >
                  Track Complaint
                </button>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
               <div className="position-relative overflow-hidden rounded-4 shadow-lg" style={{ height: "350px" }}>
                  {slides.map((slide, index) => (
                    <div key={slide.id} className="position-absolute w-100 h-100" style={{ 
                        opacity: index === currentSlide ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                    }}>
                      {/* slide.image now refers to the imported local file */}
                      <img src={slide.image} className="w-100 h-100 object-fit-cover" alt={slide.title} />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS SECTION remains the same */}
      <section className="container py-5">
        <h3 className="fw-bold mb-4 text-center">Department Directory</h3>
        <div className="row g-4">
          {departments.map((dept, i) => (
            <div key={i} className="col-6 col-md-4 col-lg-2">
              <div className="card h-100 border-0 shadow-sm text-center py-4" style={{ borderRadius: "20px", backgroundColor: dept.color }}>
                <div style={{ fontSize: "2.5rem" }}>{dept.icon}</div>
                <h6 className="fw-bold mt-2 mb-0">{dept.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default District;
import React, { useState, useRef } from "react";

const primary = "#0b3c5d";
const primaryHover = "#1c5a9a";

function RaiseComplaint() {
  const [hoverBtn, setHoverBtn] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    district: "",
    mandal: "",
    village: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const getLocation = () => {
  if (!("geolocation" in navigator)) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("SUCCESS", position);

      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      setLocationError("");
    },
    (error) => {
      console.error("ERROR", error);

      switch (error.code) {
        case error.PERMISSION_DENIED:
          setLocationError("Permission denied");
          break;
        case error.POSITION_UNAVAILABLE:
          setLocationError("Position unavailable");
          break;
        case error.TIMEOUT:
          setLocationError("Request timeout");
          break;
        default:
          setLocationError("Unknown error");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, image, location });
    alert("Complaint raised successfully");
  };

  const outlineStyle = (id) => ({
    color: hoverBtn === id ? "#fff" : primary,
    border: `1px solid ${hoverBtn === id ? primaryHover : primary}`,
    backgroundColor: hoverBtn === id ? primaryHover : "transparent",
  });

  const solidStyle = {
    backgroundColor: primary,
    border: `1px solid ${primary}`,
    color: "#fff",
  };

  return (
    <main className="hero-section py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4"style={{color:"#0D2C50"}}>Raise a Complaint</h2>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              className="form-control form-control-lg"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="tel"
              name="mobile"
              maxLength="10"
              className="form-control form-control-lg"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <select
              name="district"
              className="form-select form-select-lg"
              value={formData.district}
              onChange={handleChange}
              required
            >
              <option value="">Select District</option>
              <option>Visakhapatnam</option>
              <option>Guntur</option>
              <option>Krishna</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              name="mandal"
              className="form-select form-select-lg"
              value={formData.mandal}
              onChange={handleChange}
              required
            >
              <option value="">Select Mandal</option>
              <option>Mandal 1</option>
              <option>Mandal 2</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              name="village"
              className="form-select form-select-lg"
              value={formData.village}
              onChange={handleChange}
              required
            >
              <option value="">Select Village</option>
              <option>Village A</option>
              <option>Village B</option>
            </select>
          </div>

          <div className="col-12">
            <textarea
              name="description"
              rows="4"
              className="form-control form-control-lg"
              placeholder="Describe your problem"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn"
                style={outlineStyle("camera")}
                onMouseEnter={() => setHoverBtn("camera")}
                onMouseLeave={() => setHoverBtn(null)}
                onClick={() => cameraInputRef.current.click()}
              >
                Open Camera
              </button>

              <button
                type="button"
                className="btn"
                style={outlineStyle("file")}
                onMouseEnter={() => setHoverBtn("file")}
                onMouseLeave={() => setHoverBtn(null)}
                onClick={() => fileInputRef.current.click()}
              >
                Choose File
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraInputRef}
              className="d-none"
              onChange={handleImage}
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="d-none"
              onChange={handleImage}
            />
          </div>

          {preview && (
            <div className="col-12 text-center mt-3">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "250px" }}
              />
            </div>
          )}

                    <div className="col-12 mt-2">
            <button
              type="button"
              disabled={!!location}
              className="btn"
              style={outlineStyle("location")}
              onMouseEnter={() => setHoverBtn("location")}
              onMouseLeave={() => setHoverBtn(null)}
              onClick={getLocation}
            >
              {location ? "Location Captured ✓" : "Get Current Location"}
            </button>

            {location && (
              <div className="mt-2 p-2 rounded" style={{ border: `1px solid ${primary}` }}>
                <small>
                  Latitude: {location.lat}
                  <br />
                  Longitude: {location.lng}
                </small>
              </div>
            )}

            {locationError && (
              <p className="mt-2 small text-danger">{locationError}</p>
            )}
          </div>


          <div className="col-12 d-grid mt-3">
            <button type="submit" className="btn btn-lg" style={solidStyle}>
              Raise Complaint
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RaiseComplaint;

import React, { useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { locationData } from "../../data/locations";

const primary = "#0b3c5d";

function RaiseComplaint() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    district: "",
    mandal: "",
    village: "",
    description: "",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDistrictChange = (e) => {
    setFormData({ ...formData, district: e.target.value, mandal: "" }); // Reset mandal on district change
  };

  const handleSendOtp = async () => {
    if (formData.mobile.length !== 10) return alert("Enter valid 10-digit mobile");
    await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: formData.mobile }),
    });
    setIsOtpSent(true);
    alert("OTP sent");
  };

  const handleVerifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: formData.mobile, otp }),
    });
    const data = await res.json();
    if (data.success) { setIsVerified(true); alert("Verified"); } 
    else alert("Invalid OTP");
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocationError("Location permission denied")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) return alert("Verify mobile first");
    if (!uploadedImageUrl) return alert("Upload image first");
    if (!location) return alert("Capture location first");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/complaints/raise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, imageUrl: uploadedImageUrl, location }),
      });
      const result = await res.json();
      if (result.success) { alert("Submitted successfully"); window.location.reload(); }
    } catch { alert("Server error"); } 
    finally { setLoading(false); }
  };

  return (
    <main className="hero-section py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4" style={{ color: "#0D2C50" }}>Raise a Complaint</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          
          <div className="col-md-6">
            <input type="text" name="name" className="form-control form-control-lg" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <input type="tel" name="mobile" className="form-control" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} maxLength="10" disabled={isVerified} required />
              {!isVerified && (
                <button type="button" className="btn btn-primary" style={{ backgroundColor: primary }} onClick={isOtpSent ? handleVerifyOtp : handleSendOtp}>
                  {isOtpSent ? "Verify OTP" : "Send OTP"}
                </button>
              )}
            </div>
            {isOtpSent && !isVerified && <input type="text" className="form-control mt-2" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />}
          </div>

          <div className="col-md-4">
            <select name="district" className="form-select form-select-lg" value={formData.district} onChange={handleDistrictChange} required>
              <option value="">Select District</option>
              {Object.keys(locationData).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="col-md-4">
            <select name="mandal" className="form-select form-select-lg" value={formData.mandal} onChange={handleChange} required disabled={!formData.district}>
              <option value="">Select Mandal</option>
              {formData.district && locationData[formData.district].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="col-md-4">
            <input type="text" name="village" className="form-control form-control-lg" placeholder="Village Name" value={formData.village} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <textarea name="description" rows="4" className="form-control form-control-lg" placeholder="Describe your problem" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <IKContext publicKey={import.meta.env.VITE_IK_PUBLIC_KEY} urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} 
              authenticator={async () => {
                const res = await fetch("http://localhost:5000/api/auth/ik-auth");
                return await res.json();
              }}>
              <IKUpload fileName="complaint.jpg" useUniqueFileName className="form-control" onSuccess={(res) => setUploadedImageUrl(res.url)} onError={() => alert("Upload failed")} />
            </IKContext>
          </div>

          <div className="col-12">
            <button type="button" className={`btn ${location ? 'btn-success' : 'btn-outline-primary'}`} onClick={getLocation}>
              {location ? "Location Captured ✓" : "Get Current Location"}
            </button>
          </div>

          <div className="col-12 d-grid mt-3">
            <button type="submit" className="btn btn-lg text-white" style={{ backgroundColor: primary }} disabled={loading}>
              {loading ? "Submitting..." : "Raise Complaint"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default RaiseComplaint;
import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/incident_form");
  };

  return (
    <section className="bg-blue-100 h-screen">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-full ">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">RipotiChapChap</h2>
          <p className="text-lg mb-6">
            Report incidents that have occured instantly.
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 animate-bounce"
            onClick={handleSubmit}
          >
            Report
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/emergencyAnime.webp"
            alt="emergencyAnime"
            className="w-9/12 h-9/12 rounded-lg shadow-2xl shadow-blue-950 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default LandingPage;

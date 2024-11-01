import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/incident_form");
  };

  return (
    <section className="bg-slate-100 h-screen">
      <div className="flex flex-col md:flex-row justify-between h-full w-full">
        {/* Left side - Details */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center text-center p-4 bg-white">
          <h2 className="text-4xl font-bold mb-4 border-b-2 border-slate-950 p-2">
            <span className="text-red-500">RipotiChap</span> Chap
          </h2>
          <p className="text-lg mb-6 animate-slideIn font-sans leading-relaxed text-gray-800 transition duration-500 ease-in-out transform hover:scale-105">
            In times of crisis, every second counts, and your vigilance can make
            a life-saving difference.
            <span className="text-red-500 font-bold">
              “Report. Respond. Recover – Your Alert Saves Lives !”
            </span>{" "}
            embodies the essence of community safety and emergency management.
            When you report an incident, you initiate a chain reaction that
            mobilizes resources, engages responders, and ultimately saves lives.
            Each alert you provide is not just a piece of information; it’s a
            call to action that empowers emergency services to act swiftly and
            effectively. Whether it’s a fire, flood, medical emergency, or any
            other urgent situation, your timely reporting can ensure that help
            reaches those in need without delay.
          </p>

          <button
            className="bg-red-500 animate-bounce text-white px-4 py-2 rounded-md transition-transform duration-200 hover:bg-red-700 hover:scale-105 hover:shadow-lg"
            onClick={handleSubmit}
          >
            Report
          </button>
        </div>

        {/* Right side - Full-width Image */}
        <div className="w-full md:w-1/2 h-full">
          <img
            src="/mombasaDRCAT1.jpg"
            alt="mombasaDRCAT1"
            className="w-full h-full object-cover rounded-lg shadow-2xl shadow-blue-200"
          />
        </div>
      </div>
    </section>
  );
}

export default LandingPage;

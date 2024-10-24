import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function IncidentDetails() {
  const { id } = useParams();
  const incidents = useSelector((state) => state.incident.incidents);
  const incident = incidents.find(
    (incident) => incident.id === parseInt(id, 10)
  );

  const navigate = useNavigate();

  if (!incident) {
    return <p className="text-center text-red-500">Incident not found</p>;
  }

  // Ensure mediaFiles is an array of URLs
  const mediaFiles = Array.isArray(incident.mediaFiles)
    ? incident.mediaFiles
    : [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-4 text-blue-500 hover:text-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Notifications
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">Incident Details</h2>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-3 gap-8">
          <p>
            <strong>Date:</strong> {incident.created_at}
          </p>
          <p>
            <strong>Type:</strong> {incident.type}
          </p>
          <p>
            <strong>Time:</strong> {incident.time}
          </p>
        </div>

        <p>
          <strong>Location:</strong> {incident.location}
        </p>
        <p>
          <strong>Summary:</strong> {incident.summary}
        </p>

        {/* Display attached images */}
        {mediaFiles.length > 0 && (
          <div className="mt-4">
            <p>
              <strong>Attached Media Files:</strong>
            </p>
            <div className="grid grid-cols-3 gap-4">
              {mediaFiles.map((fileUrl, index) => (
                <img
                  key={index}
                  src={fileUrl} // Use the public URL to display the image
                  alt={`Incident Media ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Map Display */}
        {incident.latitude && incident.longitude && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Incident Location on Map</h3>
            <MapContainer
              center={[incident.latitude, incident.longitude]}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-64"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[incident.latitude, incident.longitude]}>
                <Popup>Incident Location: {incident.location}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default IncidentDetails;

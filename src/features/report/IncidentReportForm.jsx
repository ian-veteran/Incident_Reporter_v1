import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addIncident } from "./incidentSlice";
import supabase from "../../service/supabase";

function IncidentReportForm() {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    time: "",
    summary: "",
    mediaFiles: [],
    latitude: "",
    longitude: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData({
      ...formData,
      mediaFiles: [...formData.mediaFiles, ...files],
    });
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation", error);
          alert("Unable to fetch geolocation.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedFiles = [];
      for (const file of formData.mediaFiles) {
        const { data, error } = await supabase.storage
          .from("incidentImages")
          .upload(`incidents/${Date.now()}_${file.name}`, file);
        if (error) {
          console.error("Image upload error:", error);
          alert(`Error uploading file ${file.name}: ${error.message}`);
        } else {
          const publicUrl = supabase.storage
            .from("incidentImages")
            .getPublicUrl(data.path);
          uploadedFiles.push(publicUrl.publicUrl);
        }
      }
      const { data, error } = await supabase.from("incidentDetails").insert([
        {
          ...formData,
          mediaFiles: uploadedFiles,
          created_at: new Date(),
        },
      ]);

      if (error) throw new Error(error.message);
      if (data && data.length > 0) {
        dispatch(addIncident(data[0]));
        navigate("/notifications");
      }
    } catch (error) {
      console.error("Error submitting incident:", error.message);
      alert(`Failed to submit the incident. Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Select type of incident */}
        <select
          name="type"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="">Select type of incident</option>
          <option value="Fire">Fire</option>
          <option value="Flood">Flood</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Robbery">Robbery</option>
          <option value="Accident">Accident</option>
        </select>

        <input
          type="text"
          name="location"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Location of the incident"
          value={formData.location}
          onChange={handleInputChange}
        />

        <input
          type="time"
          name="time"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={formData.time}
          onChange={handleInputChange}
        />

        <textarea
          name="summary"
          placeholder="Summary of the incident"
          className="w-full p-3 border border-gray-300 rounded-lg lg:col-span-3"
          rows="4"
          value={formData.summary}
          onChange={handleInputChange}
        />

        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaChange}
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
        />

        <button
          type="button"
          onClick={handleGeolocation}
          className="w-full p-3 bg-green-500 text-white rounded-lg lg:col-span-3"
        >
          Capture Geolocation
        </button>

        {formData.latitude && formData.longitude && (
          <p className="lg:col-span-3">
            <strong>Geolocation:</strong> Latitude {formData.latitude}, Longitude {formData.longitude}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg lg:col-span-3"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default IncidentReportForm;

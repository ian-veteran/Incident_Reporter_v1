import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addIncident } from "./incidentSlice";
import supabase from "../../service/supabase";

const counties = [
  
]

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
  
      // Loop through each file in mediaFiles and upload it to Supabase
      for (const file of formData.mediaFiles) {
        const { data, error } = await supabase.storage
          .from("incidentImages")
          .upload(`incidents/${Date.now()}_${file.name}`, file);
  
        if (error) {
          console.error("Image upload error:", error);
          alert(`Error uploading file ${file.name}: ${error.message}`);
        } else {
          // Manually construct the public URL using the storage bucket and path
          const publicUrl = `https://rtwmflquinnbaeqbfkpz.supabase.co/storage/v1/object/public/incidentImages/${data.path}`;
          
          console.log("Public URL for file:", publicUrl);  // Log the constructed public URL
          uploadedFiles.push(publicUrl);  // Add the public URL to the array
        }
      }
  
      // Log the array of uploaded files
      console.log("Uploaded Files Array:", uploadedFiles);
  
      // Insert the incident details, including media files
      const { data, error } = await supabase
        .from("incidentDetails")
        .insert([{
          type: formData.type,
          location: formData.location,
          time: formData.time,
          summary: formData.summary,
          mediaFiles: uploadedFiles,  // Save the array of URLs
          latitude: formData.latitude,
          longitude: formData.longitude,
          created_at: new Date(),
        }]);
  
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
    <>
      {/* Header */}
      <header className="text-center p-4">
        <h1 className="text-3xl font-bold text-blue-600">RipotiChapChap</h1>
      </header>

      {/* Main Form Container */}
      <div className="max-w-5xl mx-auto p-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

      {/* Footer */}
      <footer className="text-center mt-8 p-4 text-gray-500">
        © {new Date().getFullYear()} RipotiChapChap. All rights reserved.
      </footer>
    </>
  );
}

export default IncidentReportForm;

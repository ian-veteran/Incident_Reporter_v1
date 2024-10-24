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

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle media file upload
  const handleMediaChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData({
      ...formData,
      mediaFiles: [...formData.mediaFiles, ...files],
    });
  };

  // Geolocation: Capture user's location
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Log the form data for debugging
      console.log("Form data being submitted:", formData);

     
    // Upload media files (images)
    const uploadedFiles = [];
    for (const file of formData.mediaFiles) {
      const { data, error } = await supabase.storage
        .from("incidentImages")
        .upload(`incidents/${Date.now()}_${file.name}`, file);

      if (error) {
        console.error("Image upload error:", error);
        // Optionally alert user about specific file issues
        alert(`Error uploading file ${file.name}: ${error.message}`);
      } else {
        // If upload is successful, get the public URL of the uploaded file
        const publicUrl = supabase.storage
          .from("incidentImages")
          .getPublicUrl(data.path);
        console.log(`Uploaded ${file.name}, public URL: ${publicUrl.publicUrl}`);
        uploadedFiles.push(publicUrl.publicUrl); // Push the URL to the array
      }
    }
      // Insert data into the 'incidentDetails' table in Supabase
      const { data, error } = await supabase.from("incidentDetails").insert([
        {
          type: formData.type,
          location: formData.location,
          time: formData.time,
          summary: formData.summary,
          latitude: formData.latitude,
          longitude: formData.longitude,
          mediaFiles:uploadedFiles,
          created_at: new Date(),
          
        },
      ]);

      // Log the response from Supabase
      console.log("Supabase response:", data);

      if (error) {
        // Log the Supabase error for debugging
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      if (data && data.length > 0) {
        // Only dispatch if data is valid
        dispatch(addIncident(data[0])); // Add the new incident to the Redux store
        navigate("/notifications"); // Redirect to the notifications page
      } else {
        throw new Error("No data returned from Supabase");
      }
    } catch (error) {
      console.error("Error submitting incident:", error.message);
      alert(`Failed to submit the incident. Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md h-screen mx-auto p-1 bg-gray-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        {/* Select type of incident */}

        <select
          name="type"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
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
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Location of the incident"
          value={formData.location}
          onChange={handleInputChange}
        />

        <input
          type="time"
          name="time"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          value={formData.time}
          onChange={handleInputChange}
        />

        <textarea
          name="summary"
          placeholder="Summary of the incident"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          rows="4"
          value={formData.summary}
          onChange={handleInputChange}
        />

        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleMediaChange}
          className="w-full p-3 bg-gray-100 border-r border-gray-300 rounded-lg mb-4"
        />

        {/* Button to capture user's geolocation */}
        <button
          type="button"
          onClick={handleGeolocation}
          className="w-full p-3 bg-green-500 text-white rounded-lg mb-4"
        >
          Capture Geolocation
        </button>

        {/* Display captured geolocation */}
        {formData.latitude && formData.longitude && (
          <p className="mb-4">
            <strong>Geolocation:</strong> Latitude {formData.latitude},
            Longitude {formData.longitude}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default IncidentReportForm;

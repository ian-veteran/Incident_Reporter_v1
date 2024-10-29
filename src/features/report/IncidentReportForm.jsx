import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncident, fetchAddress } from "./incidentSlice";
import supabase from "../../service/supabase";

export const counties = {
  1: "Mombasa",
  2: "Kwale",
  3: "Kilifi",
  4: "Tana River",
  5: "Lamu",
  6: "Taita/Taveta",
  7: "Garissa",
  8: "Wajir",
  9: "Mandera",
  10: "Marsabit",
  11: "Isiolo",
  12: "Meru",
  13: "Tharaka-Nithi",
  14: "Embu",
  15: "Kitui",
  16: "Machakos",
  17: "Makueni",
  18: "Nyandarua",
  19: "Nyeri",
  20: "Kirinyaga",
  21: "Murang'a",
  22: "Kiambu",
  23: "Turkana",
  24: "West Pokot",
  25: "Samburu",
  26: "Trans Nzoia",
  27: "Uasin Gishu",
  28: "Elgeyo/Marakwet",
  29: "Nandi",
  30: "Baringo",
  31: "Laikipia",
  32: "Nakuru",
  33: "Narok",
  34: "Kajiado",
  35: "Kericho",
  36: "Bomet",
  37: "Kakamega",
  38: "Vihiga",
  39: "Bungoma",
  40: "Busia",
  41: "Siaya",
  42: "Kisumu",
  43: "Homa Bay",
  44: "Migori",
  45: "Kisii",
  46: "Nyamira",
  47: "Nairobi City",
};

function IncidentReportForm() {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    time: "",
    summary: "",
    mediaFiles: [],
    latitude: "",
    longitude: "",
    contactPerson: "",
    county: "",
  });
  const { position,address, status : addressStatus, } = useSelector((state) => state.incident);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Add reference for file inp

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

  const handleGeolocation = (e) => {
    e.preventDefault();
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
      dispatch(fetchAddress());
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
          const publicUrl = `https://rtwmflquinnbaeqbfkpz.supabase.co/storage/v1/object/public/incidentImages/${data.path}`;
          uploadedFiles.push(publicUrl);
        }
      }

      const { data, error } = await supabase.from("incidentDetails").insert([
        {
          type: formData.type,
          location: formData.location,
          time: formData.time,
          summary: formData.summary,
          mediaFiles: uploadedFiles,
          latitude: formData.latitude,
          longitude: formData.longitude,
          created_at: new Date(),
          contactPerson: formData.contactPerson,
          county: formData.county,
        },
      ]);

      if (error) throw new Error(error.message);

      if (data && data.length > 0) {
        dispatch(addIncident(data[0]));
      }
      setSuccessMessage("Incident report submitted successfully!");
      console.log("Incident report submitted successfully!");

      // Reset form data
      setFormData({
        type: "",
        location: "",
        time: "",
        summary: "",
        mediaFiles: [],
        latitude: "",
        longitude: "",
        contactPerson: "",
        county: "",
      });

      // Clear file input field
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Clear the success message after a delay
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting incident:", error.message);
      alert(`Failed to submit the incident. Error: ${error.message}`);
    }
  };

  return (
    <>
      <header className="text-center p-4">
        <h1 className="text-3xl font-bold text-blue-600">RipotiChapChap</h1>
      </header>
      

      <div className="max-w-5xl mx-auto p-4 rounded-lg shadow-lg">
        {/* Success Message */}
        {successMessage && (
          <p className="mt-4 p-3 text-green-600 bg-green-100 border border-green-200 rounded-lg">
            {successMessage}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
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

          <select
            name="county"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.county}
            onChange={handleInputChange}
          >
            <option value="">Select County</option>
            {Object.entries(counties).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
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
            type="text"
            name="contactPerson"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Phonenumber..."
            value={formData.contactPerson}
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
            ref={fileInputRef} // Assign ref to the file input
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
            <>
            <p className="lg:col-span-3">
              <strong>Geolocation:</strong> Latitude {formData.latitude},
              Longitude {formData.longitude}
            </p>
            
            </>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg lg:col-span-3"
          >
            Submit Report
          </button>
        </form>
      </div>

      <footer className="text-center mt-8 p-4 text-gray-500">
        © {new Date().getFullYear()} RipotiChapChap. All rights reserved.
      </footer>
    </>
  );
}

export default IncidentReportForm;

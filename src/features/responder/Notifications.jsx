import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import supabase from '../../service/supabase'
import { setIncidents } from "../report/incidentSlice";

function Notifications() {
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incident.incidents); // Select all incidents
 

  useEffect(() => {
    const fetchIncidents = async () => {
      const { data, error } = await supabase
        .from('incidentDetails') // Replace with your table name in Supabase
        .select('*'); // Fetch all columns or specify the ones you need

      if (error) {
        console.error('Error fetching incidents:', error);
      } else {
        // Dispatch the fetched incidents to Redux
        dispatch(setIncidents(data));
      }
    };

    fetchIncidents(); // Call the fetch function
  }, [dispatch]);
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      
      {incidents.length === 0 ? (
        <p className="text-center text-gray-600">No incidents reported yet.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Time</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {incidents.map((incident, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{incident.created_at}</td>
                <td className="py-3 px-6 text-left">{incident.type}</td>
                <td className="py-3 px-6 text-left">{incident.time}</td>
                <td className="py-3 px-6 text-left">{incident.location}</td>
                <td className="py-3 px-6 text-center">
                  <Link
                    to={`/dashboard/incident/${incident.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Show Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Notifications;

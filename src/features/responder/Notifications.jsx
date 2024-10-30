import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../service/supabase";
import {
  setIncidents,
  addIncident,
  selectIncidentCount,
} from "../report/incidentSlice";

function Notifications() {
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incident.incidents);
  const incidentCount = useSelector(selectIncidentCount);
  const viewedIncidents = useSelector(selectViewedIncidents);

  useEffect(() => {
    const fetchIncidents = async () => {
      const { data, error } = await supabase
        .from("incidentDetails")
        .select("*")
        .order("created_at", { ascending: false })
        .order("time", { ascending: false });

      if (error) {
        console.error("Error fetching incidents:", error);
      } else {
        dispatch(setIncidents(data));
      }
    };

    fetchIncidents();

    const subscription = supabase
      .channel("incident-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "incidentDetails" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            console.log("New incident received:", payload.new);
            dispatch(addIncident(payload.new));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [dispatch]);

  const handleViewed = (id) => {
    dispatch(markIncidentAsViewed(id));
  };

  return (
    <>
      <p className="p-3 text-base">Total incidents: {incidentCount}</p>
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        {incidents.length === 0 ? (
          <p className="text-center text-gray-600">
            No incidents reported yet.
          </p>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal sticky top-0">
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {incidents.map((incident) => (
                <tr
                  key={incident.id}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${
                    viewedIncidents[incident.id] ? "bg-white" : "bg-gray-300"
                  }`}
                >
                  <td className="py-3 px-6 text-left">{incident.created_at}</td>
                  <td className="py-3 px-6 text-left">{incident.type}</td>
                  <td className="py-3 px-6 text-left">{incident.time}</td>
                  <td className="py-3 px-6 text-left">{incident.location}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/dashboard/incident/${incident.id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleViewed(incident.id)}
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
    </>
  );
}

export default Notifications;

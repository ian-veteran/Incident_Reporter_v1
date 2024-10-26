import supabase from "./supabase";

export async function getIncidents() {
  const { data, error } = await supabase
    .from("incidentDetails")
    .select("created_at, type, time, location");

  if (error) {
    throw new Error("Incidents cannot be fetched: " + error.message); // Include the error message for more context
  }

  return data;
}

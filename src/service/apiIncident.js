import supabase from "./supabase";

// Rename the function to avoid conflict with the action
export async function fetchIncidents() {
  const { data, error } = await supabase
    .from("incidentDetails") // Replace with your table name in Supabase
    .select("*"); // Fetch all columns or specify the ones you need

  if (error) {
    console.error(error);
    throw new Error("Incidents cannot be fetched....");
  }

  return data;
}

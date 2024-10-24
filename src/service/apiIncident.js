import supabase from "./supabase";

export async function getIncidents() {
  const { data, error } = await supabase
        .from('incidentDetails') // Replace with your table name in Supabase
        .select('*'); // Fetch all columns or specify the ones you need

  if (error) {
    console.error(error);
    throw new Error("Incidents cannot be fetched....");
  }

  return data;
}
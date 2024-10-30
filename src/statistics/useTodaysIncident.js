import { useSelector } from "react-redux";

export function useTodaysIncident() {
  const incidents = useSelector((state) => state.incident.incidents);
  const isLoading = useSelector((state) => state.incident.status === "loading");

  return { incidents, isLoading };
}

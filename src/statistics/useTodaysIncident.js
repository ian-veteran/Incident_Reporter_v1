import { useQuery } from "@tanstack/react-query";

export function useTodaysIncident() {
  const { isLoading, data: incident } = useQuery({
    queryFn: getTodaysIncident, ///from api of incidentsto be created or alert API to be created
    queryKey: ["today-incident"],
  });
  return { incident, isLoading };
}

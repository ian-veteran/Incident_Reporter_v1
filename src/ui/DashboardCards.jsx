import { useEffect, useMemo } from "react"; // Added useEffect here
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIncidents,
  selectIncidents,
  selectLoading,
  selectError,
} from "../slice/incidentSlice";
import FetchToDash from "../ui/FetchToDash";

function DashboardCards() {
  const dispatch = useDispatch();
  const incidents = useSelector(selectIncidents);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchIncidents());
    };

    fetchData(); // Fetch data on mount
    const intervalId = setInterval(fetchData, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId); // Cleanup
  }, [dispatch]);

  // Use useMemo to optimize grouping of incidents
  const groupedIncidents = useMemo(() => {
    return incidents.reduce((acc, { location }) => {
      const normalizedLocation = location.toLowerCase();
      acc[normalizedLocation] = acc[normalizedLocation] || {
        title: location,
        count: 0,
      };
      acc[normalizedLocation].count += 1;
      return acc;
    }, {});
  }, [incidents]);

  const cardsData = useMemo(
    () =>
      Object.values(groupedIncidents).map(({ title, count }) => ({
        title,
        count,
      })),
    [groupedIncidents]
  );

  // Conditional rendering after memoization
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <FetchToDash locations={cardsData} />
    </div>
  );
}

export default DashboardCards;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IncidentReportForm from "./features/report/IncidentReportForm";
import Notifications from "./features/responder/Notifications";
import store from "./store";
import { Provider } from "react-redux";
import Dashboard from "./ui/Dashboard";
import IncidentDetails from "./features/responder/IncidentDetails";
import DashboardCards from "./ui/DashboardCards";
import LandingPage from "./ui/LandingPage";
import Stats from "./statistics/Stats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/incident_form",
    element: <IncidentReportForm />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "home",
        element: <DashboardCards />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "incident/:id",
        element: <IncidentDetails />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

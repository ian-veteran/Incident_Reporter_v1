import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IncidentReportForm from "./features/report/IncidentReportForm";
import Notifications from "./features/responder/Notifications";
import store from "./store";
import { Provider } from "react-redux";
import Dashboard from "./ui/Dashboard";
import IncidentDetails from "./features/responder/IncidentDetails";
import DashboardCards from "./ui/DashboardCards";
import LandingPage from "./ui/LandingPage";
import Stats from "./statistics/Stats";
import ProtectedRoute from "./ui/ProtectedRoute";
import Login from "./authentication/Login";

const queryClient = new QueryClient();
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        {" "}
        <Dashboard />{" "}
      </ProtectedRoute>
    ),
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

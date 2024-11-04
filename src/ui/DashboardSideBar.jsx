import {
  HiOutlineBell,
  HiOutlineChartBar,
  HiOutlineHome,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector for accessing Redux state
import { selectUnreadCount } from "../features/report/incidentSlice"; // Adjust the path to your slice
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../authentication/Logout";

function DashboardSideBar() {
  const unreadCount = useSelector(selectUnreadCount); // Get unread count from Redux

  return (
    <>
      <aside className="w-64 bg-red-500 p-6 sticky top-0 h-screen">
        <div className="text-2xl font-bold mb-8">
          <span className="text-gray-100">RipotiChap </span> Chap
        </div>
        <nav className="space-y-4">
          <Link
            className="flex items-center text-white font-semibold hover:text-slate-950 transition-colors"
            to="/dashboard/home"
          >
            <HiOutlineHome className="mr-2 text-xl" />
            Home
          </Link>
          <Link
            className="flex items-center text-white font-semibold hover:text-slate-950 transition-colors relative"
            to="/dashboard/notifications"
          >
            <HiOutlineBell className="mr-2 text-xl" />
            Notifications
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 mt-2 ml-8 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link
            className="flex items-center text-white font-semibold hover:text-slate-950 transition-colors"
            to="/dashboard/stats"
          >
            <HiOutlineChartBar className="mr-2 text-xl" />
            Statistics
          </Link>

          <Link
            className="flex items-center text-white font-semibold hover:text-slate-950 transition-colors"
            to="/dashboard/signupform"
          >
            <HiOutlineUser className="mr-2 text-xl" />
            Add Users
          </Link>
        </nav>
        <div className="margin-auto-top">
          <Logout />
        </div>
      </aside>
    </>
  );
}

export default DashboardSideBar;

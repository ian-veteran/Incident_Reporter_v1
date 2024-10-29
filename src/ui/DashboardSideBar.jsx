import {
  HiOutlineBell,
  HiOutlineChartBar,
  HiOutlineHome,
} from "react-icons/hi";
import { Link } from "react-router-dom";

function DashboardSideBar() {
  return (
    <>
      <aside className="w-64 bg-blue-400 p-6 sticky top-0 h-screen ">
        <div className="text-2xl font-bold mb-8">
          <span className="text-gray-100">RipotiChap </span> Chap
        </div>
        <nav className="space-y-4">
          <Link
            className="flex items-center text-white font-semibold hover:text-slate-950 transition-colors"
            to="/dashboard/home"
          >
            {" "}
            <HiOutlineHome className="mr-2 text-xl" />
            Home
          </Link>
          <Link
            className="flex items-center text-white font-semibold hover:text-slate-950 transition-colors"
            to="/dashboard/notifications"
          >
            {" "}
            <HiOutlineBell className="mr-2 text-xl" />
            Notifications
          </Link>
          <Link
            className="flex items-center text-white font-semibold hover:text-slate-950 transition-colors"
            to="/dashboard/stats"
          >
            {" "}
            <HiOutlineChartBar className="mr-2 text-xl" />
            Statistics
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSideBar;

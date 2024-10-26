import { Link } from "react-router-dom";

function DashboardSideBar() {
  return (
    <>
      <aside className="w-64 bg-blue-400 p-6 ">
        <div className="text-2xl font-bold mb-8">
          <span className="text-red-600">RipotiChap </span> Chap
        </div>
        <nav className="space-y-4">
          <Link className="block text-black font-semibold" to="/dashboard/home">
            Home
          </Link>
          <Link className="block text-black" to="/dashboard/notifications">
            Notifications
          </Link>
          <Link className="block text-black">Statistics</Link>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSideBar;

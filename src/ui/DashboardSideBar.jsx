import { Link } from "react-router-dom";

function DashboardSideBar() {
  return (
    <>
      <aside className="w-64 bg-blue-500 p-6">
        <div className="text-2xl font-bold mb-8">RipotiChapChap</div>
        <nav className="space-y-4">
          <Link className="block text-white font-semibold" to="/dashboard/home">
            Home
          </Link>
          <Link className="block text-white" to="/dashboard/notifications">
            Notifications
          </Link>
          <Link className="block text-white">
            Statistics
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default DashboardSideBar;

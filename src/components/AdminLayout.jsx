import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
  Users,
  BarChart3,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Wrench,
  Calculator,
} from "lucide-react";
import CalculatorModal from "./CalculatorModal";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const sidebarItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    {
      path: "/admin/offline-orders",
      icon: PlusCircle,
      label: "Offline Orders",
    },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/sales", icon: BarChart3, label: "Sales & Reports" },
    { path: "/admin/blog", icon: FileText, label: "Blog Management" },
    { path: "/admin/reviews", icon: MessageSquare, label: "Reviews" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Wrench className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
              <p className="text-sm text-gray-600">RB Hardware</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6">
          {sidebarItems.map(({ path, icon: Icon, label, exact }) => {
            const isActive = exact
              ? location.pathname === path
              : location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                    : ""
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t">
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="w-full flex items-center px-4 py-2 mb-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Calculator className="h-5 w-5 mr-3" />
            Calculator
          </button>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {sidebarItems.find((item) =>
                item.exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path)
              )?.label || "Admin"}
            </h2>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      {/* Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
};

export default AdminLayout;

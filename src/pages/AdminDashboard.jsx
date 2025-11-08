import { useState, useEffect } from "react";
import {
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { FaRupeeSign } from "react-icons/fa6";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    todayOrders: 0,
    thisMonthRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/orders/recent"),
        api.get("/products/low-stock"),
      ]);

      setStats(statsRes.data);
      setRecentOrders(ordersRes.data);
      setLowStockProducts(productsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: `Rs.${stats.totalRevenue.toLocaleString()}`,
      icon: FaRupeeSign,
      color: "bg-yellow-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Here's what's happening at RB Hardware today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Today's Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Today's Orders</span>
              <span className="font-semibold text-gray-800">
                {stats.todayOrders}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">This Month Revenue</span>
              <span className="font-semibold text-gray-800">
                Rs.{stats.thisMonthRevenue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="btn-primary text-sm py-2"
              onClick={() => navigate("/admin/products")}
            >
              Add Product
            </button>

            <button
              className="btn-secondary text-sm py-2"
              onClick={() => navigate("/admin/offline-orders")}
            >
              New Order
            </button>

            <button
              className="btn-primary text-sm py-2"
              onClick={() => navigate("/admin/sales")}
            >
              View Reports
            </button>

            <button
              className="btn-secondary text-sm py-2"
              onClick={() => navigate("/admin/products")}
            >
              Manage Stock
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h3>
          </div>
          <div className="p-6">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.slice(0, 5).map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        #{order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        Rs.{order.total}
                      </p>
                      <p className="text-sm text-gray-600">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Low Stock Alert
            </h3>
          </div>
          <div className="p-6">
            {lowStockProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                All products are well stocked
              </p>
            ) : (
              <div className="space-y-4">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">
                        {product.stock} left
                      </p>
                      <p className="text-sm text-gray-600">
                        Min: {product.minStock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

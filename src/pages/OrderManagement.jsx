import { useState, useEffect } from "react";
import { Search, Filter, Eye, Printer } from "lucide-react";
import api from "../utils/api";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const statuses = ["all", "pending", "processing", "completed", "cancelled"];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerPhone.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const generateBill = (order) => {
    const billContent = `
      <div class="print-area">
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
            <h1 style="color: #2563eb; margin-bottom: 5px;">RB Hardware And Sanitary House</h1>
            <p style="color: #666; margin: 0;">Pokhara-32, Sathmuhana, Sajabajar</p>
            <p style="color: #666; margin: 0;">Phone:9802805613</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Invoice #${
              order.orderNumber
            }</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
              <div>
                <h3 style="color: #333; margin-bottom: 10px;">Customer Details:</h3>
                <p><strong>Name:</strong> ${order.customerName}</p>
                <p><strong>Phone:</strong> ${order.customerPhone}</p>
              </div>
              <div>
                <h3 style="color: #333; margin-bottom: 10px;">Order Details:</h3>
                <p><strong>Date:</strong> ${new Date(
                  order.createdAt
                ).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
                <p><strong>Payment:</strong> ${order.paymentMethod}</p>
              </div>
            </div>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Item</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">Qty</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Price</th>
                <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td style="border: 1px solid #dee2e6; padding: 12px;">${
                    item.productName
                  }</td>
                  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">${
                    item.quantity
                  }</td>
                  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$${item.price.toFixed(
                    2
                  )}</td>
                  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">$${(
                    item.quantity * item.price
                  ).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr style="background-color: #f8f9fa; font-weight: bold;">
                <td colspan="3" style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Total Amount:</td>
                <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right; color: #2563eb;">$${order.total.toFixed(
                  2
                )}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666;">
            <p>Thank you for your business!</p>
            <p style="font-size: 12px;">For any queries, please contact us at info.rbhardware73@gmail.com</p>
          </div>
        </div>
      </div>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(billContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600">View and manage all customer orders</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by number, customer name, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Status"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.customerPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-primary-500 ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => generateBill(order)}
                        className="text-green-600 hover:text-green-800"
                        title="Print Bill"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Order Details - {selectedOrder.orderNumber}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-600 hover:text-gray-800 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p>
                      <strong>Name:</strong> {selectedOrder.customerName}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedOrder.customerPhone}
                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Payment Method:</strong>{" "}
                      {selectedOrder.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Order Items
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                            Product
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                            Qty
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                            Price
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {item.productName}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-center">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">
                              ${(item.quantity * item.price).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td
                            colSpan={3}
                            className="px-4 py-3 text-sm font-medium text-gray-900 text-right"
                          >
                            Total Amount:
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                            ${selectedOrder.total.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    onClick={() => generateBill(selectedOrder)}
                    className="btn-primary inline-flex items-center"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Bill
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

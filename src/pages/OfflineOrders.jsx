import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  Calculator,
  User,
  Phone,
  CreditCard,
  Package,
} from "lucide-react";
import api from "../utils/api";

const OfflineOrders = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    paymentMethod: "cash",
  });
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products");
      setProducts(response.data.filter((p) => p.stock > 0));
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.productId === product._id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.productId === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        alert(`Only ${product.stock} units available in stock`);
      }
    } else {
      setCart([
        ...cart,
        {
          productId: product._id,
          productName: product.name,
          price: product.price,
          quantity: 1,
          maxStock: product.stock,
        },
      ]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const cartItem = cart.find((item) => item.productId === productId);

    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else if (cartItem && newQuantity <= cartItem.maxStock) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } else {
      alert(`Only ${cartItem?.maxStock || 0} units available in stock`);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Please add items to cart");
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert("Please enter customer name and phone number");
      return;
    }

    setSubmitLoading(true);

    try {
      const orderData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        items: cart.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
        })),
        total: getTotalAmount(),
        paymentMethod: customerInfo.paymentMethod,
        status: "completed",
      };

      const response = await api.post("/orders/offline", orderData);

      // Reset form
      setCart([]);
      setCustomerInfo({
        name: "",
        phone: "",
        email: "",
        paymentMethod: "cash",
      });
      setSearchTerm("");

      // Refresh products to update stock
      fetchProducts();

      alert(`Order #${response.data.orderNumber} created successfully!`);
    } catch (error) {
      console.error("Error creating order:", error);
      alert(error.response?.data?.message || "Failed to create order");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Offline Orders</h1>
          <p className="text-gray-600">Create orders for in-store customers</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ShoppingCart className="h-4 w-4" />
          <span>{cart.length} items in cart</span>
          {cart.length > 0 && (
            <>
              <span>•</span>
              <span className="font-medium text-primary-600">
                ₹{getTotalAmount().toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Available Products
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No products found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-600">
                            Stock: {product.stock}
                          </p>
                          {product.sku && (
                            <p className="text-sm text-gray-500">
                              SKU: {product.sku}
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-medium text-primary-600">
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="btn-primary text-sm py-2 px-3 inline-flex items-center"
                        disabled={product.stock === 0}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Current Order ({cart.length} items)
            </h2>
          </div>

          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Customer Information
              </h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Customer Name *"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Customer Phone *"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Customer Email (Optional)"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <select
                    name="paymentMethod"
                    value={customerInfo.paymentMethod}
                    onChange={handleCustomerInfoChange}
                    className="input-field"
                  >
                    <option value="cash">Cash Payment</option>
                    <option value="upi">eSewa Payment</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="card">Card Payment</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">
                Order Items
              </h3>
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No items in cart</p>
                  <p className="text-sm">
                    Search and add products to create an order
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {item.productName}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price.toFixed(2)} each
                        </p>
                        <p className="text-sm text-primary-600 font-medium">
                          Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-600 hover:text-red-800 ml-2 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            {cart.length > 0 && (
              <div className="border-t pt-4">
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      Total Amount:
                    </span>
                    <span className="text-primary-600 text-xl">
                      ₹{getTotalAmount().toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Payment Method:{" "}
                    {customerInfo.paymentMethod.replace("_", " ").toUpperCase()}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                submitLoading ||
                cart.length === 0 ||
                !customerInfo.name ||
                !customerInfo.phone
              }
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Order...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Create Order
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfflineOrders;

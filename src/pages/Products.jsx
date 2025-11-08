import { useState, useEffect } from "react";
import { Filter, Star, ShoppingCart, Eye, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import api from "../utils/api";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "all",
    "Power Tools",
    "Hand Tools",
    "Plumbing",
    "Electrical",
    "Hardware",
    "Safety",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Update search term from URL params
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl && searchFromUrl !== searchTerm) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    // Update URL params instantly
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-primary-100">
            Quality tools and hardware for every project - Professional grade
            equipment you can trust
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Search products..."
                value={searchTerm} // ✅ controlled input
                onChange={(e) => handleSearch(e.target.value)} // ✅ live search
                showResults={false}
                size="large"
                className="w-full"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white min-w-48"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No products found
              {searchTerm ? ` for "${searchTerm}"` : " matching your criteria"}.
            </p>
            <p className="text-gray-500">
              Try adjusting your search or filter options.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 group"
              >
                {/* Product Card */}
                <div className="aspect-square overflow-hidden bg-gray-100 rounded-t-lg relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1">
                      {product.name}
                    </h3>
                    <div className="flex text-yellow-400 ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 btn-primary text-sm py-2 px-3 inline-flex items-center justify-center"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </button>
                    <a
                      href="tel:+919876543210"
                      className="btn-secondary text-sm py-2 px-3 inline-flex items-center justify-center"
                      title="Call to Order"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
              {/* Modal Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedProduct.name}
                  </h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {selectedProduct.category}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {selectedProduct.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProduct.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedProduct.inStock ? "Available" : "Out of Stock"}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {selectedProduct.stock}
                      </span>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                      <span className="ml-2 text-gray-600 text-sm">
                        (4.8/5 - 124 reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Product Features
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      Professional grade quality
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      Durable construction
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      Warranty included
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      Expert support available
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                  <a
                    href="tel:+919876543210"
                    className="btn-primary inline-flex items-center"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call to Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

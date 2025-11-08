import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const SearchBar = ({
  placeholder = "Search products...",
  onSearch,
  className = "",
  showResults = true,
  size = "default", // "default", "large", "small"
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  const sizeClasses = {
    small: "h-10 text-sm",
    default: "h-12 text-base",
    large: "h-14 text-lg",
  };

  const iconSizes = {
    small: "h-4 w-4",
    default: "h-5 w-5",
    large: "h-6 w-6",
  };

  // Live search as user types
  const handleSearchChange = async (query) => {
    setSearchQuery(query);

    // Trigger parent callback immediately for live filtering
    if (onSearch) {
      onSearch(query);
    }

    if (query.length > 2 && showResults) {
      setIsSearching(true);
      try {
        const response = await api.get("/products");
        const filtered = response.data
          .filter(
            (product) =>
              product.name.toLowerCase().includes(query.toLowerCase()) ||
              product.description.toLowerCase().includes(query.toLowerCase()) ||
              product.category.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);

        setSearchResults(filtered);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
    setIsActive(false);

    if (onSearch) {
      onSearch(""); // Reset parent filter
    }

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleResultSelect = (product) => {
    setSearchQuery(product.name);
    setShowSearchResults(false);
    navigate("/products");
    window.scrollTo(0, 0);
  };

  const handleFocus = () => {
    setIsActive(true);
    if (searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSearchResults(false);
      setIsActive(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className={`relative w-full max-w-2xl ${className}`}
    >
      {/* Search Input Container */}
      <div
        className={`
        relative flex items-center
        ${sizeClasses[size]}
        bg-white border-2 rounded-xl
        transition-all duration-200 ease-in-out
        ${
          isActive
            ? "border-primary-500 shadow-lg ring-4 ring-primary-100"
            : "border-gray-200 hover:border-gray-300 shadow-sm"
        }
        ${showSearchResults ? "rounded-b-none" : ""}
      `}
      >
        {/* Search Icon */}
        <div className="flex items-center justify-center pl-4 pr-2">
          <Search
            className={`${
              iconSizes[size]
            } text-gray-400 transition-colors duration-200 ${
              isActive ? "text-primary-500" : ""
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Search Input */}
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`
            flex-1 px-2 py-0 bg-transparent border-0 outline-none
            ${sizeClasses[size]} text-gray-900 placeholder-gray-500
            focus:ring-0 focus:border-0
          `}
          aria-label="Search products"
          aria-expanded={showSearchResults}
          aria-haspopup="listbox"
          role="combobox"
          autoComplete="off"
        />

        {/* Loading Spinner */}
        {isSearching && (
          <div className="flex items-center justify-center px-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
          </div>
        )}

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={clearSearch}
            className={`
              flex items-center justify-center mr-2
              w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 
              text-gray-500 hover:text-gray-700
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
              active:scale-95
            `}
            aria-label="Clear search"
            title="Clear search"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border-2 border-t-0 border-gray-200 rounded-b-xl shadow-lg max-h-80 overflow-y-auto">
          <div className="py-2">
            <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
              Search Results
            </div>
            {searchResults.map((product) => (
              <button
                key={product._id}
                onClick={() => handleResultSelect(product)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                role="option"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                      <span className="text-sm font-medium text-primary-600">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showSearchResults &&
        searchQuery.length > 2 &&
        searchResults.length === 0 &&
        !isSearching && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white border-2 border-t-0 border-gray-200 rounded-b-xl shadow-lg">
            <div className="px-4 py-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No products found</p>
              <p className="text-sm">Try searching with different keywords</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchBar;

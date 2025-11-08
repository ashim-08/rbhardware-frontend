import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const MobileSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      setIsSearching(true);
      try {
        const response = await api.get('/products');
        const filtered = response.data.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);
        
        setSearchResults(filtered);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Execute search
  const executeSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        query.trim(),
        ...recentSearches.filter(s => s !== query.trim())
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      
      // Navigate to products page
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  // Handle result selection
  const handleResultSelect = (product) => {
    executeSearch(product.name);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 bg-white">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Close search"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        
        <div className="flex-1 mx-4 relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="w-full pl-10 pr-12 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
              autoComplete="off"
            />
            
            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Loading */}
        {isSearching && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !isSearching && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Search Results
            </h3>
            <div className="space-y-3">
              {searchResults.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleResultSelect(product)}
                  className="w-full p-3 text-left bg-white rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-all active:scale-98"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
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

        {/* No Results */}
        {searchQuery.length > 2 && searchResults.length === 0 && !isSearching && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Search className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 text-center">
              Try searching with different keywords or check your spelling
            </p>
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Recent Searches
              </h3>
              <button
                onClick={clearRecentSearches}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => executeSearch(search)}
                  className="w-full p-3 text-left bg-white rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-all active:scale-98"
                >
                  <div className="flex items-center space-x-3">
                    <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-900">{search}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && recentSearches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Search className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Search Products</h3>
            <p className="text-gray-500 text-center">
              Find the perfect tools and hardware for your projects
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearchModal;
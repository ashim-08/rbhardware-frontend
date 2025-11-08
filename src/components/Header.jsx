import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Menu, X, Wrench, Mail, User, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Scroll to top when navigating
  useEffect(() => {
    const handleNavigation = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 transition-colors duration-300">
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={handleLinkClick}
          >
            <img
              src="/logo.png"
              alt="RB Hardware Logo"
              className="h-10 w-10"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
          </Link>

          {/* Right - Search + Phone */}
          <div className="flex items-center space-x-3">
            {/* <SearchBar
              placeholder="Search..."
              size="small"
              className="w-32 focus-within:w-48 transition-all duration-300"
              showResults={false}
            /> */}
            <a
              href="tel:+9779846223416"
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Phone className="h-5 w-5" />
            </a>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 p-2 rounded-md hover:bg-gray-100 transition"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* `Desk`top Header */}
      <div className="hidden md:block bg-white">
        <div className="mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3"
              onClick={handleLinkClick}
            >
              <img
                src="/logo.png"
                alt="RB Hardware Logo"
                className="h-20 w-20 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              {["Home", "About", "Products", "Blog", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${
                    item.toLowerCase() === "home" ? "" : item.toLowerCase()
                  }`}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  onClick={handleLinkClick}
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-5">
              {/* Search Bar */}
              {/* <SearchBar placeholder="Search products..." /> */}

              {/* Icons only */}
              <div className="flex items-center space-x-4">
                <a
                  href="tel:+9779846223416"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                  title="Call Us"
                >
                  <Phone className="h-5 w-5" />
                </a>
                <a
                  href="info.rbhardware73@gmail.com"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                  title="Email Us"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>

              {/* User Section */}
              <div className="flex items-center">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium hidden xl:block">
                        {user?.name}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="ml-2 text-gray-600 hover:text-red-600 transition-colors"
                      title="Logout"
                    >
                      <LogIn className="h-5 w-5 rotate-180" />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="px-4 py-3 space-y-2">
            {["Home", "About", "Products", "Blog", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${
                  item.toLowerCase() === "home" ? "" : item.toLowerCase()
                }`}
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium border-b border-gray-100 last:border-none"
                onClick={handleLinkClick}
              >
                {item}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 text-gray-700 hover:text-primary-600 font-medium border-b border-gray-100"
                  onClick={handleLinkClick}
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-primary-600 hover:text-primary-800 font-medium"
                onClick={handleLinkClick}
              >
                Login / Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

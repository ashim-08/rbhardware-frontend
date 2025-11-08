import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Wrench className="h-8 w-8 text-primary-400" />
              <div>
                <h3 className="text-xl font-bold text-white">RB Hardware</h3>
                <p className="text-sm text-gray-400">& Sanitary House</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for quality construction materials, plumbing
              supplies, and expert service since 2073 B.S. (2016 A.D.). Building
              trust, one project at a time.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Products</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Construction Materials
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Plumbing Supplies
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Power Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Hand Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Safety Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Address:</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Pokhara-32, Sathmuhana
                    <br />
                    Kaski, Gandaki Province
                    <br />
                    Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Phone:</p>
                  <div className="space-y-1">
                    <a
                      href="tel:+9779846223416"
                      className="text-gray-300 hover:text-white transition-colors font-medium block"
                    >
                      +977 9846223416
                    </a>
                    <a
                      href="tel:+9779802805613"
                      className="text-gray-300 hover:text-white transition-colors font-medium block"
                    >
                      +977 9802805613
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Email:</p>
                  <a
                    href="mailto:info@rbhardware73.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    info.rbhardware73@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Store Hours:</p>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>Sun-Fri: 6:00 AM - 7:00 PM</p>
                    <p>Saturday: 7:30 AM - 6:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} RB Hardware And Sanitary House. All rights
                reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Owned by Ramraj Adhikari & Sarala Adhikari | Managed by Ashim
                Adhikari
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

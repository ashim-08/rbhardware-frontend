import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Package, Newspaper, Phone, User, LogIn, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MobileSearchModal from './MobileSearchModal';

const MobileNavigation = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '#search', icon: Search, label: 'Search', onClick: () => setShowSearchModal(true) },
    { path: '/about', icon: Info, label: 'About' },
    { path: '/products', icon: Package, label: 'Products' },
  ];

  // Add login/profile item based on authentication status
  if (isAuthenticated) {
    navItems.push({ path: '/profile', icon: User, label: 'Profile' });
  } else {
    navItems.push({ path: '/login', icon: LogIn, label: 'Login' });
  }

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ path, icon: Icon, label, onClick }) => {
            const isActive = location.pathname === path;
            
            if (onClick) {
              return (
                <button
                  key={path}
                  onClick={onClick}
                  className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors ${
                    path === '#search'
                      ? 'text-gray-600 hover:text-primary-600'
                      : isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1 font-medium">{label}</span>
                </button>
              );
            }
            
            return (
              <Link
                key={path}
                to={path}
                onClick={handleLinkClick}
                className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      
      <MobileSearchModal 
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </>
  );
};

export default MobileNavigation;
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
// src/components/Layout/layout.tsx
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, Menu, X, MessageSquare } from 'lucide-react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Desktop Navbar */}
      <nav className="hidden md:flex justify-between items-center px-8 py-4 bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 rounded-b-xl max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-md">
            <MessageSquare className="w-6 h-6 text-white animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">{title || 'KSA Maintenance'}</h1>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-amber-600 transition">Home</Link>
          <a href="#services" className="text-gray-700 hover:text-amber-600 transition">Services</a>
          <a href="#about" className="text-gray-700 hover:text-amber-600 transition">About</a>
          <Link
            to="/login"
            className="text-white bg-amber-400 px-5 py-2 rounded-lg hover:bg-orange-400 transition shadow-md hover:shadow-xl"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-gray-800">{title || 'KSA'}</h1>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>
          <button onClick={() => setMobileOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col mt-4 space-y-3 px-4">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="text-gray-700 hover:text-orange-500 transition"
          >
            Home
          </Link>
          <Link
            to="/settings"
            onClick={() => setMobileOpen(false)}
            className="text-gray-700 hover:text-orange-500 transition"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;

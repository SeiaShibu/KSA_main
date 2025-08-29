// src/components/Layout/DashboardLayout.tsx
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, Menu, X, MessageSquare } from 'lucide-react';

type DashboardLayoutProps = {
  children: ReactNode;
  title?: string;
};

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg">
        <div className="p-6 font-bold text-2xl text-orange-500 flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-md">
            <MessageSquare className="w-5 h-5 text-white animate-bounce" />
          </div>
          <span>{title || 'KSA Maintenance'}</span>
        </div>
        <nav className="flex flex-col mt-4 space-y-2">
          <Link
            to="/"
            className="px-4 py-2 rounded hover:bg-orange-100 flex items-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/settings"
            className="px-4 py-2 rounded hover:bg-orange-100 flex items-center space-x-2"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

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
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      
      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'tween' }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 md:static md:flex md:flex-col md:translate-x-0"
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Mobile hamburger */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-gray-200 rounded-md"
          >
            <span className="text-xl font-bold">☰</span>
          </button>
        </div>

        {/* Title */}
        {title && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
          </div>
        )}

        {/* Page content */}
        {children}
      </main>
    </div>
  );
};

export default Layout;

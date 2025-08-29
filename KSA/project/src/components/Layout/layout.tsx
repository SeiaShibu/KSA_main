// src/components/Layout/Layout.tsx
import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 ${
        showSidebar ? 'flex flex-col md:flex-row' : 'flex flex-col items-center'
      }`}
    >
      {/* Mobile overlay */}
      {sidebarOpen && showSidebar && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: sidebarOpen ? 0 : '-100%' }}
          transition={{ type: 'tween' }}
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 md:static md:flex md:flex-col md:translate-x-0"
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </motion.aside>
      )}

      {/* Main content */}
      <main className={`flex-1 p-4 md:p-8 ${!showSidebar ? 'mx-auto max-w-4xl w-full' : ''}`}>
        {/* Mobile Hamburger */}
        {showSidebar && (
          <div className="md:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-gray-200 rounded-md"
            >
              ☰
            </button>
          </div>
        )}

        {/* Optional Title */}
        {title && (
          <div className={`mb-6 ${!showSidebar ? 'text-center' : ''}`}>
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          </div>
        )}

        {children}
      </main>
    </div>
  );
};

export default Layout;

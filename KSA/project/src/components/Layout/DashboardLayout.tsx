// src/components/Layout/DashboardLayout.tsx
import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Mobile Overlay */}
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
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 md:static md:translate-x-0 md:flex md:flex-col"
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Mobile Hamburger */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-gray-200 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Page Title */}
        {title && (
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto"></div>
          </div>
        )}

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

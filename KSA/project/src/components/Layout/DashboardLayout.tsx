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
      
      {/* Mobile Hamburger */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-gray-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 md:static md:translate-x-0 md:flex md:flex-col"
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </motion.aside>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;

// src/components/Layout/DashboardLayout.tsx
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  showSidebar?: boolean; // allow hiding sidebar (e.g., home page)
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  showSidebar = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 ${
        showSidebar ? 'flex flex-col md:flex-row' : 'flex flex-col items-center'
      }`}
    >
      {/* Mobile Hamburger */}
      {showSidebar && (
        <div className="md:hidden w-full p-4 flex justify-start">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-gray-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: sidebarOpen ? 0 : '-100%' }}
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 md:static md:flex md:flex-col md:translate-x-0"
        >
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </motion.aside>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && showSidebar && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-4 md:p-8 ${
          !showSidebar ? 'mx-auto max-w-4xl w-full' : ''
        }`}
      >
        {title && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 ${!showSidebar ? 'text-center' : ''}`}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto"></div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;

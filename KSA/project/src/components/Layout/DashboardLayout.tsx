import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col md:flex-row">
      {/* Sidebar: hidden on mobile */}
      <aside className="hidden md:block w-64 min-h-screen bg-white shadow-md">
        <Sidebar />
      </aside>

      {/* Main content */}
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

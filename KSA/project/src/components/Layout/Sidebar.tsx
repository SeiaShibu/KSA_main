// src/components/Layout/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, Info } from 'lucide-react';

// Define SidebarProps here directly
export interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  return (
    <div className="flex flex-col h-full bg-white shadow-md p-6 w-64">
      <h2 className="text-xl font-bold mb-8">KSA Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          onClick={closeSidebar}
          className="flex items-center space-x-2 hover:text-amber-600 transition"
        >
          <Home className="w-5 h-5" /> <span>Home</span>
        </Link>
        <Link
          to="#services"
          onClick={closeSidebar}
          className="flex items-center space-x-2 hover:text-amber-600 transition"
        >
          <Settings className="w-5 h-5" /> <span>Services</span>
        </Link>
        <Link
          to="#about"
          onClick={closeSidebar}
          className="flex items-center space-x-2 hover:text-amber-600 transition"
        >
          <Info className="w-5 h-5" /> <span>About</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

// src/components/Layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Users, LogOut, BarChart3, UserCog, Plus } from 'lucide-react';

export interface SidebarProps {
  open?: boolean; // for mobile sidebar
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  // Dummy user info; replace with auth context if needed
  const user = { role: 'customer', name: 'John Doe', email: 'john@example.com' };

  const handleClose = () => {
    if (setOpen) setOpen(false);
  };

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    ...(user.role === 'customer'
      ? [
          { icon: Plus, label: 'New Complaint', path: '/customer/new-complaint' },
          { icon: FileText, label: 'My Complaints', path: '/customer/complaints' },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-amber-200/50">
        <h2 className="text-lg font-bold text-gray-800">ComplaintDesk</h2>
        <p className="text-sm text-gray-600">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
        <span className="inline-block mt-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-medium rounded-full capitalize">
          {user.role}
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg' : 'text-gray-700 hover:bg-white/60 hover:shadow-md'}`
            }
            onClick={handleClose} // closes mobile sidebar
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-amber-200/50">
        <button
          onClick={handleClose}
          className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

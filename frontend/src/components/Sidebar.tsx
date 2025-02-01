import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, Trophy, Settings } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Receipt, label: 'Transactions', path: '/transactions' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-[#121826] border-r border-gray-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">SEMA<span className="text-[#2AFF6B]">Web3</span></h1>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 text-gray-300 hover:text-[#2AFF6B] hover:bg-gray-800/50 rounded-lg p-3 transition-all duration-200 ${
                location.pathname === item.path ? 'text-[#2AFF6B] bg-gray-800/50' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, Trophy, Settings, Menu, X } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Receipt, label: 'Transactions', path: '/transactions' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900/90 border border-gray-800"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#121826] border-r border-gray-800 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8">
            SEMA<span className="text-[#2AFF6B]">AI</span>
          </h1>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 text-gray-300 hover:text-[#2AFF6B] hover:bg-gray-800/50 rounded-lg p-3 transition-all duration-200 ${
                  location.pathname === item.path ? 'text-[#2AFF6B] bg-gray-800/50' : ''
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
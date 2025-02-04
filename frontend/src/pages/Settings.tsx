import React from 'react';
import { Bell, Shield, Wallet, Globe } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </header>

      <div className="space-y-6">
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-[#2AFF6B]" />
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Email Notifications</label>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Push Notifications</label>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-5 h-5 text-[#2AFF6B]" />
            <h2 className="text-lg font-bold">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Two-Factor Authentication</label>
              <input type="checkbox" className="toggle" />
            </div>
            <button className="text-[#2AFF6B] hover:underline">
              Change Password
            </button>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <Wallet className="w-5 h-5 text-[#2AFF6B]" />
            <h2 className="text-lg font-bold">Wallet Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Auto-distribute Tokens</label>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Show Balance</label>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-5 h-5 text-[#2AFF6B]" />
            <h2 className="text-lg font-bold">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Language</label>
              <select className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Time Zone</label>
              <select className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2">
                <option>UTC</option>
                <option>EST</option>
                <option>PST</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
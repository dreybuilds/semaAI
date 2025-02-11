import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Wallet } from './pages/Wallet';
import { Leaderboard } from './pages/Leaderboard';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#121826] text-white">
        <Sidebar />
        <main className="flex-1 w-full lg:w-auto overflow-x-hidden overflow-y-auto pt-16 lg:pt-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
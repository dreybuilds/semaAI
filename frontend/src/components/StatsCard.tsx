import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-gray-900/50 p-3 md:p-6 rounded-xl border border-gray-800 hover:border-[#2AFF6B]/50 transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs md:text-sm mb-1">{title}</p>
          <h3 className="text-lg md:text-2xl font-bold text-white">{value}</h3>
          {trend && (
            <p className={`text-xs md:text-sm mt-1 ${trend > 0 ? 'text-[#2AFF6B]' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#2AFF6B] flex-shrink-0" />
      </div>
    </div>
  );
}
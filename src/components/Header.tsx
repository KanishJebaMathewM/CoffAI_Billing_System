import React from 'react';
import { Coffee, User, Phone } from 'lucide-react';

interface HeaderProps {
  customerName?: string;
  customerMobile?: string;
}

export const Header: React.FC<HeaderProps> = ({ customerName, customerMobile }) => {
  return (
    <header className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full">
            <Coffee className="h-8 w-8 text-amber-800" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">CoffAI</h1>
            <p className="text-amber-200">AI-Assisted Coffee Billing System</p>
          </div>
        </div>
        
        {(customerName || customerMobile) && (
          <div className="bg-amber-700 bg-opacity-50 px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-4 text-sm">
              {customerName && (
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{customerName}</span>
                </div>
              )}
              {customerMobile && (
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{customerMobile}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
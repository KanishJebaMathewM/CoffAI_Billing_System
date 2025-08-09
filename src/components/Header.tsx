import React from 'react';
import { Coffee, User, Phone } from 'lucide-react';

interface HeaderProps {
  customerName?: string;
  customerMobile?: string;
}

export const Header: React.FC<HeaderProps> = ({ customerName, customerMobile }) => {
  return (
    <header className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white p-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Coffee className="h-8 w-8 text-amber-700" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
              CoffAI
            </h1>
            <p className="text-amber-100 text-lg">AI-Assisted Coffee Billing System</p>
          </div>
        </div>

        {(customerName || customerMobile) && (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white border-opacity-30">
            <div className="flex items-center space-x-6 text-sm font-medium">
              {customerName && (
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{customerName}</span>
                </div>
              )}
              {customerMobile && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
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

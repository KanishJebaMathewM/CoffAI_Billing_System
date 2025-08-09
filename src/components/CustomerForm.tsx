import React, { useState } from 'react';
import { User, Phone, X } from 'lucide-react';
import { Customer } from '../types';

interface CustomerFormProps {
  onSubmit: (customer: Customer) => void;
  onCancel: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, onCancel }) => {
  const [customer, setCustomer] = useState<Customer>({ name: '', mobile: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <span className="mr-3">👤</span>
            Customer Details
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-amber-600" />
                <span>Customer Name</span>
              </div>
            </label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-lg"
              placeholder="Enter customer name (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-amber-600" />
                <span>Mobile Number</span>
              </div>
            </label>
            <input
              type="tel"
              value={customer.mobile}
              onChange={(e) => setCustomer(prev => ({ ...prev, mobile: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-lg"
              placeholder="Enter mobile number (optional)"
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Generate Bill
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold text-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

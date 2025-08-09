import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { OrderItem } from '../types';

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  total,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <p className="text-gray-500 text-center py-8">No items in your order yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {items.map(item => {
          const getItemDescription = () => {
            let description = item.coffee.name;
            if (item.milk) description += ` with ${item.milk.name}`;
            if (item.addOns.length > 0) {
              description += ` + ${item.addOns.map(a => a.name).join(', ')}`;
            }
            return description;
          };

          return (
            <div key={item.id} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{getItemDescription()}</h4>
                  <p className="text-sm text-gray-600">
                    ${(item.totalPrice / item.quantity).toFixed(2)} each
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="font-bold text-lg">${item.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t-2 border-amber-200">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">Total</span>
          <span className="text-3xl font-bold text-amber-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
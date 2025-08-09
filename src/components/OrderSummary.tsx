import React from 'react';
import { Trash2, Plus, Minus, Gift } from 'lucide-react';
import { OrderItem, DiscountRule } from '../types';

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  totalQuantity: number;
  appliedDiscount: DiscountRule | null;
  discountAmount: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  subtotal,
  totalQuantity,
  appliedDiscount,
  discountAmount,
  total,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <p className="text-gray-500 text-center py-8">No items in your order yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
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
            <div key={item.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 leading-tight">{getItemDescription()}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    ${(item.totalPrice / item.quantity).toFixed(2)} each
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="font-bold text-lg text-amber-600">${item.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Stats */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Total Items:</span>
          <span className="font-semibold">{totalQuantity}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal:</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Discount Information */}
      {appliedDiscount && discountAmount > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <Gift className="h-5 w-5 text-green-600 mr-2" />
            <span className="font-semibold text-green-800">Discount Applied!</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-700">
              {appliedDiscount.name} ({appliedDiscount.discountPercent}% off)
            </span>
            <span className="font-bold text-green-600">-${discountAmount.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Total */}
      <div className="pt-4 border-t-2 border-amber-200">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">Total</span>
          <span className="text-3xl font-bold text-amber-600">${total.toFixed(2)}</span>
        </div>
        {appliedDiscount && discountAmount > 0 && (
          <p className="text-sm text-green-600 text-right mt-1">
            You saved ${discountAmount.toFixed(2)}!
          </p>
        )}
      </div>
    </div>
  );
};

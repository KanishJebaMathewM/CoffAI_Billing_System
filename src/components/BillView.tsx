import React from 'react';
import { Download, RotateCcw, Coffee } from 'lucide-react';
import { Bill } from '../types';

interface BillViewProps {
  bill: Bill;
  onNewOrder: () => void;
  onDownloadPDF: () => void;
}

export const BillView: React.FC<BillViewProps> = ({
  bill,
  onNewOrder,
  onDownloadPDF,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getItemDescription = (item: any) => {
    let description = item.coffee.name;
    if (item.milk) description += ` with ${item.milk.name}`;
    if (item.addOns.length > 0) {
      description += ` + ${item.addOns.map((a: any) => a.name).join(', ')}`;
    }
    return description;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8" id="bill-content">
        {/* Header */}
        <div className="text-center border-b-2 border-amber-200 pb-6 mb-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="bg-amber-100 p-2 rounded-full">
              <Coffee className="h-8 w-8 text-amber-800" />
            </div>
            <h1 className="text-4xl font-bold text-amber-800">CoffAI</h1>
          </div>
          <p className="text-gray-600">AI-Assisted Coffee Billing System</p>
          <p className="text-sm text-gray-500 mt-2">
            Thank you for choosing CoffAI for your coffee experience!
          </p>
        </div>

        {/* Bill Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Bill ID</h3>
            <p className="text-gray-600">#{bill.id}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Date & Time</h3>
            <p className="text-gray-600">{formatDate(bill.date)}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Customer Name</h3>
            <p className="text-gray-600">{bill.customer.name || 'Walk-in Customer'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Mobile Number</h3>
            <p className="text-gray-600">{bill.customer.mobile || 'N/A'}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Item</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-800">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-800">Unit Price</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-800">Total</th>
                </tr>
              </thead>
              <tbody>
                {bill.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {getItemDescription(item)}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-800">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-800">
                      ${(item.totalPrice / item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800">
                      ${item.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-amber-50">
                <tr>
                  <td colSpan={3} className="px-4 py-4 text-right text-lg font-bold text-gray-800">
                    Grand Total:
                  </td>
                  <td className="px-4 py-4 text-right text-xl font-bold text-amber-600">
                    ${bill.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* AI Summary */}
        {bill.aiSummary && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center">
              <Coffee className="h-5 w-5 mr-2" />
              AI Summary
            </h3>
            <p className="text-gray-700 text-lg italic leading-relaxed">
              "{bill.aiSummary}"
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Generated by CoffAI - AI-Assisted Coffee Billing System
          </p>
          <p className="text-xs text-gray-400">
            Thank you for your business! Have a great day! ☕
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={onDownloadPDF}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>Download PDF</span>
        </button>
        <button
          onClick={onNewOrder}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="h-5 w-5" />
          <span>New Order</span>
        </button>
      </div>
    </div>
  );
};
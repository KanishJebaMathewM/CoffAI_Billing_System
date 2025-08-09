import React, { useState } from 'react';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { MilkType } from '../types';

interface MilkTypeManagerProps {
  milkTypes: MilkType[];
  onAddMilkType: (name: string, price: number) => void;
  onRemoveMilkType: (id: string) => void;
  onBack: () => void;
}

export const MilkTypeManager: React.FC<MilkTypeManagerProps> = ({
  milkTypes,
  onAddMilkType,
  onRemoveMilkType,
  onBack,
}) => {
  const [newMilkName, setNewMilkName] = useState('');
  const [newMilkPrice, setNewMilkPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilkName || !newMilkPrice) return;
    
    const price = parseFloat(newMilkPrice);
    if (isNaN(price) || price < 0) return;
    
    onAddMilkType(newMilkName, price);
    setNewMilkName('');
    setNewMilkPrice('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Manage Milk Types</h1>
      </div>

      {/* Add New Milk Type Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Milk Type</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Milk type name"
              value={newMilkName}
              onChange={(e) => setNewMilkName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <div className="w-32">
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Price"
              value={newMilkPrice}
              onChange={(e) => setNewMilkPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* Current Milk Types */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Milk Types</h2>
        <div className="grid gap-3">
          {milkTypes.map(milk => (
            <div
              key={milk.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div>
                <span className="font-semibold text-gray-800">{milk.name}</span>
                <span className="ml-4 text-lg font-bold text-amber-600">
                  ${milk.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => onRemoveMilkType(milk.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
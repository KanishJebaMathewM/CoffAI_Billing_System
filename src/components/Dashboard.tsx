import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { CoffeeType, MilkType, AddOn } from '../types';

interface DashboardProps {
  coffeeTypes: CoffeeType[];
  milkTypes: MilkType[];
  addOns: AddOn[];
  onAddItem: (coffee: CoffeeType, milk: MilkType | undefined, addOns: AddOn[], quantity: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  coffeeTypes,
  milkTypes,
  addOns,
  onAddItem,
}) => {
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeType | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<MilkType | undefined>();
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddOnToggle = (addOn: AddOn) => {
    setSelectedAddOns(prev => 
      prev.find(a => a.id === addOn.id)
        ? prev.filter(a => a.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  const handleAddToOrder = () => {
    if (!selectedCoffee) return;
    
    onAddItem(selectedCoffee, selectedMilk, selectedAddOns, quantity);
    
    // Reset selection
    setSelectedCoffee(null);
    setSelectedMilk(undefined);
    setSelectedAddOns([]);
    setQuantity(1);
  };

  const calculateItemPrice = () => {
    if (!selectedCoffee) return 0;
    return (selectedCoffee.price + (selectedMilk?.price || 0) + 
      selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)) * quantity;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      {/* Coffee Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-3">☕</span>
          Coffee Selection
        </h2>
        <div className="grid gap-3">
          {coffeeTypes.map(coffee => (
            <button
              key={coffee.id}
              onClick={() => setSelectedCoffee(coffee)}
              className={`p-5 rounded-xl border-2 transition-all transform hover:scale-105 ${
                selectedCoffee?.id === coffee.id
                  ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg'
                  : 'border-gray-200 hover:border-amber-300 hover:bg-amber-25 bg-white shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <span className="font-semibold text-gray-800 block">{coffee.name}</span>
                  <span className="text-sm text-gray-500">Premium Coffee</span>
                </div>
                <span className="text-lg font-bold text-amber-600">${coffee.price.toFixed(2)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Milk & Add-ons */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🥛</span>
            Milk Type
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setSelectedMilk(undefined)}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                !selectedMilk
                  ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md'
                  : 'border-gray-200 hover:border-amber-300 bg-white hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">No Milk</span>
                <span className="font-bold text-amber-600">$0.00</span>
              </div>
            </button>
            {milkTypes.map(milk => (
              <button
                key={milk.id}
                onClick={() => setSelectedMilk(milk)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedMilk?.id === milk.id
                    ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md'
                    : 'border-gray-200 hover:border-amber-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{milk.name}</span>
                  <span className="font-bold text-amber-600">${milk.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🍯</span>
            Add-ons
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {addOns.map(addOn => (
              <button
                key={addOn.id}
                onClick={() => handleAddOnToggle(addOn)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedAddOns.find(a => a.id === addOn.id)
                    ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md'
                    : 'border-gray-200 hover:border-amber-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{addOn.name}</span>
                  <span className="font-bold text-amber-600">${addOn.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary & Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">🛒</span>
          Current Selection
        </h3>

        {selectedCoffee ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-lg text-gray-800 mb-2">{selectedCoffee.name}</h4>
              {selectedMilk && (
                <p className="text-gray-600 flex items-center">
                  <span className="mr-2">🥛</span>
                  {selectedMilk.name}
                </p>
              )}
              {selectedAddOns.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-600 flex items-center">
                    <span className="mr-2">🍯</span>
                    {selectedAddOns.map(a => a.name).join(', ')}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-800">Quantity</span>
                <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors"
                  >
                    <Minus className="h-4 w-4 text-amber-700" />
                  </button>
                  <span className="text-xl font-bold w-8 text-center text-amber-700">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 bg-amber-100 hover:bg-amber-200 rounded-full transition-colors"
                  >
                    <Plus className="h-4 w-4 text-amber-700" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Item Total</span>
                <span className="text-2xl font-bold text-amber-600">
                  ${calculateItemPrice().toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToOrder}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add to Order
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">☕</div>
            <p className="text-gray-500 text-lg">
              Select a coffee to start your order
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

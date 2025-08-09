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
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Milk Type</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedMilk(undefined)}
              className={`w-full p-3 rounded-lg border-2 transition-all ${
                !selectedMilk
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-gray-200 hover:border-amber-300'
              }`}
            >
              <div className="flex justify-between">
                <span>No Milk</span>
                <span className="font-bold">$0.00</span>
              </div>
            </button>
            {milkTypes.map(milk => (
              <button
                key={milk.id}
                onClick={() => setSelectedMilk(milk)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  selectedMilk?.id === milk.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="flex justify-between">
                  <span>{milk.name}</span>
                  <span className="font-bold">${milk.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Add-ons</h3>
          <div className="space-y-2">
            {addOns.map(addOn => (
              <button
                key={addOn.id}
                onClick={() => handleAddOnToggle(addOn)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  selectedAddOns.find(a => a.id === addOn.id)
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="flex justify-between">
                  <span>{addOn.name}</span>
                  <span className="font-bold">${addOn.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary & Actions */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Selection</h3>
        
        {selectedCoffee ? (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-lg">{selectedCoffee.name}</h4>
              {selectedMilk && (
                <p className="text-gray-600">+ {selectedMilk.name}</p>
              )}
              {selectedAddOns.length > 0 && (
                <p className="text-gray-600">
                  + {selectedAddOns.map(a => a.name).join(', ')}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-lg">
              <span className="font-semibold">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="bg-amber-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Price</span>
                <span className="text-2xl font-bold text-amber-600">
                  ${calculateItemPrice().toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToOrder}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              Add to Order
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Select a coffee to start your order
          </p>
        )}
      </div>
    </div>
  );
};

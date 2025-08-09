import React, { useState } from 'react';
import { Plus, Trash2, ArrowLeft, Edit3, Save, X, Toggle } from 'lucide-react';
import { CoffeeType, MilkType, AddOn, DiscountRule } from '../types';

interface ManagementCenterProps {
  coffeeTypes: CoffeeType[];
  milkTypes: MilkType[];
  addOns: AddOn[];
  discountRules: DiscountRule[];
  onAddCoffeeType: (name: string, price: number) => void;
  onRemoveCoffeeType: (id: string) => void;
  onAddMilkType: (name: string, price: number) => void;
  onRemoveMilkType: (id: string) => void;
  onAddAddOn: (name: string, price: number) => void;
  onRemoveAddOn: (id: string) => void;
  onAddDiscountRule: (name: string, minQuantity: number, discountPercent: number) => void;
  onRemoveDiscountRule: (id: string) => void;
  onUpdateDiscountRule: (id: string, updates: Partial<DiscountRule>) => void;
  onBack: () => void;
}

type TabType = 'coffee' | 'milk' | 'addons' | 'discounts';

export const ManagementCenter: React.FC<ManagementCenterProps> = ({
  coffeeTypes,
  milkTypes,
  addOns,
  discountRules,
  onAddCoffeeType,
  onRemoveCoffeeType,
  onAddMilkType,
  onRemoveMilkType,
  onAddAddOn,
  onRemoveAddOn,
  onAddDiscountRule,
  onRemoveDiscountRule,
  onUpdateDiscountRule,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('coffee');
  const [editingDiscount, setEditingDiscount] = useState<string | null>(null);

  // Form states
  const [newCoffeeName, setNewCoffeeName] = useState('');
  const [newCoffeePrice, setNewCoffeePrice] = useState('');
  const [newMilkName, setNewMilkName] = useState('');
  const [newMilkPrice, setNewMilkPrice] = useState('');
  const [newAddonName, setNewAddonName] = useState('');
  const [newAddonPrice, setNewAddonPrice] = useState('');
  const [newDiscountName, setNewDiscountName] = useState('');
  const [newDiscountQuantity, setNewDiscountQuantity] = useState('');
  const [newDiscountPercent, setNewDiscountPercent] = useState('');

  const tabs = [
    { id: 'coffee' as TabType, label: 'Coffee Types', icon: '☕' },
    { id: 'milk' as TabType, label: 'Milk Types', icon: '🥛' },
    { id: 'addons' as TabType, label: 'Add-ons', icon: '🍯' },
    { id: 'discounts' as TabType, label: 'Discounts', icon: '🎫' },
  ];

  const handleSubmitCoffee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoffeeName || !newCoffeePrice) return;
    const price = parseFloat(newCoffeePrice);
    if (isNaN(price) || price < 0) return;
    onAddCoffeeType(newCoffeeName, price);
    setNewCoffeeName('');
    setNewCoffeePrice('');
  };

  const handleSubmitMilk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilkName || !newMilkPrice) return;
    const price = parseFloat(newMilkPrice);
    if (isNaN(price) || price < 0) return;
    onAddMilkType(newMilkName, price);
    setNewMilkName('');
    setNewMilkPrice('');
  };

  const handleSubmitAddon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddonName || !newAddonPrice) return;
    const price = parseFloat(newAddonPrice);
    if (isNaN(price) || price < 0) return;
    onAddAddOn(newAddonName, price);
    setNewAddonName('');
    setNewAddonPrice('');
  };

  const handleSubmitDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscountName || !newDiscountQuantity || !newDiscountPercent) return;
    const quantity = parseInt(newDiscountQuantity);
    const percent = parseFloat(newDiscountPercent);
    if (isNaN(quantity) || quantity < 1 || isNaN(percent) || percent < 0 || percent > 100) return;
    onAddDiscountRule(newDiscountName, quantity, percent);
    setNewDiscountName('');
    setNewDiscountQuantity('');
    setNewDiscountPercent('');
  };

  const renderCoffeeTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">☕</span>
          Add New Coffee Type
        </h3>
        <form onSubmit={handleSubmitCoffee} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Coffee name (e.g., Cappuccino)"
              value={newCoffeeName}
              onChange={(e) => setNewCoffeeName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="w-32">
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Price"
              value={newCoffeePrice}
              onChange={(e) => setNewCoffeePrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Add</span>
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Coffee Types</h3>
        <div className="grid gap-3">
          {coffeeTypes.map(coffee => (
            <div
              key={coffee.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">☕</span>
                <div>
                  <span className="font-semibold text-gray-800">{coffee.name}</span>
                  <span className="ml-4 text-lg font-bold text-amber-600">
                    ${coffee.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemoveCoffeeType(coffee.id)}
                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMilkTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🥛</span>
          Add New Milk Type
        </h3>
        <form onSubmit={handleSubmitMilk} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Milk type name (e.g., Oat Milk)"
              value={newMilkName}
              onChange={(e) => setNewMilkName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Add</span>
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Milk Types</h3>
        <div className="grid gap-3">
          {milkTypes.map(milk => (
            <div
              key={milk.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🥛</span>
                <div>
                  <span className="font-semibold text-gray-800">{milk.name}</span>
                  <span className="ml-4 text-lg font-bold text-amber-600">
                    ${milk.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemoveMilkType(milk.id)}
                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAddonsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🍯</span>
          Add New Add-on
        </h3>
        <form onSubmit={handleSubmitAddon} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Add-on name (e.g., Extra Shot)"
              value={newAddonName}
              onChange={(e) => setNewAddonName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="w-32">
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Price"
              value={newAddonPrice}
              onChange={(e) => setNewAddonPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Add</span>
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Add-ons</h3>
        <div className="grid gap-3">
          {addOns.map(addon => (
            <div
              key={addon.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🍯</span>
                <div>
                  <span className="font-semibold text-gray-800">{addon.name}</span>
                  <span className="ml-4 text-lg font-bold text-amber-600">
                    ${addon.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemoveAddOn(addon.id)}
                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiscountsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🎫</span>
          Add New Discount Rule
        </h3>
        <form onSubmit={handleSubmitDiscount} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Discount name (e.g., Bulk Order)"
              value={newDiscountName}
              onChange={(e) => setNewDiscountName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <input
              type="number"
              min="1"
              placeholder="Min Quantity"
              value={newDiscountQuantity}
              onChange={(e) => setNewDiscountQuantity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="Discount %"
              value={newDiscountPercent}
              onChange={(e) => setNewDiscountPercent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="md:col-span-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span>Add Discount Rule</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Discount Rules</h3>
        <div className="grid gap-3">
          {discountRules.map(rule => (
            <div
              key={rule.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center flex-1">
                <span className="text-2xl mr-3">����</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-800">{rule.name}</span>
                    <span className="text-sm text-gray-600">
                      {rule.minQuantity}+ items → {rule.discountPercent}% off
                    </span>
                    <button
                      onClick={() => onUpdateDiscountRule(rule.id, { isActive: !rule.isActive })}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        rule.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRemoveDiscountRule(rule.id)}
                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all ml-4"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Management Center</h1>
          <p className="text-gray-600">Manage your coffee shop's menu items and pricing</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-2">
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'coffee' && renderCoffeeTab()}
          {activeTab === 'milk' && renderMilkTab()}
          {activeTab === 'addons' && renderAddonsTab()}
          {activeTab === 'discounts' && renderDiscountsTab()}
        </div>
      </div>
    </div>
  );
};

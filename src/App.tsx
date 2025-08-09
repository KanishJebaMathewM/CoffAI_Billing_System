import React, { useState } from 'react';
import { Settings, ShoppingCart, Receipt } from 'lucide-react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { OrderSummary } from './components/OrderSummary';
import { ManagementCenter } from './components/ManagementCenter';
import { BillView } from './components/BillView';
import { CustomerForm } from './components/CustomerForm';
import { useStore } from './hooks/useStore';
import { generatePDF } from './utils/pdfGenerator';
import { ViewMode, Customer } from './types';

function App() {
  const {
    coffeeTypes,
    milkTypes,
    addOns,
    currentOrder,
    currentBill,
    addMilkType,
    removeMilkType,
    addOrderItem,
    removeOrderItem,
    updateOrderItemQuantity,
    getOrderTotal,
    finalizeBill,
    clearOrder,
  } = useStore();

  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const handleFinalizeBill = async (customer: Customer) => {
    const bill = await finalizeBill(customer);
    setCurrentView('bill');
    setShowCustomerForm(false);
  };

  const handleNewOrder = () => {
    clearOrder();
    setCurrentView('dashboard');
  };

  const handleDownloadPDF = () => {
    if (currentBill) {
      generatePDF(currentBill);
    }
  };

  if (currentView === 'manage-milk') {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <MilkTypeManager
          milkTypes={milkTypes}
          onAddMilkType={addMilkType}
          onRemoveMilkType={removeMilkType}
          onBack={() => setCurrentView('dashboard')}
        />
      </div>
    );
  }

  if (currentView === 'bill' && currentBill) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header
          customerName={currentBill.customer.name}
          customerMobile={currentBill.customer.mobile}
        />
        <BillView
          bill={currentBill}
          onNewOrder={handleNewOrder}
          onDownloadPDF={handleDownloadPDF}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Order Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentView('manage-milk')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Manage Milk Types</span>
              </button>
            </div>
            
            {currentOrder.length > 0 && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Order Total</p>
                  <p className="text-2xl font-bold text-amber-600">
                    ${getOrderTotal().toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => setShowCustomerForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                >
                  <Receipt className="h-5 w-5" />
                  <span>Finalize Order</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 p-6">
          <div className="xl:col-span-3">
            <Dashboard
              coffeeTypes={coffeeTypes}
              milkTypes={milkTypes}
              addOns={addOns}
              onAddItem={addOrderItem}
            />
          </div>
          <div className="xl:col-span-1">
            <OrderSummary
              items={currentOrder}
              onRemoveItem={removeOrderItem}
              onUpdateQuantity={updateOrderItemQuantity}
              total={getOrderTotal()}
            />
          </div>
        </div>
      </div>

      {showCustomerForm && (
        <CustomerForm
          onSubmit={handleFinalizeBill}
          onCancel={() => setShowCustomerForm(false)}
        />
      )}
    </div>
  );
}

export default App;

import { useState, useCallback } from 'react';
import { CoffeeType, MilkType, AddOn, OrderItem, Customer, Bill, DiscountRule } from '../types';

const initialCoffeeTypes: CoffeeType[] = [
  { id: '1', name: 'Espresso', price: 3.50 },
  { id: '2', name: 'Americano', price: 4.00 },
  { id: '3', name: 'Latte', price: 5.50 },
  { id: '4', name: 'Cappuccino', price: 5.00 },
  { id: '5', name: 'Macchiato', price: 5.75 },
  { id: '6', name: 'Mocha', price: 6.00 },
  { id: '7', name: 'Flat White', price: 5.25 },
];

const initialMilkTypes: MilkType[] = [
  { id: '1', name: 'Whole Milk', price: 0.50 },
  { id: '2', name: 'Skimmed Milk', price: 0.50 },
  { id: '3', name: 'Oat Milk', price: 0.75 },
  { id: '4', name: 'Soy Milk', price: 0.65 },
  { id: '5', name: 'Almond Milk', price: 0.70 },
  { id: '6', name: 'Coconut Milk', price: 0.80 },
];

const initialAddOns: AddOn[] = [
  { id: '1', name: 'Extra Shot', price: 1.00 },
  { id: '2', name: 'Sugar', price: 0.00 },
  { id: '3', name: 'Vanilla Syrup', price: 0.75 },
  { id: '4', name: 'Caramel Syrup', price: 0.75 },
  { id: '5', name: 'Chocolate Topping', price: 0.50 },
  { id: '6', name: 'Whipped Cream', price: 0.60 },
  { id: '7', name: 'Cinnamon', price: 0.25 },
  { id: '8', name: 'Extra Hot', price: 0.00 },
];

export const useStore = () => {
  const [coffeeTypes] = useState<CoffeeType[]>(initialCoffeeTypes);
  const [milkTypes, setMilkTypes] = useState<MilkType[]>(initialMilkTypes);
  const [addOns] = useState<AddOn[]>(initialAddOns);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [customer, setCustomer] = useState<Customer>({ name: '', mobile: '' });
  const [currentBill, setCurrentBill] = useState<Bill | null>(null);

  const addMilkType = useCallback((name: string, price: number) => {
    const newMilkType: MilkType = {
      id: Date.now().toString(),
      name,
      price,
    };
    setMilkTypes(prev => [...prev, newMilkType]);
  }, []);

  const removeMilkType = useCallback((id: string) => {
    setMilkTypes(prev => prev.filter(milk => milk.id !== id));
  }, []);

  const addOrderItem = useCallback((
    coffee: CoffeeType,
    milk: MilkType | undefined,
    selectedAddOns: AddOn[],
    quantity: number
  ) => {
    const totalPrice = (coffee.price + (milk?.price || 0) + 
      selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)) * quantity;

    const newItem: OrderItem = {
      id: Date.now().toString(),
      coffee,
      milk,
      addOns: selectedAddOns,
      quantity,
      totalPrice,
    };

    setCurrentOrder(prev => [...prev, newItem]);
  }, []);

  const removeOrderItem = useCallback((id: string) => {
    setCurrentOrder(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateOrderItemQuantity = useCallback((id: string, quantity: number) => {
    setCurrentOrder(prev => prev.map(item => {
      if (item.id === id) {
        const totalPrice = (item.coffee.price + (item.milk?.price || 0) + 
          item.addOns.reduce((sum, addon) => sum + addon.price, 0)) * quantity;
        return { ...item, quantity, totalPrice };
      }
      return item;
    }));
  }, []);

  const getOrderTotal = useCallback(() => {
    return currentOrder.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [currentOrder]);

  const finalizeBill = useCallback(async (customerData: Customer) => {
    const total = getOrderTotal();
    const bill: Bill = {
      id: Date.now().toString(),
      customer: customerData,
      items: [...currentOrder],
      total,
      date: new Date(),
    };

    // Generate AI summary
    const summary = generateAISummary(bill);
    bill.aiSummary = summary;

    setCurrentBill(bill);
    setCustomer(customerData);
    return bill;
  }, [currentOrder, getOrderTotal]);

  const clearOrder = useCallback(() => {
    setCurrentOrder([]);
    setCustomer({ name: '', mobile: '' });
    setCurrentBill(null);
  }, []);

  return {
    coffeeTypes,
    milkTypes,
    addOns,
    currentOrder,
    customer,
    currentBill,
    addMilkType,
    removeMilkType,
    addOrderItem,
    removeOrderItem,
    updateOrderItemQuantity,
    getOrderTotal,
    finalizeBill,
    clearOrder,
  };
};

const generateAISummary = (bill: Bill): string => {
  const { customer, items, total } = bill;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const itemDescriptions = items.map(item => {
    let description = `${item.quantity} ${item.coffee.name}`;
    if (item.milk) description += ` with ${item.milk.name}`;
    if (item.addOns.length > 0) {
      const addOnNames = item.addOns.map(addon => addon.name).join(', ');
      description += ` and ${addOnNames}`;
    }
    return description;
  });

  const greeting = customer.name ? `Hello ${customer.name}!` : 'Hello!';
  const orderSummary = itemDescriptions.join(', ');
  
  return `${greeting} You've ordered ${orderSummary}. Your total is $${total.toFixed(2)}. Thank you for visiting CoffAI! ☕`;
};

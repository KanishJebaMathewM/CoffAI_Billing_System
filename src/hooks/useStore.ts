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

const initialDiscountRules: DiscountRule[] = [
  { id: '1', name: 'Bulk Order (5+ items)', minQuantity: 5, discountPercent: 10, isActive: true },
  { id: '2', name: 'Large Order (10+ items)', minQuantity: 10, discountPercent: 15, isActive: true },
  { id: '3', name: 'Party Pack (20+ items)', minQuantity: 20, discountPercent: 20, isActive: true },
];

export const useStore = () => {
  const [coffeeTypes, setCoffeeTypes] = useState<CoffeeType[]>(initialCoffeeTypes);
  const [milkTypes, setMilkTypes] = useState<MilkType[]>(initialMilkTypes);
  const [addOns, setAddOns] = useState<AddOn[]>(initialAddOns);
  const [discountRules, setDiscountRules] = useState<DiscountRule[]>(initialDiscountRules);
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

  // Coffee management
  const addCoffeeType = useCallback((name: string, price: number) => {
    const newCoffeeType: CoffeeType = {
      id: Date.now().toString(),
      name,
      price,
    };
    setCoffeeTypes(prev => [...prev, newCoffeeType]);
  }, []);

  const removeCoffeeType = useCallback((id: string) => {
    setCoffeeTypes(prev => prev.filter(coffee => coffee.id !== id));
  }, []);

  // Add-on management
  const addAddOn = useCallback((name: string, price: number) => {
    const newAddOn: AddOn = {
      id: Date.now().toString(),
      name,
      price,
    };
    setAddOns(prev => [...prev, newAddOn]);
  }, []);

  const removeAddOn = useCallback((id: string) => {
    setAddOns(prev => prev.filter(addon => addon.id !== id));
  }, []);

  // Discount management
  const addDiscountRule = useCallback((name: string, minQuantity: number, discountPercent: number) => {
    const newRule: DiscountRule = {
      id: Date.now().toString(),
      name,
      minQuantity,
      discountPercent,
      isActive: true,
    };
    setDiscountRules(prev => [...prev, newRule]);
  }, []);

  const removeDiscountRule = useCallback((id: string) => {
    setDiscountRules(prev => prev.filter(rule => rule.id !== id));
  }, []);

  const updateDiscountRule = useCallback((id: string, updates: Partial<DiscountRule>) => {
    setDiscountRules(prev => prev.map(rule =>
      rule.id === id ? { ...rule, ...updates } : rule
    ));
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

  const getOrderSubtotal = useCallback(() => {
    return currentOrder.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [currentOrder]);

  const getTotalQuantity = useCallback(() => {
    return currentOrder.reduce((sum, item) => sum + item.quantity, 0);
  }, [currentOrder]);

  const getApplicableDiscount = useCallback(() => {
    const totalQuantity = getTotalQuantity();
    const activeRules = discountRules.filter(rule => rule.isActive);

    // Find the highest discount that applies
    return activeRules
      .filter(rule => totalQuantity >= rule.minQuantity)
      .sort((a, b) => b.discountPercent - a.discountPercent)[0] || null;
  }, [discountRules, getTotalQuantity]);

  const getOrderTotal = useCallback(() => {
    const subtotal = getOrderSubtotal();
    const discount = getApplicableDiscount();
    const discountAmount = discount ? (subtotal * discount.discountPercent) / 100 : 0;
    return subtotal - discountAmount;
  }, [getOrderSubtotal, getApplicableDiscount]);

  const finalizeBill = useCallback(async (customerData: Customer) => {
    const subtotal = getOrderSubtotal();
    const appliedDiscount = getApplicableDiscount();
    const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.discountPercent) / 100 : 0;
    const total = subtotal - discountAmount;

    const bill: Bill = {
      id: Date.now().toString(),
      customer: customerData,
      items: [...currentOrder],
      subtotal,
      discountAmount,
      total,
      date: new Date(),
      appliedDiscount,
    };

    // Generate AI summary
    const summary = generateAISummary(bill);
    bill.aiSummary = summary;

    setCurrentBill(bill);
    setCustomer(customerData);
    return bill;
  }, [currentOrder, getOrderSubtotal, getApplicableDiscount]);

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

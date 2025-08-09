export interface CoffeeType {
  id: string;
  name: string;
  price: number;
}

export interface MilkType {
  id: string;
  name: string;
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  coffee: CoffeeType;
  milk?: MilkType;
  addOns: AddOn[];
  quantity: number;
  totalPrice: number;
}

export interface Customer {
  name: string;
  mobile: string;
}

export interface DiscountRule {
  id: string;
  name: string;
  minQuantity: number;
  discountPercent: number;
  isActive: boolean;
}

export interface Bill {
  id: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  total: number;
  date: Date;
  aiSummary?: string;
  appliedDiscount?: DiscountRule;
}

export type ViewMode = 'dashboard' | 'manage' | 'bill';

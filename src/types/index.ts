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

export interface Bill {
  id: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  date: Date;
  aiSummary?: string;
}

export type ViewMode = 'dashboard' | 'manage-milk' | 'bill';
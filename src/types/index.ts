
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: string;
  type: 'promo' | 'transaction' | 'system';
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  endDate: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  cashbackPercentage: number;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    cashback: number;
    points: number;
  };
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

export interface TransactionType {
  id: string;
  type: 'bonus_received' | 'bonus_pending' | 'bonus_expired' | 'purchase' | 'refund' | 'transfer';
  amount: number;
  currency: 'cashback' | 'points';
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed' | 'expired';
  partnerId?: string;
  productId?: string;
}

export interface Order {
  id: string;
  products: {
    productId: string;
    quantity: number;
    price: {
      cashback: number;
      points: number;
    };
  }[];
  total: {
    cashback: number;
    points: number;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  trackingNumber?: string;
  trackingEvents?: {
    date: string;
    status: string;
    description: string;
    location?: string;
  }[];
}

export interface Wallet {
  cashback: number;
  points: number;
  lastUpdate: string;
}

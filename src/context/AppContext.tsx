
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Notification, Promotion, Partner, Product, TransactionType, Order, Wallet } from '../types';
import { mockUser, mockWallet, mockNotifications, mockPromotions, mockPartners, mockProducts, mockTransactions, mockOrders } from '../data/mockData';
import { toast } from '@/components/ui/use-toast';

type Currency = 'cashback' | 'points';

interface AppContextType {
  user: User;
  wallet: Wallet;
  notifications: Notification[];
  unreadNotifications: number;
  promotions: Promotion[];
  partners: Partner[];
  products: Product[];
  transactions: TransactionType[];
  orders: Order[];
  readNotification: (id: string) => void;
  readAllNotifications: () => void;
  purchaseProduct: (productId: string, quantity: number, currency: Currency) => void;
  transferToPartner: (partnerId: string, amount: number, currency: Currency) => void;
  getProductById: (id: string) => Product | undefined;
  getPartnerById: (id: string) => Partner | undefined;
  getOrderById: (id: string) => Order | undefined;
  getUnreadNotificationsCount: () => number;
  loadMore: (resource: string) => void;
  requestSecondReceipt: (transactionId: string) => void;
  requestBillDiscount: (amount: number, currency: Currency) => void;
  filteredTransactions: TransactionType[];
  setTransactionFilter: (filter: string) => void;
  transactionFilter: string;
  cart: { product: Product; quantity: number; currency: Currency }[];
  addToCart: (product: Product, quantity: number, currency: Currency) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  cartTotal: { cashback: number; points: number };
  checkout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(mockUser);
  const [wallet, setWallet] = useState<Wallet>(mockWallet);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [transactions, setTransactions] = useState<TransactionType[]>(mockTransactions);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [transactionFilter, setTransactionFilter] = useState<string>('all');
  const [cart, setCart] = useState<{ product: Product; quantity: number; currency: Currency }[]>([]);

  const filteredTransactions = transactions.filter((transaction) => {
    if (transactionFilter === 'all') return true;
    if (transactionFilter === 'bonus_received') return transaction.type === 'bonus_received';
    if (transactionFilter === 'bonus_pending') return transaction.type === 'bonus_pending';
    if (transactionFilter === 'bonus_expired') return transaction.type === 'bonus_expired';
    if (transactionFilter === 'purchase') return transaction.type === 'purchase';
    if (transactionFilter === 'refund') return transaction.type === 'refund';
    if (transactionFilter === 'transfer') return transaction.type === 'transfer';
    return true;
  });

  const readNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const readAllNotifications = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
  };

  const purchaseProduct = (productId: string, quantity: number, currency: Currency) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const price = currency === 'cashback' ? product.price.cashback : product.price.points;
    const totalPrice = price * quantity;
    
    if (currency === 'cashback' && wallet.cashback < totalPrice) {
      toast({
        title: 'Saldo insuficiente',
        description: 'Você não tem cashback suficiente para esta compra.',
        variant: 'destructive'
      });
      return;
    }
    
    if (currency === 'points' && wallet.points < totalPrice) {
      toast({
        title: 'Saldo insuficiente',
        description: 'Você não tem pontos suficientes para esta compra.',
        variant: 'destructive'
      });
      return;
    }

    // Update wallet
    setWallet(prev => ({
      ...prev,
      [currency]: prev[currency] - totalPrice,
      lastUpdate: new Date().toISOString()
    }));

    // Create transaction
    const newTransaction: TransactionType = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'purchase',
      amount: totalPrice,
      currency,
      date: new Date().toISOString(),
      description: `Compra de ${quantity}x ${product.name}`,
      status: 'completed',
      productId
    };

    // Create order
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      products: [
        {
          productId,
          quantity,
          price: {
            cashback: currency === 'cashback' ? totalPrice : 0,
            points: currency === 'points' ? totalPrice : 0
          }
        }
      ],
      total: {
        cashback: currency === 'cashback' ? totalPrice : 0,
        points: currency === 'points' ? totalPrice : 0
      },
      status: 'pending',
      date: new Date().toISOString(),
      trackingEvents: [
        {
          date: new Date().toISOString(),
          status: 'pending',
          description: 'Pagamento confirmado',
          location: 'Sistema'
        }
      ]
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setOrders(prev => [newOrder, ...prev]);

    // Create notification
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 9),
      title: 'Compra Realizada',
      message: `Você adquiriu ${quantity}x ${product.name} por ${totalPrice} ${currency}.`,
      read: false,
      date: new Date().toISOString(),
      type: 'transaction'
    };

    setNotifications(prev => [newNotification, ...prev]);

    toast({
      title: 'Compra realizada com sucesso!',
      description: `Você adquiriu ${quantity}x ${product.name}.`
    });
  };

  const transferToPartner = (partnerId: string, amount: number, currency: Currency) => {
    const partner = partners.find((p) => p.id === partnerId);
    if (!partner) return;

    if (currency === 'cashback' && wallet.cashback < amount) {
      toast({
        title: 'Saldo insuficiente',
        description: 'Você não tem cashback suficiente para esta transferência.',
        variant: 'destructive'
      });
      return;
    }
    
    if (currency === 'points' && wallet.points < amount) {
      toast({
        title: 'Saldo insuficiente',
        description: 'Você não tem pontos suficientes para esta transferência.',
        variant: 'destructive'
      });
      return;
    }

    // Update wallet
    setWallet(prev => ({
      ...prev,
      [currency]: prev[currency] - amount,
      lastUpdate: new Date().toISOString()
    }));

    // Create transaction
    const newTransaction: TransactionType = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'transfer',
      amount,
      currency,
      date: new Date().toISOString(),
      description: `Transferência para ${partner.name}`,
      status: 'completed',
      partnerId
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Create notification
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 9),
      title: 'Transferência Realizada',
      message: `Você transferiu ${amount} ${currency} para ${partner.name}.`,
      read: false,
      date: new Date().toISOString(),
      type: 'transaction'
    };

    setNotifications(prev => [newNotification, ...prev]);

    toast({
      title: 'Transferência realizada com sucesso!',
      description: `Você transferiu ${amount} ${currency} para ${partner.name}.`
    });
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const getPartnerById = (id: string) => {
    return partners.find((partner) => partner.id === id);
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const getUnreadNotificationsCount = () => {
    return notifications.filter((notification) => !notification.read).length;
  };

  // Mock function to simulate loading more data
  const loadMore = (resource: string) => {
    toast({
      title: 'Carregando mais dados',
      description: `Carregando mais ${resource}...`
    });
    
    // This would typically make an API call to load more data
    setTimeout(() => {
      toast({
        title: 'Dados carregados',
        description: `Mais ${resource} foram carregados com sucesso.`
      });
    }, 1500);
  };

  const requestSecondReceipt = (transactionId: string) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (!transaction) return;

    toast({
      title: 'Segunda via solicitada',
      description: 'A segunda via do comprovante foi enviada para seu e-mail.'
    });
  };

  const requestBillDiscount = (amount: number, currency: Currency) => {
    if (currency === 'cashback' && wallet.cashback < amount) {
      toast({
        title: 'Saldo insuficiente',
        description: 'Você não tem cashback suficiente para este desconto.',
        variant: 'destructive'
      });
      return;
    }
    
    if (currency === 'points' && wallet.points < amount) {
      toast({
        title: 'Saldo insuficiente',
        description: 'Você não tem pontos suficientes para este desconto.',
        variant: 'destructive'
      });
      return;
    }

    // Update wallet
    setWallet(prev => ({
      ...prev,
      [currency]: prev[currency] - amount,
      lastUpdate: new Date().toISOString()
    }));

    // Create transaction
    const newTransaction: TransactionType = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'transfer',
      amount,
      currency,
      date: new Date().toISOString(),
      description: 'Desconto na fatura',
      status: 'completed'
    };

    setTransactions(prev => [newTransaction, ...prev]);

    toast({
      title: 'Desconto solicitado com sucesso',
      description: `O desconto de ${amount} ${currency} será aplicado na sua próxima fatura.`
    });
  };

  const addToCart = (product: Product, quantity: number, currency: Currency) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Update quantity if item already in cart
      setCart(
        cart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        )
      );
    } else {
      // Add new item to cart
      setCart([...cart, { product, quantity, currency }]);
    }
    
    toast({
      title: 'Produto adicionado ao carrinho',
      description: `${quantity}x ${product.name} adicionado ao carrinho`
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(
      cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => {
      const price = item.currency === 'cashback' 
        ? item.product.price.cashback 
        : item.product.price.points;
      
      return {
        cashback: total.cashback + (item.currency === 'cashback' ? price * item.quantity : 0),
        points: total.points + (item.currency === 'points' ? price * item.quantity : 0)
      };
    },
    { cashback: 0, points: 0 }
  );

  const checkout = () => {
    // Check if wallet has enough funds
    if (cartTotal.cashback > wallet.cashback || cartTotal.points > wallet.points) {
      toast({
        title: 'Saldo insuficiente',
        description: 'Você não tem saldo suficiente para completar esta compra.',
        variant: 'destructive'
      });
      return;
    }
    
    // Process each item in cart
    cart.forEach(item => {
      purchaseProduct(item.product.id, item.quantity, item.currency);
    });
    
    // Clear cart after successful checkout
    clearCart();
    
    toast({
      title: 'Compra finalizada com sucesso',
      description: 'Sua compra foi processada e seus produtos serão entregues em breve.'
    });
  };

  const unreadNotifications = getUnreadNotificationsCount();

  return (
    <AppContext.Provider
      value={{
        user,
        wallet,
        notifications,
        unreadNotifications,
        promotions,
        partners,
        products,
        transactions,
        orders,
        readNotification,
        readAllNotifications,
        purchaseProduct,
        transferToPartner,
        getProductById,
        getPartnerById,
        getOrderById,
        getUnreadNotificationsCount,
        loadMore,
        requestSecondReceipt,
        requestBillDiscount,
        filteredTransactions,
        setTransactionFilter,
        transactionFilter,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        cartTotal,
        checkout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

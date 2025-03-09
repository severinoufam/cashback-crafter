
import React from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import OrderList from '@/components/OrderList';

const OrderHistory = () => {
  const { orders } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Meus Pedidos" showBackButton />
      
      <main className="flex-1 pb-20 p-4">
        <OrderList orders={orders} />
      </main>
      
      <NavBar />
    </div>
  );
};

export default OrderHistory;


import React from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import BalanceCard from '@/components/BalanceCard';
import TransactionList from '@/components/TransactionList';

const Wallet = () => {
  const { balance, transactions } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Minha Carteira" showBackButton />
      
      <main className="flex-1 pb-20 p-4 space-y-4">
        <BalanceCard balance={balance} />
        
        <div className="space-y-3">
          <h3 className="font-semibold px-1">Transações Recentes</h3>
          <TransactionList transactions={transactions} />
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};

export default Wallet;

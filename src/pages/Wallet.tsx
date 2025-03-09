
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import BalanceCard from '@/components/BalanceCard';
import TransactionList from '@/components/TransactionList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Wallet = () => {
  const { wallet, transactions, filteredTransactions, setTransactionFilter, transactionFilter } = useApp();
  const [activeTab, setActiveTab] = useState<'cashback' | 'points'>('cashback');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'cashback' | 'points');
  };
  
  const handleFilterChange = (filter: string) => {
    setTransactionFilter(filter);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Minha Carteira" showBackButton />
      
      <main className="flex-1 pb-20 p-4 space-y-4">
        <Tabs defaultValue="cashback" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="cashback">Cashback</TabsTrigger>
            <TabsTrigger value="points">Pontos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cashback" className="mt-0">
            <BalanceCard 
              type="cashback" 
              value={wallet.cashback} 
              lastUpdate={wallet.lastUpdate} 
            />
          </TabsContent>
          
          <TabsContent value="points" className="mt-0">
            <BalanceCard 
              type="points" 
              value={wallet.points} 
              lastUpdate={wallet.lastUpdate} 
            />
          </TabsContent>
        </Tabs>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-semibold">Transações Recentes</h3>
            <select 
              value={transactionFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="text-sm bg-white border rounded p-1"
            >
              <option value="all">Todas</option>
              <option value="bonus_received">Bônus Recebido</option>
              <option value="bonus_pending">Bônus Pendente</option>
              <option value="bonus_expired">Bônus Expirado</option>
              <option value="purchase">Compras</option>
              <option value="refund">Reembolsos</option>
              <option value="transfer">Transferências</option>
            </select>
          </div>
          <TransactionList transactions={filteredTransactions} />
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};

export default Wallet;

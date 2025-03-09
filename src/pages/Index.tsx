
import React from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import BalanceCard from '@/components/BalanceCard';
import PromotionCarousel from '@/components/PromotionCarousel';
import ProductGrid from '@/components/ProductGrid';
import PartnersList from '@/components/PartnersList';
import Logo from '@/components/Logo';

const Index = () => {
  const { user, wallet, promotions, products, partners } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header showLogo showNotifications />
      
      <main className="flex-1 pb-20">
        <div className="p-4 bg-white shadow-sm">
          <div className="flex items-center mb-3">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full mr-3 border-2 border-brand-green"
            />
            <div>
              <p className="text-sm text-gray-500">Olá,</p>
              <h2 className="text-lg font-bold">{user.name}</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <BalanceCard 
              type="cashback" 
              value={wallet.cashback} 
              lastUpdate={wallet.lastUpdate}
              onPress={() => navigate('/wallet')}
            />
            <BalanceCard 
              type="points" 
              value={wallet.points} 
              lastUpdate={wallet.lastUpdate}
              onPress={() => navigate('/wallet')}
            />
          </div>
        </div>
        
        <div className="px-4 py-5 space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-3">Ofertas e promoções</h2>
            <PromotionCarousel promotions={promotions} />
          </section>
          
          <section>
            <ProductGrid 
              products={products} 
              showMoreLink 
              title="Produtos populares" 
            />
          </section>
          
          <section>
            <PartnersList 
              partners={partners} 
              showMoreLink 
              title="Parceiros em destaque" 
            />
          </section>
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Search, UsersRound } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Partners = () => {
  const { partners } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [...new Set(partners.map(partner => partner.category))];
  
  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Parceiros" showBackButton />
      
      <main className="flex-1 pb-20 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10"
            placeholder="Buscar parceiros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {searchTerm === '' && (
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSearchTerm(category)}
                className="flex-shrink-0 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm hover:border-brand-green hover:text-brand-green transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {filteredPartners.map((partner) => (
            <Card 
              key={partner.id} 
              className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow"
              onClick={() => navigate(`/partner/${partner.id}`)}
            >
              <CardContent className="p-3 flex flex-col items-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-16 h-16 object-contain mb-2"
                />
                <h3 className="font-semibold text-sm text-center">{partner.name}</h3>
                <Badge className="mt-1 bg-brand-green">
                  {partner.cashbackPercentage}% cashback
                </Badge>
                <p className="text-xs text-gray-500 mt-1">{partner.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredPartners.length === 0 && (
          <div className="text-center py-10">
            <UsersRound className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">Nenhum parceiro encontrado</p>
          </div>
        )}
      </main>
      
      <NavBar />
    </div>
  );
};

export default Partners;

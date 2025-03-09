
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Partners = () => {
  const { partners } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['Todos', ...new Set(partners.map(partner => partner.category))];
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Parceiros" showBackButton showNotifications />
      
      <main className="flex-1 p-4 pb-20">
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar parceiros..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex overflow-x-auto pb-2 mb-4 -mx-1 px-1">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 mr-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-brand-green text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPartners.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Nenhum parceiro encontrado
            </div>
          ) : (
            filteredPartners.map((partner) => (
              <Card 
                key={partner.id} 
                className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/partner/${partner.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{partner.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-1.5">{partner.description}</p>
                      <Badge className="bg-brand-green">
                        {partner.cashbackPercentage}% cashback
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};

export default Partners;

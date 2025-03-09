
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Store = () => {
  const { products, addToCart } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Loja" showBackButton showNotifications />
      
      <main className="flex-1 p-4 pb-20">
        <div className="flex mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Buscar produtos..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="ml-2" onClick={() => {}}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start p-1 h-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Todos' : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-gray-500">
              Nenhum produto encontrado
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden border-none shadow-md"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-32 object-cover"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    {!product.inStock && (
                      <Badge className="absolute top-2 right-2 bg-red-500">Esgotado</Badge>
                    )}
                  </div>
                  <div className="p-3" onClick={() => navigate(`/product/${product.id}`)}>
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-1">{product.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between items-center">
                  <div>
                    <div className="text-brand-green font-bold text-sm">
                      {formatCurrency(product.price.cashback)}
                    </div>
                    <div className="text-brand-orange font-bold text-sm">
                      {product.price.points} pts
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product, 1, 'cashback')}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};

export default Store;

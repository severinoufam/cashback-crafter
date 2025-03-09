
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Minus, Plus, Share } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState<'cashback' | 'points'>('cashback');
  
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Produto não encontrado</h1>
        <Button onClick={() => navigate('/store')}>Voltar para loja</Button>
      </div>
    );
  }
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedCurrency);
  };
  
  const handleShare = () => {
    navigator.share?.({
      title: product.name,
      text: product.description,
      url: window.location.href,
    }).catch(() => {
      toast({
        title: 'Compartilhamento',
        description: 'O link do produto foi copiado para a área de transferência.'
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title={product.name} showBackButton showNotifications />
      
      <main className="flex-1 pb-20">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/80 backdrop-blur-sm"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
          
          {!product.inStock && (
            <Badge className="absolute top-4 left-4 bg-red-500">Esgotado</Badge>
          )}
        </div>
        
        <Card className="mx-4 -mt-6 z-10 relative border-none shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-bold">{product.name}</h1>
              <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.rating.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between">
              <div>
                <div className="text-brand-green font-bold text-xl">
                  {formatCurrency(product.price.cashback)}
                </div>
                <div className="text-brand-orange font-bold">
                  ou {product.price.points} pontos
                </div>
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-3 font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="p-4 mt-4">
          <Tabs defaultValue="description">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">Descrição</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Detalhes</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-2">
              <p className="text-gray-700">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="p-2">
              <ul className="text-gray-700 space-y-2">
                <li><span className="font-medium">Categoria:</span> {product.category}</li>
                <li><span className="font-medium">Disponibilidade:</span> {product.inStock ? 'Em estoque' : 'Fora de estoque'}</li>
                <li><span className="font-medium">ID do produto:</span> {product.id}</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <div className="fixed bottom-16 left-0 right-0 bg-white p-4 shadow-md flex justify-between items-center">
        <div className="flex-1">
          <Tabs defaultValue="cashback" onValueChange={(value) => setSelectedCurrency(value as 'cashback' | 'points')}>
            <TabsList className="w-full">
              <TabsTrigger value="cashback" className="flex-1">Cashback</TabsTrigger>
              <TabsTrigger value="points" className="flex-1">Pontos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button 
          className="ml-4 bg-brand-green hover:bg-brand-green-dark"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>
      
      <NavBar />
    </div>
  );
};

export default ProductDetail;

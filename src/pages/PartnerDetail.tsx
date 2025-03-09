
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';

const PartnerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPartnerById, transferToPartner, wallet } = useApp();
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'cashback' | 'points'>('cashback');
  
  const partner = getPartnerById(id || '');
  
  if (!partner) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Parceiro não encontrado</h1>
        <Button onClick={() => navigate('/partners')}>Voltar para parceiros</Button>
      </div>
    );
  }
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };
  
  const handleTransfer = () => {
    const numericAmount = parseFloat(amount);
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        title: 'Valor inválido',
        description: 'Por favor, insira um valor válido.',
        variant: 'destructive'
      });
      return;
    }
    
    transferToPartner(partner.id, numericAmount, selectedCurrency);
    setAmount('');
  };
  
  const handleShare = () => {
    navigator.share?.({
      title: partner.name,
      text: partner.description,
      url: window.location.href,
    }).catch(() => {
      toast({
        title: 'Compartilhamento',
        description: 'O link do parceiro foi copiado para a área de transferência.'
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title={partner.name} showBackButton showNotifications />
      
      <main className="flex-1 pb-20">
        <div className="p-4 bg-white shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="w-20 h-20 object-contain mr-4"
            />
            <div>
              <h1 className="text-xl font-bold">{partner.name}</h1>
              <Badge className="mt-1 bg-brand-green">
                {partner.cashbackPercentage}% cashback
              </Badge>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <Card className="mb-6 border-none shadow-md">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold mb-2">Sobre {partner.name}</h2>
              <p className="text-gray-700">{partner.description}</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold mb-4">Transferir para {partner.name}</h2>
              
              <div className="space-y-4">
                <Tabs 
                  defaultValue="cashback" 
                  onValueChange={(value) => setSelectedCurrency(value as 'cashback' | 'points')}
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="cashback" className="flex-1">
                      Cashback ({formatCurrency(wallet.cashback)})
                    </TabsTrigger>
                    <TabsTrigger value="points" className="flex-1">
                      Pontos ({wallet.points})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Valor a transferir
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {selectedCurrency === 'cashback' ? 'R$' : ''}
                    </div>
                    <Input
                      id="amount"
                      type="text"
                      placeholder={selectedCurrency === 'cashback' ? '0,00' : '0'}
                      className={selectedCurrency === 'cashback' ? 'pl-9' : ''}
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-brand-green hover:bg-brand-green-dark"
                  onClick={handleTransfer}
                  disabled={!amount || parseFloat(amount) <= 0}
                >
                  Transferir
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <NavBar />
    </div>
  );
};

export default PartnerDetail;

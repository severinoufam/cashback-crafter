
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Receipt, CheckCircle } from 'lucide-react';

const BillDiscount = () => {
  const { wallet, requestBillDiscount } = useApp();
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'cashback' | 'points'>('cashback');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const numericAmount = Number(amount);
    if (numericAmount > 0) {
      requestBillDiscount(numericAmount, currency);
      setSubmitted(true);
    }
  };

  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimals
    if (/^(\d+)?(\.\d{0,2})?$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Desconto na Fatura" showBackButton />
      
      <main className="flex-1 pb-20 p-4">
        {submitted ? (
          <Card className="text-center p-8">
            <CardContent className="p-0 flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-brand-green mb-4" />
              <h2 className="text-xl font-bold mb-2">Desconto solicitado!</h2>
              <p className="text-gray-600 mb-6">
                O desconto foi solicitado com sucesso e será aplicado na sua próxima fatura.
              </p>
              <Button onClick={() => setSubmitted(false)}>
                Nova solicitação
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <Receipt className="h-6 w-6 text-brand-green" />
                <h2 className="text-lg font-semibold">Desconto na Fatura</h2>
              </div>
              
              <p className="text-sm text-gray-600">
                Utilize seu saldo de cashback ou pontos para obter descontos na sua próxima fatura.
              </p>
              
              <div className="p-3 bg-gray-100 rounded-md">
                <p className="text-sm font-medium">Saldo disponível:</p>
                <div className="flex justify-between mt-1">
                  <span className="text-brand-green font-bold">
                    {formatCurrency(wallet.cashback)}
                  </span>
                  <span className="text-brand-orange font-bold">
                    {wallet.points} pts
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Escolha o tipo de saldo</Label>
                <RadioGroup
                  value={currency}
                  onValueChange={(value: 'cashback' | 'points') => setCurrency(value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cashback" id="cashback" />
                    <Label htmlFor="cashback" className="cursor-pointer">Cashback</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="points" id="points" />
                    <Label htmlFor="points" className="cursor-pointer">Pontos</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder={`Digite o valor em ${currency === 'cashback' ? 'R$' : 'pontos'}`}
                  className="text-lg"
                />
                {currency === 'cashback' && amount && (
                  <p className="text-xs text-gray-500">
                    Você está solicitando um desconto de {formatCurrency(Number(amount))} na sua fatura.
                  </p>
                )}
                {currency === 'points' && amount && (
                  <p className="text-xs text-gray-500">
                    Você está solicitando um desconto de {Number(amount)} pontos na sua fatura.
                  </p>
                )}
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleSubmit}
                disabled={!amount || Number(amount) <= 0 || (currency === 'cashback' && Number(amount) > wallet.cashback) || (currency === 'points' && Number(amount) > wallet.points)}
              >
                Solicitar desconto
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                O desconto será aplicado na sua próxima fatura.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      
      <NavBar />
    </div>
  );
};

export default BillDiscount;

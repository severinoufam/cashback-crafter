
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt, CheckCircle } from 'lucide-react';

const SecondReceipt = () => {
  const { transactions, requestSecondReceipt } = useApp();
  const [selectedTransaction, setSelectedTransaction] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedTransaction) {
      requestSecondReceipt(selectedTransaction);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Segunda Via" showBackButton />
      
      <main className="flex-1 pb-20 p-4">
        {submitted ? (
          <Card className="text-center p-8">
            <CardContent className="p-0 flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-brand-green mb-4" />
              <h2 className="text-xl font-bold mb-2">Solicitação enviada!</h2>
              <p className="text-gray-600 mb-6">
                A segunda via do comprovante foi enviada para o seu e-mail cadastrado.
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
                <h2 className="text-lg font-semibold">Solicitar 2ª Via de Comprovante</h2>
              </div>
              
              <p className="text-sm text-gray-600">
                Selecione a transação da qual você deseja receber a segunda via do comprovante:
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="transaction">Transação</Label>
                <Select 
                  value={selectedTransaction} 
                  onValueChange={setSelectedTransaction}
                >
                  <SelectTrigger id="transaction">
                    <SelectValue placeholder="Selecione uma transação" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactions.map((transaction) => (
                      <SelectItem key={transaction.id} value={transaction.id}>
                        {transaction.description} - {transaction.amount} {transaction.currency === 'cashback' ? 'R$' : 'pts'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleSubmit}
                disabled={!selectedTransaction}
              >
                Solicitar comprovante
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                O comprovante será enviado para o e-mail cadastrado na sua conta.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      
      <NavBar />
    </div>
  );
};

export default SecondReceipt;

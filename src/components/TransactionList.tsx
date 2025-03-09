
import React from 'react';
import { TransactionType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Clock, ReceiptText, RefreshCcw, ArrowRightLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface TransactionListProps {
  transactions: TransactionType[];
  showMoreLink?: boolean;
  title?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  showMoreLink = false, 
  title 
}) => {
  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'bonus_received':
        return <ArrowDownLeft className="text-green-500" />;
      case 'bonus_pending':
        return <Clock className="text-yellow-500" />;
      case 'bonus_expired':
        return <Clock className="text-red-500" />;
      case 'purchase':
        return <ArrowUpRight className="text-red-500" />;
      case 'refund':
        return <RefreshCcw className="text-green-500" />;
      case 'transfer':
        return <ArrowRightLeft className="text-blue-500" />;
      default:
        return <ReceiptText />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch(type) {
      case 'bonus_received':
      case 'refund':
        return 'text-green-600';
      case 'bonus_pending':
        return 'text-yellow-600';
      case 'bonus_expired':
      case 'purchase':
      case 'transfer':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500">Concluído</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Falhou</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500">Expirado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma transação encontrada
          </div>
        ) : (
          transactions.map((transaction) => (
            <Card key={transaction.id} className="overflow-hidden border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-gray-100 rounded-full">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium line-clamp-1">{transaction.description}</h3>
                        <div className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className={`font-bold ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'purchase' || transaction.type === 'transfer' || transaction.type === 'bonus_expired' ? '-' : '+'}
                          {transaction.currency === 'cashback' 
                            ? formatCurrency(transaction.amount)
                            : `${transaction.amount} pts`
                          }
                        </span>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {showMoreLink && transactions.length > 0 && (
        <div className="flex justify-center">
          <button className="text-brand-green font-medium">
            Ver mais transações
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;


import React from 'react';
import { WalletIcon, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface BalanceCardProps {
  type: 'cashback' | 'points';
  value: number;
  lastUpdate: string;
  onPress?: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ type, value, lastUpdate, onPress }) => {
  const formattedValue = type === 'cashback' ? formatCurrency(value) : value.toLocaleString();
  const cardClass = type === 'cashback' ? 'wallet-card' : 'points-card';
  const icon = type === 'cashback' ? <WalletIcon className="h-8 w-8" /> : <CreditCard className="h-8 w-8" />;
  const formattedDate = new Date(lastUpdate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      className={`${cardClass} p-4 text-white rounded-xl shadow-lg min-h-[150px] relative overflow-hidden`}
      onClick={onPress}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="font-bold text-lg capitalize">
          {type === 'cashback' ? 'Cashback' : 'Pontos'}
        </div>
        {icon}
      </div>
      
      <div className="text-3xl font-bold mb-2 animate-pulse-light">
        {formattedValue}
        {type === 'cashback' && <span className="text-sm ml-1">BRL</span>}
        {type === 'points' && <span className="text-sm ml-1">pts</span>}
      </div>
      
      <div className="text-xs opacity-80">
        Atualizado em: {formattedDate}
      </div>
      
      <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-white/10"></div>
      <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-white/10"></div>
    </div>
  );
};

export default BalanceCard;

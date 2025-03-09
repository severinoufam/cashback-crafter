
import React from 'react';
import { Order } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { packageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';

interface OrderListProps {
  orders: Order[];
  showMoreLink?: boolean;
  title?: string;
}

const OrderList: React.FC<OrderListProps> = ({ 
  orders, 
  showMoreLink = false, 
  title 
}) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processando</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500">Enviado</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Entregue</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      
      <div className="space-y-3">
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum pedido encontrado
          </div>
        ) : (
          orders.map((order) => (
            <Card 
              key={order.id} 
              className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Pedido #{order.id}</h3>
                    <div className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                      })}
                    </div>
                    <div className="mt-1">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-brand-green">
                      {order.total.cashback > 0 && formatCurrency(order.total.cashback)}
                    </div>
                    <div className="font-bold text-brand-orange">
                      {order.total.points > 0 && `${order.total.points.toLocaleString()} pts`}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {order.products.length} {order.products.length === 1 ? 'item' : 'itens'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {showMoreLink && orders.length > 0 && (
        <div className="flex justify-center">
          <button 
            className="text-brand-green font-medium"
            onClick={() => navigate('/orders')}
          >
            Ver todos pedidos
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;

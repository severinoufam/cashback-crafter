
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PackageIcon, Alert, Check, Truck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, getProductById } = useApp();
  const navigate = useNavigate();
  
  const order = getOrderById(orderId || '');
  
  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header title="Detalhes do Pedido" showBackButton />
        <main className="flex-1 pb-20 p-4 flex items-center justify-center">
          <div className="text-center">
            <Alert className="mx-auto h-12 w-12 text-red-500" />
            <p className="mt-4 text-gray-500">Pedido não encontrado</p>
            <Button 
              variant="link" 
              onClick={() => navigate('/orders')} 
              className="mt-2"
            >
              Voltar para meus pedidos
            </Button>
          </div>
        </main>
        <NavBar />
      </div>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'processing': return 'Em processamento';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Alert className="h-4 w-4" />;
      case 'processing': return <PackageIcon className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <Check className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Detalhes do Pedido" showBackButton />
      
      <main className="flex-1 pb-20 p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{order.id}</h3>
              <Badge className={`${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-500">
              Pedido realizado em {format(new Date(order.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
            
            {order.trackingNumber && (
              <p className="text-sm text-gray-500 mt-1">
                Código de rastreio: {order.trackingNumber}
              </p>
            )}
          </CardContent>
        </Card>
        
        <div className="space-y-3">
          <h3 className="font-semibold px-1">Produtos</h3>
          {order.products.map((item) => {
            const product = getProductById(item.productId);
            return (
              <Card key={item.productId} className="overflow-hidden">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={product?.image} 
                      alt={product?.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{product?.name}</h4>
                    <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                    <div className="flex space-x-2 mt-1">
                      {item.price.cashback > 0 && (
                        <p className="text-sm font-semibold text-brand-green">
                          {formatCurrency(item.price.cashback)}
                        </p>
                      )}
                      {item.price.points > 0 && (
                        <p className="text-sm font-semibold text-brand-orange">
                          {item.price.points} pts
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Resumo</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Subtotal:</span>
                <div className="text-right">
                  {order.total.cashback > 0 && (
                    <p className="text-sm font-semibold text-brand-green">
                      {formatCurrency(order.total.cashback)}
                    </p>
                  )}
                  {order.total.points > 0 && (
                    <p className="text-sm font-semibold text-brand-orange">
                      {order.total.points} pts
                    </p>
                  )}
                </div>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-semibold">Total:</span>
                <div className="text-right">
                  {order.total.cashback > 0 && (
                    <p className="font-semibold text-brand-green">
                      {formatCurrency(order.total.cashback)}
                    </p>
                  )}
                  {order.total.points > 0 && (
                    <p className="font-semibold text-brand-orange">
                      {order.total.points} pts
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {order.trackingEvents && (
          <div className="space-y-3">
            <h3 className="font-semibold px-1">Histórico de Rastreamento</h3>
            {order.trackingEvents.map((event, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4 flex">
                  <div className="mr-3">
                    <div className={`h-8 w-8 rounded-full ${getStatusColor(event.status)} text-white flex items-center justify-center`}>
                      {getStatusIcon(event.status)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.description}</h4>
                    <p className="text-xs text-gray-500">
                      {format(new Date(event.date), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                    </p>
                    {event.location && (
                      <p className="text-xs text-gray-500">
                        Localização: {event.location}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate('/second-receipt')}
        >
          Solicitar 2ª via do comprovante
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </main>
      
      <NavBar />
    </div>
  );
};

export default OrderDetail;

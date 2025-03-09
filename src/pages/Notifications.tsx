
import React from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, TicketPercent, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Notifications = () => {
  const { notifications, readNotification, readAllNotifications, unreadNotifications } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Notificações" showBackButton />
      
      <main className="flex-1 pb-20">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Suas notificações 
            {unreadNotifications > 0 && (
              <Badge className="ml-2 bg-brand-orange">
                {unreadNotifications} não lidas
              </Badge>
            )}
          </h2>
          
          {unreadNotifications > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => readAllNotifications()}
              className="text-sm text-brand-green"
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        
        <div className="px-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-10">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-500">Você não tem notificações</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`overflow-hidden border-l-4 ${
                  notification.read 
                    ? 'border-l-gray-300 bg-white' 
                    : 'border-l-brand-green bg-green-50'
                }`}
                onClick={() => !notification.read && readNotification(notification.id)}
              >
                <CardContent className="p-4 flex">
                  <div className="mr-3">
                    {notification.type === 'promo' ? (
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <TicketPercent className="h-5 w-5 text-brand-orange" />
                      </div>
                    ) : notification.type === 'system' ? (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-brand-green" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${!notification.read ? 'text-brand-green' : ''}`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {format(new Date(notification.date), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                    </p>
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

export default Notifications;


import React from 'react';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare, MapPin, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const { user } = useApp();

  const handleContactMethod = (method: string) => {
    toast({
      title: "Contato",
      description: `Iniciando contato via ${method}`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Contato" showBackButton />
      
      <main className="flex-1 pb-20 p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">Entre em contato conosco</h2>
            <p className="text-sm text-gray-600 mb-4">
              Estamos à disposição para atender suas dúvidas, sugestões ou reclamações.
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full flex justify-start" 
                onClick={() => handleContactMethod('telefone')}
              >
                <Phone className="h-4 w-4 mr-2" />
                0800 123 4567
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex justify-start" 
                onClick={() => handleContactMethod('e-mail')}
              >
                <Mail className="h-4 w-4 mr-2" />
                contato@cashbackcrafter.com
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex justify-start" 
                onClick={() => handleContactMethod('chat')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat online
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">Horário de atendimento</h2>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-brand-green mt-0.5" />
              <div>
                <p className="text-sm font-medium">Segunda a sexta-feira:</p>
                <p className="text-sm text-gray-600">08:00 às 20:00</p>
                <p className="text-sm font-medium mt-2">Sábados:</p>
                <p className="text-sm text-gray-600">09:00 às 15:00</p>
                <p className="text-sm font-medium mt-2">Domingos e feriados:</p>
                <p className="text-sm text-gray-600">Fechado</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">Endereço</h2>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-brand-green mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">
                  Av. Paulista, 1000, Bela Vista<br />
                  São Paulo - SP, 01310-100<br />
                  Brasil
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <NavBar />
    </div>
  );
};

export default Contact;

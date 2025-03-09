
import React from 'react';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText } from 'lucide-react';

const Regulations = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Regulamento" showBackButton />
      
      <main className="flex-1 pb-20 p-4 space-y-4">
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-brand-green" />
              <h2 className="text-lg font-semibold">Regulamento CashBack Crafter</h2>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Aqui você encontra as regras e condições para o programa de cashback e pontos.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  1. O que é o programa CashBack Crafter?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    O programa CashBack Crafter é um programa de benefícios que permite aos clientes 
                    acumular cashback e pontos em compras realizadas em parceiros credenciados, 
                    além de oferecer a possibilidade de troca desses benefícios por produtos, 
                    serviços e descontos na fatura.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  2. Como funciona o cashback?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    O cashback é calculado como um percentual do valor da compra realizada em 
                    parceiros credenciados. O percentual varia de acordo com o parceiro e 
                    eventuais promoções vigentes. O valor do cashback é creditado na carteira 
                    digital do cliente em até 30 dias após a compra, podendo ser utilizado para 
                    aquisição de produtos, serviços ou como desconto na fatura.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  3. Como acumular pontos?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    Os pontos são concedidos com base em promoções específicas, uso do cartão 
                    em certas categorias de estabelecimentos ou como parte de ações promocionais. 
                    Os pontos também podem ser obtidos através de ações de engajamento, como 
                    indicação de amigos, participação em pesquisas e outras atividades dentro 
                    do aplicativo.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  4. Validade do cashback e pontos
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    O cashback acumulado tem validade de 12 meses a partir da data de crédito na 
                    carteira digital. Os pontos têm validade de 6 meses a partir da data de crédito. 
                    Após esse período, o saldo não utilizado expira automaticamente.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  5. Resgate de benefícios
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    O resgate de cashback e pontos pode ser feito diretamente no aplicativo 
                    CashBack Crafter, na seção "Loja" para produtos e serviços, ou na seção 
                    "Desconto na Fatura" para aplicação do valor como crédito na próxima fatura. 
                    O cliente também pode transferir o valor para parceiros específicos nas 
                    condições estabelecidas no aplicativo.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  6. Cancelamento de compras e estornos
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    Em caso de cancelamento da compra ou estorno, o valor do cashback ou pontos 
                    correspondente será debitado da carteira digital do cliente. Caso o saldo 
                    não seja suficiente, o valor poderá ser descontado de futuros créditos ou 
                    cobrado na fatura, a critério da administradora.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">
                  7. Alterações no programa
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    A administradora reserva-se o direito de alterar as regras, condições e 
                    percentuais de cashback e conversão de pontos a qualquer momento, 
                    mediante comunicação prévia aos clientes através do aplicativo, 
                    e-mail ou outros canais de comunicação.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">
                  8. Encerramento da participação
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">
                    Em caso de fraude comprovada, mau uso ou descumprimento dos termos deste 
                    regulamento, a administradora poderá suspender ou encerrar a participação 
                    do cliente no programa, com o consequente cancelamento do saldo acumulado, 
                    sem necessidade de aviso prévio.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Última atualização: 01/03/2023
            </p>
          </CardContent>
        </Card>
      </main>
      
      <NavBar />
    </div>
  );
};

export default Regulations;

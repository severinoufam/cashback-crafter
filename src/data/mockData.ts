
import { User, Notification, Promotion, Partner, Product, TransactionType, Order, Wallet } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Carlos Silva',
  avatar: 'https://i.pravatar.cc/150?img=8',
  email: 'carlos.silva@example.com',
  phone: '+55 (11) 98765-4321'
};

export const mockWallet: Wallet = {
  cashback: 157.25,
  points: 3420,
  lastUpdate: new Date().toISOString()
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Cashback recebido!',
    message: 'Você recebeu R$ 12,50 de cashback da sua última compra na Loja ABC.',
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    type: 'transaction'
  },
  {
    id: '2',
    title: 'Oferta especial!',
    message: 'Aproveite 10% extra de cashback em todos os parceiros este final de semana!',
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    type: 'promo'
  },
  {
    id: '3',
    title: 'Seus pontos vencem em breve',
    message: '1500 pontos vão expirar em 7 dias. Use-os antes que expire!',
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    type: 'system'
  },
  {
    id: '4',
    title: 'Pedido enviado',
    message: 'Seu pedido #12345 foi enviado e está a caminho!',
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    type: 'transaction'
  }
];

export const mockPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Pacote de Internet 10GB',
    description: 'Adquira um pacote de 10GB por apenas R$ 30,00 em cashback!',
    image: 'https://img.freepik.com/free-vector/5g-network-wireless-technology-background_1017-30381.jpg',
    url: '/loja/internet-10gb',
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString() // 7 days from now
  },
  {
    id: '2',
    title: 'Pacote Ilimitado',
    description: 'Internet ilimitada por 30 dias por apenas 2000 pontos!',
    image: 'https://img.freepik.com/free-vector/abstract-technology-particle-wave-network-background_1017-28407.jpg',
    url: '/loja/internet-ilimitada',
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString() // 10 days from now
  },
  {
    id: '3',
    title: 'Combo Chamadas + 5GB',
    description: 'Chamadas ilimitadas + 5GB de internet por apenas R$ 20,00 de cashback',
    image: 'https://img.freepik.com/free-vector/futuristic-network-technology_23-2147514522.jpg',
    url: '/loja/combo-chamadas-internet',
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days from now
  }
];

export const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'SuperMercado Extra',
    logo: 'https://logodownload.org/wp-content/uploads/2014/12/extra-logo-1.png',
    description: 'A maior rede de supermercados do Brasil',
    cashbackPercentage: 3,
    category: 'Supermercados'
  },
  {
    id: '2',
    name: 'Posto Shell',
    logo: 'https://logodownload.org/wp-content/uploads/2014/07/shell-logo-1.png',
    description: 'Combustível de qualidade com cashback',
    cashbackPercentage: 2,
    category: 'Combustível'
  },
  {
    id: '3',
    name: 'Drogarias Pacheco',
    logo: 'https://logodownload.org/wp-content/uploads/2017/10/drogarias-pacheco-logo.png',
    description: 'Sua farmácia com os melhores preços',
    cashbackPercentage: 5,
    category: 'Farmácia'
  },
  {
    id: '4',
    name: 'Lojas Americanas',
    logo: 'https://logodownload.org/wp-content/uploads/2014/12/americanas-logo-1.png',
    description: 'De tudo um pouco para você',
    cashbackPercentage: 4,
    category: 'Varejo'
  },
  {
    id: '5',
    name: 'Burger King',
    logo: 'https://logodownload.org/wp-content/uploads/2014/07/burger-king-logo-1.png',
    description: 'Lanches deliciosos com cashback',
    cashbackPercentage: 10,
    category: 'Alimentação'
  },
  {
    id: '6',
    name: 'Cinemark',
    logo: 'https://logodownload.org/wp-content/uploads/2018/07/cinemark-logo.png',
    description: 'Cinema com conforto e cashback',
    cashbackPercentage: 8,
    category: 'Entretenimento'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pacote 5GB Internet',
    description: 'Pacote de dados de 5GB válido por 30 dias',
    price: {
      cashback: 15,
      points: 1000
    },
    image: 'https://img.freepik.com/free-vector/5g-network-wireless-technology-background_1017-30381.jpg',
    category: 'Internet',
    rating: 4.5,
    inStock: true
  },
  {
    id: '2',
    name: 'Pacote 10GB Internet',
    description: 'Pacote de dados de 10GB válido por 30 dias',
    price: {
      cashback: 25,
      points: 2000
    },
    image: 'https://img.freepik.com/free-vector/abstract-technology-communication-concept_23-2148892739.jpg',
    category: 'Internet',
    rating: 4.8,
    inStock: true
  },
  {
    id: '3',
    name: 'Pacote Ilimitado',
    description: 'Internet ilimitada por 30 dias',
    price: {
      cashback: 40,
      points: 3000
    },
    image: 'https://img.freepik.com/free-vector/futuristic-network-technology_23-2147514522.jpg',
    category: 'Internet',
    rating: 5.0,
    inStock: true
  },
  {
    id: '4',
    name: 'Pacote Chamadas',
    description: 'Chamadas ilimitadas para qualquer operadora por 30 dias',
    price: {
      cashback: 20,
      points: 1500
    },
    image: 'https://img.freepik.com/free-vector/customer-service-concept_52683-9065.jpg',
    category: 'Chamadas',
    rating: 4.2,
    inStock: true
  },
  {
    id: '5',
    name: 'Combo Familiar',
    description: 'Internet + Chamadas para toda família (até 5 linhas)',
    price: {
      cashback: 100,
      points: 8000
    },
    image: 'https://img.freepik.com/free-vector/family-video-calling-with-tablet_23-2148626845.jpg',
    category: 'Combo',
    rating: 4.9,
    inStock: true
  },
  {
    id: '6',
    name: 'Camiseta Logo App',
    description: 'Camiseta oficial com logo do aplicativo',
    price: {
      cashback: 35,
      points: 3000
    },
    image: 'https://img.freepik.com/free-psd/isolated-white-t-shirt-front-view_125540-1194.jpg',
    category: 'Produtos',
    rating: 4.6,
    inStock: true
  },
  {
    id: '7',
    name: 'Powerbank 10000mAh',
    description: 'Carregador portátil de 10000mAh com logo do app',
    price: {
      cashback: 45,
      points: 4000
    },
    image: 'https://img.freepik.com/free-psd/power-bank-mockup_439185-307.jpg',
    category: 'Produtos',
    rating: 4.7,
    inStock: false
  },
  {
    id: '8',
    name: 'Fone de Ouvido Bluetooth',
    description: 'Fone de ouvido sem fio com qualidade premium',
    price: {
      cashback: 70,
      points: 6000
    },
    image: 'https://img.freepik.com/free-psd/headphones-mockup_1310-495.jpg',
    category: 'Produtos',
    rating: 4.4,
    inStock: true
  }
];

export const mockTransactions: TransactionType[] = [
  {
    id: '1',
    type: 'bonus_received',
    amount: 12.5,
    currency: 'cashback',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    description: 'Cashback da compra na Lojas Americanas',
    status: 'completed',
    partnerId: '4'
  },
  {
    id: '2',
    type: 'purchase',
    amount: 25,
    currency: 'cashback',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    description: 'Compra do Pacote 10GB Internet',
    status: 'completed',
    productId: '2'
  },
  {
    id: '3',
    type: 'bonus_pending',
    amount: 5,
    currency: 'cashback',
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    description: 'Cashback pendente do Posto Shell',
    status: 'pending',
    partnerId: '2'
  },
  {
    id: '4',
    type: 'bonus_received',
    amount: 200,
    currency: 'points',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    description: 'Pontos do programa de fidelidade',
    status: 'completed'
  },
  {
    id: '5',
    type: 'bonus_expired',
    amount: 50,
    currency: 'points',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    description: 'Pontos expirados',
    status: 'expired'
  },
  {
    id: '6',
    type: 'purchase',
    amount: 1500,
    currency: 'points',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    description: 'Compra do Pacote Chamadas',
    status: 'completed',
    productId: '4'
  },
  {
    id: '7',
    type: 'refund',
    amount: 15,
    currency: 'cashback',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    description: 'Estorno da compra do Pacote 5GB Internet',
    status: 'completed',
    productId: '1'
  },
  {
    id: '8',
    type: 'transfer',
    amount: 10,
    currency: 'cashback',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20 days ago
    description: 'Transferência para desconto na fatura',
    status: 'completed'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-1234',
    products: [
      {
        productId: '2',
        quantity: 1,
        price: {
          cashback: 25,
          points: 2000
        }
      }
    ],
    total: {
      cashback: 25,
      points: 0
    },
    status: 'delivered',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    trackingNumber: 'BR1234567890',
    trackingEvents: [
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        status: 'delivered',
        description: 'Pedido entregue com sucesso',
        location: 'São Paulo - SP'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 12).toISOString(),
        status: 'shipped',
        description: 'Pedido em rota de entrega',
        location: 'São Paulo - SP'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
        status: 'processing',
        description: 'Pedido está sendo processado',
        location: 'Centro de Distribuição'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        status: 'pending',
        description: 'Pagamento confirmado',
        location: 'Sistema'
      }
    ]
  },
  {
    id: 'ORD-5678',
    products: [
      {
        productId: '6',
        quantity: 1,
        price: {
          cashback: 0,
          points: 3000
        }
      }
    ],
    total: {
      cashback: 0,
      points: 3000
    },
    status: 'shipped',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    trackingNumber: 'BR9876543210',
    trackingEvents: [
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        status: 'shipped',
        description: 'Pedido enviado',
        location: 'Centro de Distribuição'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        status: 'processing',
        description: 'Pedido está sendo processado',
        location: 'Centro de Distribuição'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1 - 1000 * 60 * 60 * 2).toISOString(),
        status: 'pending',
        description: 'Pagamento confirmado',
        location: 'Sistema'
      }
    ]
  },
  {
    id: 'ORD-9012',
    products: [
      {
        productId: '8',
        quantity: 1,
        price: {
          cashback: 70,
          points: 0
        }
      }
    ],
    total: {
      cashback: 70,
      points: 0
    },
    status: 'processing',
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    trackingEvents: [
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        status: 'processing',
        description: 'Pedido está sendo processado',
        location: 'Centro de Distribuição'
      },
      {
        date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        status: 'pending',
        description: 'Pagamento confirmado',
        location: 'Sistema'
      }
    ]
  }
];

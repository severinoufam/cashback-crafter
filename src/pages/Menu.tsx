
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { 
  Home, Store, UsersRound, WalletIcon, ShoppingBag, 
  Receipt, FileText, Phone, LogOut, User, Bell
} from 'lucide-react';
import Logo from '@/components/Logo';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MenuOption = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button 
    className="flex items-center space-x-3 p-3 w-full hover:bg-gray-100 rounded-md transition-colors"
    onClick={onClick}
  >
    <div className="text-gray-600">{icon}</div>
    <span className="font-medium">{label}</span>
  </button>
);

const Menu = () => {
  const { user, unreadNotifications } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "Você seria desconectado em um app real",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Menu" showBackButton />
      
      <main className="flex-1 pb-20 p-4 space-y-6">
        <div className="flex items-center space-x-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
          <Avatar className="h-16 w-16 border-2 border-brand-green">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-3 bg-brand-green">
            <Logo size="small" />
          </div>
          
          <div className="p-2 space-y-1">
            <MenuOption 
              icon={<Home size={20} />} 
              label="Início" 
              onClick={() => navigate('/')} 
            />
            <MenuOption 
              icon={<Store size={20} />} 
              label="Loja" 
              onClick={() => navigate('/store')} 
            />
            <MenuOption 
              icon={<UsersRound size={20} />} 
              label="Parceiros" 
              onClick={() => navigate('/partners')} 
            />
            <MenuOption 
              icon={<WalletIcon size={20} />} 
              label="Carteira" 
              onClick={() => navigate('/wallet')} 
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-2 space-y-1">
          <MenuOption 
            icon={<Bell size={20} />} 
            label={`Notificações ${unreadNotifications > 0 ? `(${unreadNotifications})` : ''}`} 
            onClick={() => navigate('/notifications')} 
          />
          <MenuOption 
            icon={<ShoppingBag size={20} />} 
            label="Meus Pedidos" 
            onClick={() => navigate('/orders')} 
          />
          <MenuOption 
            icon={<Receipt size={20} />} 
            label="Segunda Via" 
            onClick={() => navigate('/second-receipt')} 
          />
          <MenuOption 
            icon={<Receipt size={20} />} 
            label="Desconto na Fatura" 
            onClick={() => navigate('/bill-discount')} 
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-2 space-y-1">
          <MenuOption 
            icon={<User size={20} />} 
            label="Meu Perfil" 
            onClick={() => navigate('/profile')} 
          />
          <MenuOption 
            icon={<Phone size={20} />} 
            label="Contato" 
            onClick={() => navigate('/contact')} 
          />
          <MenuOption 
            icon={<FileText size={20} />} 
            label="Regulamento" 
            onClick={() => navigate('/regulations')} 
          />
        </div>
        
        <button 
          className="flex items-center space-x-2 p-3 w-full text-red-600 justify-center mt-6"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </main>
      
      <NavBar />
    </div>
  );
};

export default Menu;

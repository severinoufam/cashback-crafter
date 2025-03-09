
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Store, UsersRound, WalletIcon, ClockIcon, PackageIcon, Receipt, FileText, HelpCircle, BellIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  const location = useLocation();
  const { unreadNotifications } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
      <div className="flex justify-around items-center p-2">
        <Link to="/" className="flex flex-col items-center">
          <Button 
            variant={location.pathname === '/' ? 'default' : 'ghost'} 
            size="icon" 
            className={location.pathname === '/' ? 'bg-brand-green text-white' : 'text-gray-600'}
          >
            <HomeIcon size={24} />
          </Button>
          <span className="text-xs mt-1">Início</span>
        </Link>

        <Link to="/store" className="flex flex-col items-center">
          <Button 
            variant={location.pathname === '/store' ? 'default' : 'ghost'} 
            size="icon" 
            className={location.pathname === '/store' ? 'bg-brand-green text-white' : 'text-gray-600'}
          >
            <Store size={24} />
          </Button>
          <span className="text-xs mt-1">Loja</span>
        </Link>

        <Link to="/partners" className="flex flex-col items-center">
          <Button 
            variant={location.pathname === '/partners' ? 'default' : 'ghost'} 
            size="icon" 
            className={location.pathname === '/partners' ? 'bg-brand-green text-white' : 'text-gray-600'}
          >
            <UsersRound size={24} />
          </Button>
          <span className="text-xs mt-1">Parceiros</span>
        </Link>

        <Link to="/wallet" className="flex flex-col items-center">
          <Button 
            variant={location.pathname === '/wallet' ? 'default' : 'ghost'} 
            size="icon" 
            className={location.pathname === '/wallet' ? 'bg-brand-green text-white' : 'text-gray-600'}
          >
            <WalletIcon size={24} />
          </Button>
          <span className="text-xs mt-1">Carteira</span>
        </Link>

        <Link to="/menu" className="flex flex-col items-center">
          <Button 
            variant={location.pathname === '/menu' ? 'default' : 'ghost'} 
            size="icon" 
            className={location.pathname === '/menu' ? 'bg-brand-green text-white' : 'text-gray-600'}
          >
            <span className="relative">
              <div className="h-5 w-5 flex flex-col justify-between">
                <div className="h-0.5 w-5 bg-current rounded"></div>
                <div className="h-0.5 w-5 bg-current rounded"></div>
                <div className="h-0.5 w-5 bg-current rounded"></div>
              </div>
            </span>
          </Button>
          <span className="text-xs mt-1">Menu</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

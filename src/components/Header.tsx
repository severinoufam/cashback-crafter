
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import Logo from './Logo';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  showLogo = false,
  showNotifications = true 
}) => {
  const navigate = useNavigate();
  const { unreadNotifications } = useApp();

  return (
    <header className="sticky top-0 bg-white shadow-sm z-10 px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)}
              className="mr-2 p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {showLogo ? (
            <Logo size="small" />
          ) : (
            <h1 className="text-xl font-bold">{title}</h1>
          )}
        </div>
        
        {showNotifications && (
          <button 
            onClick={() => navigate('/notifications')}
            className="p-2 relative"
          >
            <BellIcon size={24} />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-brand-orange">
                {unreadNotifications}
              </Badge>
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

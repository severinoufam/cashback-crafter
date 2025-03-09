
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-20'
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <div className="relative">
        <div className="bg-brand-green rounded-full p-2">
          <div className="text-white font-bold flex items-center justify-center">
            <span className="text-2xl">CB</span>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 bg-brand-orange rounded-full p-1">
          <div className="w-3 h-3"></div>
        </div>
      </div>
      <div className="ml-2 font-bold text-brand-green">
        <span className={size === 'small' ? 'text-lg' : size === 'medium' ? 'text-xl' : 'text-3xl'}>
          CashBack
        </span>
        <span className={`text-brand-orange ${size === 'small' ? 'text-lg' : size === 'medium' ? 'text-xl' : 'text-3xl'}`}>
          Crafter
        </span>
      </div>
    </div>
  );
};

export default Logo;

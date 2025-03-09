
import React from 'react';
import { Partner } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface PartnersListProps {
  partners: Partner[];
  showMoreLink?: boolean;
  title: string;
}

const PartnersList: React.FC<PartnersListProps> = ({ partners, showMoreLink = false, title }) => {
  const navigate = useNavigate();
  const displayPartners = partners.slice(0, 4); // Limit to 4 partners for homepage

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        {showMoreLink && (
          <button 
            className="text-brand-green text-sm font-medium"
            onClick={() => navigate('/partners')}
          >
            Ver todos
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {displayPartners.map((partner) => (
          <Card 
            key={partner.id} 
            className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow"
            onClick={() => navigate(`/partner/${partner.id}`)}
          >
            <CardContent className="p-3 flex flex-col items-center">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="w-16 h-16 object-contain mb-2"
              />
              <h3 className="font-semibold text-sm text-center">{partner.name}</h3>
              <Badge className="mt-1 bg-brand-green">
                {partner.cashbackPercentage}% cashback
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PartnersList;

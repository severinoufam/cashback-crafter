
import React from 'react';
import { Promotion } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useNavigate } from 'react-router-dom';

interface PromotionCarouselProps {
  promotions: Promotion[];
}

const PromotionCarousel: React.FC<PromotionCarouselProps> = ({ promotions }) => {
  const navigate = useNavigate();

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {promotions.map((promotion) => (
          <CarouselItem key={promotion.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card 
                className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow"
                onClick={() => navigate(promotion.url)}
              >
                <CardContent className="p-0 relative">
                  <img 
                    src={promotion.image} 
                    alt={promotion.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white font-bold">{promotion.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{promotion.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
};

export default PromotionCarousel;

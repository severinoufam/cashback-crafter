
import React from 'react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  showMoreLink?: boolean;
  title: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, showMoreLink = false, title }) => {
  const navigate = useNavigate();
  const displayProducts = products.slice(0, 4); // Limit to 4 products for homepage

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        {showMoreLink && (
          <Button variant="link" onClick={() => navigate('/store')}>
            Ver mais
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {displayProducts.map((product) => (
          <Card 
            key={product.id} 
            className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 object-cover"
                />
                {!product.inStock && (
                  <Badge className="absolute top-2 right-2 bg-red-500">Esgotado</Badge>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs ml-1">{product.rating.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between">
              <div className="text-brand-green font-bold text-sm">
                {formatCurrency(product.price.cashback)}
              </div>
              <div className="text-brand-orange font-bold text-sm">
                {product.price.points} pts
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

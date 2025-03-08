
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ProductJourney } from '@/lib/types';
import { formatDate } from '@/lib/constants';
import FadeIn from '@/components/animations/FadeIn';
import { Truck, Warehouse, Store, Leaf, MapPin, Calendar, Tag } from 'lucide-react';

interface ProductJourneyProps {
  journey: ProductJourney;
  className?: string;
}

const ProductJourneyView: React.FC<ProductJourneyProps> = ({ journey, className }) => {
  const { product, transitEvents, storageEvents, retailEvents } = journey;

  // Combine all events and sort by timestamp
  const allEvents = [
    ...transitEvents.map(event => ({
      ...event,
      type: 'transit' as const,
      timestamp: event.status === 'delivered' ? event.actualDeliveryTime : event.pickupTime
    })),
    ...storageEvents.map(event => ({
      ...event,
      type: 'storage' as const,
      timestamp: event.receivedTime
    })),
    ...retailEvents.map(event => ({
      ...event,
      type: 'retail' as const,
      timestamp: event.receivedTime
    }))
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'transit': return <Truck className="w-5 h-5" />;
      case 'storage': return <Warehouse className="w-5 h-5" />;
      case 'retail': return <Store className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <FadeIn>
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Leaf className="w-4 h-4 text-role-farmer" />
                <span className="text-muted-foreground">Farmer:</span>
                <span>{product.farmerName}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-role-farmer" />
                <span className="text-muted-foreground">Origin:</span>
                <span>{product.origin}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-role-farmer" />
                <span className="text-muted-foreground">Harvested:</span>
                <span>{formatDate(product.harvestDate)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Tag className="w-4 h-4" />
                <span className="text-muted-foreground">Type:</span>
                <span>{product.type} - {product.variety}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Quantity:</span>
                <span>{product.quantity} {product.unit}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Quality:</span>
                <Badge variant="outline">{product.qualityGrade}</Badge>
                {product.organicCertified && (
                  <Badge className="bg-role-farmer">Organic</Badge>
                )}
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Journey Timeline</h3>
            
            <div className="relative pl-10 space-y-8">
              <div className="timeline-connector" />
              
              {/* Initial farm event is always present */}
              <FadeIn delay={100}>
                <div className="relative">
                  <div className="timeline-dot" />
                  <div className="ml-6">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-role-farmer" />
                      <h4 className="font-medium">Harvested at Farm</h4>
                    </div>
                    <time className="text-sm text-muted-foreground">
                      {formatDate(product.harvestDate)}
                    </time>
                    <p className="mt-1 text-sm">
                      Product harvested at {product.origin}
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              {allEvents.map((event, index) => (
                <FadeIn key={event.id} delay={150 + (index * 50)}>
                  <div className="relative">
                    <div className="timeline-dot" />
                    <div className="ml-6">
                      <div className="flex items-center gap-2">
                        {getEventIcon(event.type)}
                        <h4 className="font-medium">
                          {event.type === 'transit' && event.status === 'delivered' ? 
                            `Delivered to ${event.deliveryLocation}` : 
                            event.type === 'transit' ? 
                              `Picked up from ${event.pickupLocation}` :
                              event.type === 'storage' ? 
                                `Stored at ${event.warehouseName}` : 
                                `Received at ${event.retailerName}`}
                        </h4>
                      </div>
                      <time className="text-sm text-muted-foreground">
                        {formatDate(event.timestamp)}
                      </time>
                      {event.type === 'transit' && event.conditions && (
                        <p className="mt-1 text-sm">
                          Transport conditions: {event.conditions.temperature}°C, {event.conditions.humidity}% humidity
                        </p>
                      )}
                      {event.type === 'storage' && (
                        <p className="mt-1 text-sm">
                          Storage conditions: {event.conditions.temperature}°C, {event.conditions.humidity}% humidity
                        </p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
              
              {/* Current Status */}
              <FadeIn delay={150 + (allEvents.length * 50)}>
                <div className="relative">
                  <div className="timeline-dot" />
                  <div className="ml-6">
                    <div className="flex items-center gap-2">
                      {product.currentStatus === 'at-farm' ? (
                        <Leaf className="w-5 h-5 text-role-farmer" />
                      ) : product.currentStatus === 'in-transit' ? (
                        <Truck className="w-5 h-5 text-role-transporter" />
                      ) : product.currentStatus === 'in-warehouse' ? (
                        <Warehouse className="w-5 h-5 text-role-warehouse" />
                      ) : (
                        <Store className="w-5 h-5 text-role-retailer" />
                      )}
                      <h4 className="font-medium">Current Status</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge>
                        {product.currentStatus === 'at-farm' ? 'At Farm' : 
                         product.currentStatus === 'in-transit' ? 'In Transit' : 
                         product.currentStatus === 'in-warehouse' ? 'In Warehouse' : 
                         product.currentStatus === 'at-retailer' ? 'At Retailer' : 'Sold'}
                      </Badge>
                      {product.currentLocation && (
                        <span className="text-sm">{product.currentLocation}</span>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ProductJourneyView;

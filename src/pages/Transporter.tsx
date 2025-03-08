
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import SideNav from '@/components/layout/SideNav';
import QRCode from '@/components/common/QRCode';
import FadeIn from '@/components/animations/FadeIn';
import SlideIn from '@/components/animations/SlideIn';
import { MOCK_TRANSIT_EVENTS, MOCK_PRODUCTS, formatDate } from '@/lib/constants';
import { 
  Truck, 
  Package, 
  ArrowUpRight, 
  QrCode, 
  MapPin, 
  CalendarClock, 
  Thermometer, 
  Droplets 
} from 'lucide-react';

const Transporter = () => {
  const [transitEvents] = useState(MOCK_TRANSIT_EVENTS);
  
  // Get products for transit events
  const getProductForTransit = (productId: string) => {
    return MOCK_PRODUCTS.find(p => p.id === productId);
  };

  // Calculate progress percentage for in-transit shipments
  const calculateProgress = (event: any) => {
    if (event.status === 'delivered') return 100;
    if (event.status === 'scheduled') return 0;
    
    // For in-transit, estimate based on pickup time and estimated delivery
    const pickupTime = new Date(event.pickupTime).getTime();
    const deliveryTime = new Date(event.estimatedDeliveryTime).getTime();
    const currentTime = new Date().getTime();
    
    const totalTime = deliveryTime - pickupTime;
    const elapsedTime = currentTime - pickupTime;
    
    const progress = Math.min(Math.max(Math.floor((elapsedTime / totalTime) * 100), 0), 99);
    return progress;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SideNav />
      
      <main className="pt-24 pb-16 lg:pl-64">
        <div className="container max-w-6xl">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Transporter Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage shipments and track deliveries
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <Button asChild>
                  <Link to="/transporter/scan">
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan QR Code
                  </Link>
                </Button>
                
                <Button variant="outline" asChild>
                  <Link to="/transporter/update">
                    <Package className="h-4 w-4 mr-2" />
                    Update Transit
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <FadeIn delay={100}>
              <Card className="glass-card overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Overview</span>
                    <Badge className="bg-role-transporter">{transitEvents.length} Shipments</Badge>
                  </CardTitle>
                  <CardDescription>Your shipments at a glance</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Scheduled</span>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <CalendarClock className="h-3 w-3" />
                        {transitEvents.filter(e => e.status === 'scheduled').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">In Transit</span>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Truck className="h-3 w-3" />
                        {transitEvents.filter(e => e.status === 'in-transit').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Delivered</span>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Package className="h-3 w-3" />
                        {transitEvents.filter(e => e.status === 'delivered').length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={150}>
              <Card className="glass-card overflow-hidden">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Quick Scan</CardTitle>
                    <CardDescription>Scan a product QR code</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <div className="qr-scan bg-white p-4 rounded-lg w-[150px] h-[150px] flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button size="sm" className="w-full" asChild>
                    <Link to="/transporter/scan">
                      <QrCode className="mr-2 h-4 w-4" />
                      <span>Scan QR Code</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
            
            <FadeIn delay={200}>
              <Card className="glass-card overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common transporter tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                  <Button className="w-full justify-start" size="sm" asChild>
                    <Link to="/transporter/scan">
                      <QrCode className="mr-2 h-4 w-4" />
                      Scan Product QR
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" size="sm" variant="outline" asChild>
                    <Link to="/transporter/update">
                      <Truck className="mr-2 h-4 w-4" />
                      Update Transit Status
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" size="sm" variant="outline" asChild>
                    <Link to="/transporter/confirm">
                      <Package className="mr-2 h-4 w-4" />
                      Delivery Confirmation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
          
          <FadeIn delay={250}>
            <h2 className="text-2xl font-bold mb-6">Current Shipments</h2>
            
            <div className="space-y-4">
              {transitEvents.map((event, index) => {
                const product = getProductForTransit(event.productId);
                const progress = calculateProgress(event);
                
                return (
                  <SlideIn key={event.id} delay={300 + (index * 50)}>
                    <Card className="glass-card overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/4 bg-muted/30 flex items-center justify-center p-4">
                          <div className="relative">
                            <Truck className="h-20 w-20 text-role-transporter" />
                            {event.status === 'in-transit' && (
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16">
                                <Progress value={progress} className="h-1" />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">{product?.name || 'Product'}</h3>
                              <p className="text-sm text-muted-foreground">Shipment ID: {event.id}</p>
                            </div>
                            
                            <Badge className={
                              event.status === 'scheduled' ? 'bg-muted text-foreground' : 
                              event.status === 'in-transit' ? 'bg-role-transporter text-white' : 
                              'bg-green-500 text-white'
                            }>
                              {event.status === 'scheduled' ? 'Scheduled' : 
                               event.status === 'in-transit' ? 'In Transit' : 
                               'Delivered'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground">From</p>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm font-medium truncate">{event.pickupLocation}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-muted-foreground">To</p>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm font-medium truncate">{event.deliveryLocation}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-muted-foreground">Pickup Time</p>
                              <p className="text-sm font-medium">{formatDate(event.pickupTime)}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs text-muted-foreground">
                                {event.status === 'delivered' ? 'Delivered At' : 'Est. Delivery'}
                              </p>
                              <p className="text-sm font-medium">
                                {event.status === 'delivered' && event.actualDeliveryTime ? 
                                  formatDate(event.actualDeliveryTime) : 
                                  formatDate(event.estimatedDeliveryTime)}
                              </p>
                            </div>
                          </div>
                          
                          {event.conditions && (
                            <div className="flex flex-wrap gap-4 mb-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Thermometer className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{event.conditions.temperature}°C</span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Droplets className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{event.conditions.humidity}% Humidity</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {event.status === 'in-transit' && (
                              <Button size="sm" asChild>
                                <Link to={`/transporter/update/${event.id}`}>
                                  Update Status
                                </Link>
                              </Button>
                            )}
                            
                            {event.status === 'scheduled' && (
                              <Button size="sm" asChild>
                                <Link to={`/transporter/start/${event.id}`}>
                                  Start Transit
                                </Link>
                              </Button>
                            )}
                            
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/product/${event.productId}`}>
                                <ArrowUpRight className="h-4 w-4 mr-2" />
                                View Product
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </SlideIn>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default Transporter;

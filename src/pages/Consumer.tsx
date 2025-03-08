import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { MOCK_PRODUCTS, getProductJourney, MOCK_FEEDBACK, formatDate } from '@/lib/constants';
import { Product, FeedbackEvent } from '@/lib/types';
import FadeIn from '@/components/animations/FadeIn';
import { Search, Star, Tag, ShoppingBag, Heart } from 'lucide-react';
import SideNav from '@/components/layout/SideNav';
import Header from '@/components/layout/Header';

const Consumer = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredProducts = MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // We're already filtering above, this is just to show a toast
    toast({
      title: "Search results",
      description: `Found ${filteredProducts.length} products matching "${searchTerm}"`
    });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    toast({
      title: "Product selected",
      description: `Viewing details for ${product.name}`
    });
  };

  const handleSubmitFeedback = () => {
    if (!selectedProduct) return;
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback on this product."
    });
    
    setFeedback('');
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
    
    const action = favorites.includes(productId) ? "removed from" : "added to";
    toast({
      title: `Product ${action} favorites`,
      description: "Your favorites have been updated."
    });
  };

  const getProductFeedback = (productId: string) => {
    return MOCK_FEEDBACK.filter(f => f.productId === productId);
  };

  return (
    <div className="container max-w-7xl mx-auto py-20 px-24 sm:px-17 lg:px-28">
        <Header />
        <SideNav />
      <FadeIn>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">TraceChain Consumer Portal</h1>
            <Button variant="outline">
              <ShoppingBag className="mr-2 h-4 w-4" />
              My Purchases
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Product Traceability</CardTitle>
              <CardDescription>
                Track the journey of your food from farm to table
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Search products by name or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>

          {selectedProduct ? (
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{selectedProduct.name}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleFavorite(selectedProduct.id)}
                    >
                      <Heart 
                        className={`h-5 w-5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </Button>
                  </div>
                  <CardDescription>
                    {selectedProduct.type} • {selectedProduct.variety || 'Standard variety'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Farmer</div>
                    <div>{selectedProduct.farmerName}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Origin</div>
                    <div>{selectedProduct.origin}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Harvest Date</div>
                    <div>{formatDate(selectedProduct.harvestDate)}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Current Status</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        {selectedProduct.currentStatus.replace(/-/g, ' ')}
                      </span>
                      {selectedProduct.organicCertified && (
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                          Organic Certified
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setSelectedProduct(null)}>
                    Back to All Products
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Product Journey</CardTitle>
                  <CardDescription>
                    Follow the complete supply chain journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="journey">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="journey">Journey</TabsTrigger>
                      <TabsTrigger value="feedback">Feedback</TabsTrigger>
                      <TabsTrigger value="leave-feedback">Leave Feedback</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="journey" className="space-y-4">
                      <div className="mt-6">
                        <div className="relative">
                          {getProductJourney(selectedProduct.id)?.transitEvents.map((event, index) => (
                            <div key={event.id} className="mb-8 flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                  {index + 1}
                                </div>
                                {index < (getProductJourney(selectedProduct.id)?.transitEvents.length || 0) - 1 && (
                                  <div className="h-full w-0.5 bg-border"></div>
                                )}
                              </div>
                              <div className="flex-1 pt-1.5 pb-8">
                                <h3 className="text-lg font-semibold">{event.status === 'delivered' ? 'Delivered' : 'In Transit'}</h3>
                                <p className="text-sm text-muted-foreground">From: {event.pickupLocation}</p>
                                <p className="text-sm text-muted-foreground">To: {event.deliveryLocation}</p>
                                <p className="text-sm text-muted-foreground">Transporter: {event.transporterName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {event.status === 'delivered' 
                                    ? `Delivered: ${formatDate(event.actualDeliveryTime || '')}`
                                    : `Estimated delivery: ${formatDate(event.estimatedDeliveryTime)}`
                                  }
                                </p>
                                <div className="mt-2 flex gap-2">
                                  <div className="rounded-md bg-muted px-2 py-1 text-xs">
                                    Temp: {event.conditions?.temperature}°C
                                  </div>
                                  <div className="rounded-md bg-muted px-2 py-1 text-xs">
                                    Humidity: {event.conditions?.humidity}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {getProductJourney(selectedProduct.id)?.storageEvents.map((event, index) => (
                            <div key={event.id} className="mb-8 flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                                  WH
                                </div>
                                {index < (getProductJourney(selectedProduct.id)?.storageEvents.length || 0) - 1 && (
                                  <div className="h-full w-0.5 bg-border"></div>
                                )}
                              </div>
                              <div className="flex-1 pt-1.5 pb-8">
                                <h3 className="text-lg font-semibold">Warehouse Storage</h3>
                                <p className="text-sm text-muted-foreground">Warehouse: {event.warehouseName}</p>
                                <p className="text-sm text-muted-foreground">Location: {event.location}</p>
                                <p className="text-sm text-muted-foreground">Received: {formatDate(event.receivedTime)}</p>
                                {event.exitTime && (
                                  <p className="text-sm text-muted-foreground">Exit: {formatDate(event.exitTime)}</p>
                                )}
                                <div className="mt-2 flex gap-2">
                                  <div className="rounded-md bg-muted px-2 py-1 text-xs">
                                    Temp: {event.conditions.temperature}°C
                                  </div>
                                  <div className="rounded-md bg-muted px-2 py-1 text-xs">
                                    Humidity: {event.conditions.humidity}%
                                  </div>
                                </div>
                                {event.qualityCheck && (
                                  <div className={`mt-2 rounded-md px-2 py-1 text-xs ${
                                    event.qualityCheck.status === 'passed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    Quality Check: {event.qualityCheck.status}
                                    {event.qualityCheck.notes && ` - ${event.qualityCheck.notes}`}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {getProductJourney(selectedProduct.id)?.retailEvents.map((event, index) => (
                            <div key={event.id} className="mb-8 flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                  <ShoppingBag className="h-5 w-5" />
                                </div>
                              </div>
                              <div className="flex-1 pt-1.5">
                                <h3 className="text-lg font-semibold">Retail</h3>
                                <p className="text-sm text-muted-foreground">Retailer: {event.retailerName}</p>
                                <p className="text-sm text-muted-foreground">Location: {event.location}</p>
                                <p className="text-sm text-muted-foreground">Received: {formatDate(event.receivedTime)}</p>
                                <p className="text-sm text-muted-foreground">Price: ${event.price.toFixed(2)}/unit</p>
                                {event.soldTime && (
                                  <p className="text-sm text-muted-foreground">Sold: {formatDate(event.soldTime)}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="feedback" className="space-y-4">
                      {getProductFeedback(selectedProduct.id).length > 0 ? (
                        getProductFeedback(selectedProduct.id).map((fb: FeedbackEvent) => (
                          <div key={fb.id} className="border rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                              <div className="font-medium">{fb.userName}</div>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < fb.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{fb.comment}</p>
                            <div className="text-xs text-muted-foreground">{formatDate(fb.timestamp)}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No feedback available for this product yet.
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="leave-feedback" className="space-y-4">
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="rating">Your Rating</Label>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Button 
                                key={i} 
                                type="button" 
                                variant="ghost" 
                                className="p-0 h-8 w-8"
                                onClick={() => setRating(i + 1)}
                              >
                                <Star 
                                  className={`h-6 w-6 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="feedback">Your Feedback</Label>
                          <textarea 
                            id="feedback"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Share your experience with this product..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                          />
                        </div>
                        
                        <Button 
                          onClick={handleSubmitFeedback} 
                          disabled={!feedback.trim()}
                          className="w-full"
                        >
                          Submit Feedback
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                      >
                        <Heart 
                          className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </Button>
                    </div>
                    <CardDescription>{product.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Origin: {product.origin}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-sm text-muted-foreground">Farmer: {product.farmerName}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        {product.currentStatus.replace(/-/g, ' ')}
                      </span>
                      {product.organicCertified && (
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                          Organic
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 flex justify-between">
                    <div className="text-sm font-medium">
                      {product.price ? `$${product.price.toFixed(2)}` : 'Price not available'}
                    </div>
                    <Button size="sm" onClick={() => handleProductSelect(product)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No products found matching your search criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default Consumer;

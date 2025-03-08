import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import FadeIn from '@/components/animations/FadeIn';
import { MOCK_PRODUCTS, MOCK_STORAGE_EVENTS, MOCK_USERS } from '@/lib/constants';
import { Package, Warehouse as WarehouseIcon, ClipboardCheck, Thermometer, Search, PackageCheck } from 'lucide-react';
import { formatDate } from '@/lib/constants';
import { Product, StorageEvent } from '@/lib/types';
import Header from '@/components/layout/Header';
import SideNav from '@/components/layout/SideNav';

const Warehouse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Filter products that are in warehouse
  const warehouseProducts = MOCK_PRODUCTS.filter(product => 
    product.currentStatus === 'in-warehouse'
  );
  
  // Filter storage events
  const storageEvents = MOCK_STORAGE_EVENTS;
  
  // Current warehouse info (would come from auth in a real app)
  const warehouseInfo = MOCK_USERS.find(user => user.role === 'warehouse');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search functionality",
      description: "This would search for product " + searchQuery,
    });
  };
  
  const handleQualityCheck = (productId: string) => {
    toast({
      title: "Quality check recorded",
      description: "Quality check for product " + productId + " has been recorded",
    });
  };
  
  return (
    <div className="container mx-auto p-20 max-w-7xl">
        <Header />
        <SideNav />
      <FadeIn>
        <div className="flex flex-col gap-8">
          {/* Warehouse Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{warehouseInfo?.company} Dashboard</h1>
              <p className="text-muted-foreground">Manage warehouse operations and product quality</p>
            </div>
            
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search by product ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64"
              />
              <Button type="submit" variant="outline" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="quality">Quality Control</TabsTrigger>
              <TabsTrigger value="conditions">Storage Conditions</TabsTrigger>
            </TabsList>
            
            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {warehouseProducts.length > 0 ? (
                  warehouseProducts.map((product) => (
                    <InventoryCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No products in inventory</h3>
                    <p className="text-muted-foreground">Products will appear here when they arrive at the warehouse.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Quality Control Tab */}
            <TabsContent value="quality" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    Quality Control Records
                  </CardTitle>
                  <CardDescription>Track and manage product quality inspections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {warehouseProducts.map((product) => (
                      <div key={product.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                          <p className="text-sm">Harvest Date: {formatDate(product.harvestDate)}</p>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleQualityCheck(product.id)}
                          >
                            <PackageCheck className="h-4 w-4 mr-2" />
                            Record Check
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {warehouseProducts.length === 0 && (
                      <div className="text-center py-8">
                        <ClipboardCheck className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No products to inspect</h3>
                        <p className="text-muted-foreground">Products requiring quality control will appear here.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Storage Conditions Tab */}
            <TabsContent value="conditions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5" />
                    Storage Conditions Monitoring
                  </CardTitle>
                  <CardDescription>Track temperature and humidity levels for optimal product preservation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {storageEvents.map((event) => (
                      <StorageConditionCard key={event.id} event={event} />
                    ))}
                    
                    {storageEvents.length === 0 && (
                      <div className="text-center py-8">
                        <Thermometer className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No storage data available</h3>
                        <p className="text-muted-foreground">Storage condition tracking will appear here.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </FadeIn>
    </div>
  );
};

// Component for rendering inventory items
const InventoryCard = ({ product }: { product: Product }) => {
  const productDetails = MOCK_PRODUCTS.find(p => p.id === product.id);
  const storageInfo = MOCK_STORAGE_EVENTS.find(e => e.productId === product.id);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <WarehouseIcon className="h-5 w-5 text-purple-500" />
        </div>
        <CardDescription>{product.type} • {product.variety || 'Standard'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">ID:</span>
            <span className="font-medium">{product.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantity:</span>
            <span className="font-medium">{product.quantity} {product.unit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Received:</span>
            <span className="font-medium">{storageInfo ? formatDate(storageInfo.receivedTime) : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">{storageInfo?.location || 'Unassigned'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Origin:</span>
            <span className="font-medium">{product.origin}</span>
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full" onClick={() => {}}>
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for rendering storage condition cards
const StorageConditionCard = ({ event }: { event: StorageEvent }) => {
  const product = MOCK_PRODUCTS.find(p => p.id === event.productId);
  
  const getTemperatureClass = (temp: number) => {
    if (temp < 2) return "text-blue-500";
    if (temp > 8) return "text-red-500";
    return "text-green-500";
  };
  
  const getHumidityClass = (humidity: number) => {
    if (humidity < 70) return "text-amber-500";
    if (humidity > 90) return "text-blue-500";
    return "text-green-500";
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
      <div>
        <h3 className="font-medium">{product?.name || 'Unknown Product'}</h3>
        <p className="text-sm text-muted-foreground">Location: {event.location}</p>
        <p className="text-sm">Received: {formatDate(event.receivedTime)}</p>
      </div>
      <div className="flex gap-6 mt-4 md:mt-0">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Temperature</p>
          <p className={`text-lg font-bold ${getTemperatureClass(event.conditions.temperature)}`}>
            {event.conditions.temperature}°C
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Humidity</p>
          <p className={`text-lg font-bold ${getHumidityClass(event.conditions.humidity)}`}>
            {event.conditions.humidity}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
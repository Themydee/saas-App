import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FadeIn from '@/components/animations/FadeIn';
import { getCurrentUser, MOCK_PRODUCTS, MOCK_TRANSIT_EVENTS, MOCK_STORAGE_EVENTS, formatDate } from '@/lib/constants';
import { Leaf, Truck, Warehouse, ShoppingBag, User, BarChart, LayoutDashboard, Clock } from 'lucide-react';
import { UserRole } from '@/lib/types';

const Home = () => {
  const currentUser = getCurrentUser();
  const [activeTab, setActiveTab] = useState<string>('overview');

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'farmer': return <Leaf className="h-5 w-5" />;
      case 'transporter': return <Truck className="h-5 w-5" />;
      case 'warehouse': return <Warehouse className="h-5 w-5" />;
      case 'retailer': return <ShoppingBag className="h-5 w-5" />;
      case 'consumer': return <User className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: UserRole): string => {
    switch (role) {
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'transporter': return 'bg-blue-100 text-blue-800';
      case 'warehouse': return 'bg-purple-100 text-purple-800';
      case 'retailer': return 'bg-yellow-100 text-yellow-800';
      case 'consumer': return 'bg-gray-100 text-gray-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRolePath = (role: UserRole): string => {
    switch (role) {
      case 'farmer': return '/farmer';
      case 'transporter': return '/transporter';
      case 'warehouse': return '/warehouse';
      case 'retailer': return '/profile';
      case 'consumer': return '/consumer';
      default: return '/profile';
    }
  };

  // Count products by status
  const productStatus = {
    atFarm: MOCK_PRODUCTS.filter(p => p.currentStatus === 'at-farm').length,
    inTransit: MOCK_PRODUCTS.filter(p => p.currentStatus === 'in-transit').length,
    inWarehouse: MOCK_PRODUCTS.filter(p => p.currentStatus === 'in-warehouse').length,
    atRetailer: MOCK_PRODUCTS.filter(p => p.currentStatus === 'at-retailer').length,
    sold: MOCK_PRODUCTS.filter(p => p.currentStatus === 'sold').length
  };

  // Get recent activity
  const recentActivity = [
    ...MOCK_TRANSIT_EVENTS.map(event => ({
      id: event.id,
      type: 'transit',
      title: `Product ${event.productId} ${event.status === 'delivered' ? 'delivered to' : 'in transit to'} ${event.deliveryLocation}`,
      time: event.status === 'delivered' ? event.actualDeliveryTime! : event.pickupTime,
      icon: <Truck className="h-4 w-4" />
    })),
    ...MOCK_STORAGE_EVENTS.map(event => ({
      id: event.id,
      type: 'storage',
      title: `Product ${event.productId} received at ${event.warehouseName}`,
      time: event.receivedTime,
      icon: <Warehouse className="h-4 w-4" />
    }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <FadeIn>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {currentUser.name}!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getRoleColor(currentUser.role)}`}>
                {getRoleIcon(currentUser.role)}
                <span className="capitalize">{currentUser.role}</span>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-2 bg-transparent">
              <TabsTrigger value="overview" className="data-[state=active]:glass-card">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              {currentUser.role === 'farmer' && (
                <TabsTrigger value="farm" className="data-[state=active]:glass-card">
                  <Leaf className="h-4 w-4 mr-2" />
                  Farm
                </TabsTrigger>
              )}
              {currentUser.role === 'transporter' && (
                <TabsTrigger value="deliveries" className="data-[state=active]:glass-card">
                  <Truck className="h-4 w-4 mr-2" />
                  Deliveries
                </TabsTrigger>
              )}
              {currentUser.role === 'warehouse' && (
                <TabsTrigger value="inventory" className="data-[state=active]:glass-card">
                  <Warehouse className="h-4 w-4 mr-2" />
                  Inventory
                </TabsTrigger>
              )}
              {currentUser.role === 'retailer' && (
                <TabsTrigger value="sales" className="data-[state=active]:glass-card">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Sales
                </TabsTrigger>
              )}
              {currentUser.role === 'consumer' && (
                <TabsTrigger value="purchases" className="data-[state=active]:glass-card">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Purchases
                </TabsTrigger>
              )}
              <TabsTrigger value="analytics" className="data-[state=active]:glass-card">
                <BarChart className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:glass-card">
                <Clock className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{MOCK_PRODUCTS.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Across all supply chain stages
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{productStatus.inTransit}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Products currently being transported
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">In Warehouse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{productStatus.inWarehouse}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Products stored in warehouses
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">At Retailer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{productStatus.atRetailer}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Products ready for sale
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="glass-card lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Supply Chain Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center gap-4 h-[200px]">
                      <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full bg-green-100 text-green-800">
                          <Leaf className="h-6 w-6" />
                        </div>
                        <div className="text-sm font-medium mt-2">Farm</div>
                        <div className="text-lg font-bold">{productStatus.atFarm}</div>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-200 relative">
                        <div className="absolute inset-0 bg-blue-400" style={{ width: '70%' }}></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full bg-blue-100 text-blue-800">
                          <Truck className="h-6 w-6" />
                        </div>
                        <div className="text-sm font-medium mt-2">Transit</div>
                        <div className="text-lg font-bold">{productStatus.inTransit}</div>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-200 relative">
                        <div className="absolute inset-0 bg-purple-400" style={{ width: '60%' }}></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full bg-purple-100 text-purple-800">
                          <Warehouse className="h-6 w-6" />
                        </div>
                        <div className="text-sm font-medium mt-2">Warehouse</div>
                        <div className="text-lg font-bold">{productStatus.inWarehouse}</div>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-200 relative">
                        <div className="absolute inset-0 bg-yellow-400" style={{ width: '50%' }}></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full bg-yellow-100 text-yellow-800">
                          <ShoppingBag className="h-6 w-6" />
                        </div>
                        <div className="text-sm font-medium mt-2">Retailer</div>
                        <div className="text-lg font-bold">{productStatus.atRetailer}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${activity.type === 'transit' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(activity.time)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Your Role-Specific Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="inline-flex justify-center items-center p-6 rounded-full mb-4 bg-opacity-20" 
                           style={{ backgroundColor: currentUser.role === 'farmer' ? '#10b981' : 
                                               currentUser.role === 'transporter' ? '#3b82f6' : 
                                               currentUser.role === 'warehouse' ? '#8b5cf6' : 
                                               currentUser.role === 'retailer' ? '#f59e0b' : '#6b7280' }}>
                        {getRoleIcon(currentUser.role)}
                      </div>
                      <h3 className="text-xl font-bold mb-2">Go to your {currentUser.role} dashboard</h3>
                      <p className="text-muted-foreground mb-4">
                        View detailed information specific to your role in the supply chain
                      </p>
                      <Button asChild>
                        <Link to={getRolePath(currentUser.role)}>
                          View {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Supply Chain Analytics</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-10">
                  <p className="text-muted-foreground mb-4">
                    Analytics functionality will be implemented in a future update.
                  </p>
                  <div className="flex items-center justify-center">
                    <BarChart className="h-20 w-20 text-primary opacity-40" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-4 items-start">
                        <div className={`p-3 rounded-full ${activity.type === 'transit' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                          {activity.icon}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(activity.time)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Role-specific tab content */}
            {currentUser.role === 'farmer' && (
              <TabsContent value="farm" className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Farm Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <p className="text-muted-foreground mb-4">
                      Go to the full farmer dashboard to manage your farm products and view detailed information.
                    </p>
                    <Button asChild>
                      <Link to="/farmer">
                        <Leaf className="mr-2 h-4 w-4" />
                        Full Farmer Dashboard
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {currentUser.role === 'transporter' && (
              <TabsContent value="deliveries" className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Delivery Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <p className="text-muted-foreground mb-4">
                      Go to the full transporter dashboard to manage your deliveries and view detailed information.
                    </p>
                    <Button asChild>
                      <Link to="/transporter">
                        <Truck className="mr-2 h-4 w-4" />
                        Full Transporter Dashboard
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {currentUser.role === 'warehouse' && (
              <TabsContent value="inventory" className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Warehouse Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <p className="text-muted-foreground mb-4">
                      Go to the full warehouse dashboard to manage your inventory and view detailed information.
                    </p>
                    <Button asChild>
                      <Link to="/warehouse">
                        <Warehouse className="mr-2 h-4 w-4" />
                        Full Warehouse Dashboard
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {currentUser.role === 'retailer' && (
              <TabsContent value="sales" className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Retailer Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <p className="text-muted-foreground mb-4">
                      Go to the full retailer dashboard to manage your products and view detailed information.
                    </p>
                    <Button asChild>
                      <Link to="/profile">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Full Retailer Dashboard
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            
            {currentUser.role === 'consumer' && (
              <TabsContent value="purchases" className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Consumer Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <p className="text-muted-foreground mb-4">
                      Go to the full consumer dashboard to view your purchases and product details.
                    </p>
                    <Button asChild>
                      <Link to="/consumer">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Full Consumer Dashboard
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </FadeIn>
    </div>
  );
};

export default Home;
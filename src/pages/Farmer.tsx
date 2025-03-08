
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import SideNav from '@/components/layout/SideNav';
import QRCode from '@/components/common/QRCode';
import FadeIn from '@/components/animations/FadeIn';
import SlideIn from '@/components/animations/SlideIn';
import { MOCK_PRODUCTS, formatDate } from '@/lib/constants';
import { Leaf, Plus, QrCode, ArrowUpRight, Check, X, Clock } from 'lucide-react';

const Farmer = () => {
  const [products] = useState(MOCK_PRODUCTS);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'at-farm': return 'bg-role-farmer text-white';
      case 'in-transit': return 'bg-role-transporter text-white';
      case 'in-warehouse': return 'bg-role-warehouse text-white';
      case 'at-retailer': return 'bg-role-retailer text-white';
      case 'sold': return 'bg-green-500 text-white';
      default: return 'bg-muted text-foreground';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'at-farm': return <Leaf className="h-4 w-4" />;
      case 'in-transit': return <Clock className="h-4 w-4" />;
      case 'in-warehouse': return <Check className="h-4 w-4" />;
      case 'at-retailer': return <Check className="h-4 w-4" />;
      case 'sold': return <Check className="h-4 w-4" />;
      default: return <X className="h-4 w-4" />;
    }
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
                <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
                <p className="text-muted-foreground">
                  Track and manage your produce inventory and supply chain
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                <Button asChild>
                  <Link to="/farmer/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Produce
                  </Link>
                </Button>
                
                <Button variant="outline" asChild>
                  <Link to="/farmer/qr">
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Code
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
                    <Badge className="bg-role-farmer">{products.length} Products</Badge>
                  </CardTitle>
                  <CardDescription>Your produce at a glance</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">At Farm</span>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Leaf className="h-3 w-3" />
                        {products.filter(p => p.currentStatus === 'at-farm').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">In Transit</span>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Clock className="h-3 w-3" />
                        {products.filter(p => p.currentStatus === 'in-transit').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">In Warehouse</span>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Check className="h-3 w-3" />
                        {products.filter(p => p.currentStatus === 'in-warehouse').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">At Retailer</span>
                      <Badge variant="outline" className="flex gap-1 items-center">
                        <Check className="h-3 w-3" />
                        {products.filter(p => p.currentStatus === 'at-retailer').length}
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
                    <CardTitle>Latest QR Code</CardTitle>
                    <CardDescription>Quick access to your latest produce</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <QRCode
                    value={products[0].qrCode}
                    size={150}
                    showAnimation
                    showDownload={false}
                  />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link to={`/product/${products[0].id}`}>
                      <span>View Product Details</span>
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
            
            <FadeIn delay={200}>
              <Card className="glass-card overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common farmer tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                  <Button className="w-full justify-start" size="sm" asChild>
                    <Link to="/farmer/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Register New Harvest
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" size="sm" variant="outline" asChild>
                    <Link to="/farmer/qr">
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR Codes
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" size="sm" variant="outline" asChild>
                    <Link to="/farmer/track">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Track Shipments
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
          
          <FadeIn delay={250}>
            <h2 className="text-2xl font-bold mb-6">Your Produce</h2>
            
            <div className="space-y-4">
              {products.map((product, index) => (
                <SlideIn key={product.id} delay={300 + (index * 50)}>
                  <Card className="glass-card overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 bg-muted/30 flex items-center justify-center p-4">
                        <img 
                          src={product.imageUrl || '/placeholder.svg'} 
                          alt={product.name}
                          className="object-cover h-32 w-32 rounded" 
                        />
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.type} - {product.variety}</p>
                          </div>
                          
                          <Badge className={getStatusColor(product.currentStatus)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(product.currentStatus)}
                              {product.currentStatus === 'at-farm' ? 'At Farm' : 
                               product.currentStatus === 'in-transit' ? 'In Transit' : 
                               product.currentStatus === 'in-warehouse' ? 'In Warehouse' : 
                               product.currentStatus === 'at-retailer' ? 'At Retailer' : 'Sold'}
                            </span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Harvest Date</p>
                            <p className="text-sm font-medium">{formatDate(product.harvestDate)}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Quantity</p>
                            <p className="text-sm font-medium">{product.quantity} {product.unit}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Quality Grade</p>
                            <p className="text-sm font-medium">{product.qualityGrade}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground">Certification</p>
                            <div className="flex items-center gap-1">
                              {product.organicCertified ? (
                                <Badge className="bg-role-farmer">Organic</Badge>
                              ) : (
                                <Badge variant="outline">Standard</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button size="sm" asChild>
                            <Link to={`/product/${product.id}`}>
                              View Details
                            </Link>
                          </Button>
                          
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/farmer/qr/${product.id}`}>
                              <QrCode className="h-4 w-4 mr-2" />
                              QR Code
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </SlideIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default Farmer;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserRole } from '@/lib/types';
import { 
  Home, 
  Leaf, 
  Truck, 
  Warehouse, 
  ShoppingBag, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  Scan,
  BarChart,
  Package,
  ClipboardList
} from 'lucide-react';

interface SideNavProps {
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ className }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (isMobile) return null;

  // Determine active role based on the URL
  const getActiveRole = (): UserRole => {
    const path = location.pathname;
    if (path.includes('/farmer')) return 'farmer';
    if (path.includes('/transporter')) return 'transporter';
    if (path.includes('/warehouse')) return 'warehouse';
    if (path.includes('/consumer') || path.includes('/retailer')) return 'retailer';
    return 'consumer';
  };
  
  const activeRole =  getActiveRole();
  
  const navItems = {
    
    farmer: [
      { name: 'My Produce', icon: Leaf, path: '/farmer' },
      { name: 'Add New Produce', icon: ClipboardList, path: '/farmer/add' },
      { name: 'Generate QR', icon: Scan, path: '/farmer/qr' },
      { name: 'Track Shipments', icon: Package, path: '/farmer/track' },
    ],
    transporter: [
      { name: 'Shipments', icon: Truck, path: '/transporter' },
      { name: 'Scan QR Code', icon: Scan, path: '/transporter/scan' },
      { name: 'Update Transit', icon: Package, path: '/transporter/update' },
      { name: 'Delivery Confirmation', icon: ClipboardList, path: '/transporter/confirm' },
    ],
    warehouse: [
      { name: 'Inventory', icon: Warehouse, path: '/warehouse' },
      { name: 'Scan QR Code', icon: Scan, path: '/warehouse/scan' },
      { name: 'Storage Conditions', icon: BarChart, path: '/warehouse/conditions' },
      { name: 'Quality Updates', icon: ClipboardList, path: '/warehouse/quality' },
    ],
    retailer: [
      { name: 'Products', icon: ShoppingBag, path: '/consumer' },
      { name: 'Scan QR Code', icon: Scan, path: '/consumer/scan' },
      { name: 'Verify Product', icon: Package, path: '/consumer/verify' },
    ],
    admin: [
      { name: 'Users', icon: Users, path: '/admin/users' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
  };

  return (
    <div className={cn('w-64 h-screen fixed left-0 top-0 pt-20 pb-6 px-4 z-30 hidden lg:block', className)}>
      <div className="h-full flex flex-col glass-card">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-1">
            {activeRole === 'farmer' ? 'Farmer Dashboard' :
             activeRole === 'transporter' ? 'Transporter Dashboard' :
             activeRole === 'warehouse' ? 'Warehouse Dashboard' :
             activeRole === 'retailer' ? 'Retailer Dashboard' : 'Consumer View'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your supply chain activities
          </p>
        </div>
        
        <nav className="flex-1 px-2 space-y-1 mt-4">
          
          <div className="pt-2 pb-1">
            <p className="px-3 text-xs font-medium text-muted-foreground">Role-specific</p>
          </div>
          
          {activeRole === 'farmer' && navItems.farmer.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start mb-1",
                  location.pathname === item.path && "font-medium"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
          
          {activeRole === 'transporter' && navItems.transporter.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start mb-1",
                  location.pathname === item.path && "font-medium"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
          
          {activeRole === 'warehouse' && navItems.warehouse.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start mb-1",
                  location.pathname === item.path && "font-medium"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
          
          {(activeRole === 'retailer' || activeRole === 'consumer') && navItems.retailer.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start mb-1",
                  location.pathname === item.path && "font-medium"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
        
        <div className="px-2 mt-auto space-y-1">
          <Link to="/help">
            <Button variant="ghost" className="w-full justify-start mb-1">
              <HelpCircle className="mr-2 h-5 w-5" />
              Help & Support
            </Button>
          </Link>
          
          <Link to="/auth">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

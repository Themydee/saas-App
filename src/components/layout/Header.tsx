import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

import { Menu, Search, Bell, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserRoundPlus } from "lucide-react"

const Header: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await axios.get('/api/users/current');
      setCurrentUser(response.data);
    };

    fetchCurrentUser();
  }, []);

  const handleNotification = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCurrentPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/farmer')) return 'Farmer Dashboard';
    if (path.includes('/transporter')) return 'Transporter Dashboard';
    if (path.includes('/warehouse')) return 'Warehouse Dashboard';
    if (path.includes('/consumer')) return 'Consumer';
    if (path.includes('/product')) return 'Product Details';
    if (path.includes('/auth')) return 'Authentication';
    return 'Supply Chain Transparency';
  };

  const renderNavLinks = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'farmer':
        return (
          <Link 
            to="/farmer" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname.includes('/farmer') && "text-primary"
            )}
          >
            Farmer
          </Link>
        );

        case 'transporter':
        return (
          <Link 
            to="/transporter" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname.includes('/farmer') && "text-primary"
            )}
          >
            Transporter
          </Link>
        );

        case 'warehouse':
        return (
          <Link 
            to="/warehouse" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname.includes('/farmer') && "text-primary"
            )}
          >
            Warehouse
          </Link>
        );
        
      case 'consumer':
        return (
          <Link 
            to="/consumer" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname.includes('/consumer') && "text-primary"
            )}
          >
            Consumer
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
        scrolled ? 'glass py-2 shadow-sm' : 'bg-transparent py-4'
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {renderNavLinks()}
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          <Link to="/home" className="flex items-center gap-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-role-farmer">
              TraceChain
            </span>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex items-center ml-8 gap-6">
              {renderNavLinks()}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="relative">
              <input 
                type="search"
                placeholder="Search..."
                className="w-48 md:w-64 h-9 px-3 py-2 border rounded-lg transition-all duration-300"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2" 
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon" onClick={handleNotification}>
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <UserRoundPlus className="mr-2 h-5 w-5" />
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

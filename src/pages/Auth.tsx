import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/lib/types';
import { MOCK_USERS } from '@/lib/constants';
import FadeIn from '@/components/animations/FadeIn';
import { Leaf, Truck, Warehouse, ShoppingBag, User } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as UserRole);
  };

  const getRoleIcon = (selectedRole: string) => {
    switch (selectedRole) {
      case 'farmer': return <Leaf className="h-5 w-5" />;
      case 'transporter': return <Truck className="h-5 w-5" />;
      case 'warehouse': return <Warehouse className="h-5 w-5" />;
      case 'retailer': return <ShoppingBag className="h-5 w-5" />;
      case 'consumer': return <User className="h-5 w-5" />;
      default: return <Leaf className="h-5 w-5" />;
    }
  };

  const getRolePath = (selectedRole: string): string => {
    switch (selectedRole) {
      case 'farmer': return '/farmer';
      case 'transporter': return '/transporter';
      case 'warehouse': return '/warehouse';
      case 'retailer': 
      case 'consumer': return '/consumer';
      default: return '/';
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoggingIn(true);

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: any) => u.email === email && u.password === password && u.role === role);

    if (user) {
      toast({
        title: "Successfully logged in",
        description: `Welcome back, ${user.name}!`,
      });
      navigate(getRolePath(role)); // Navigate to the role-specific path
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid email, password, or role.",
        variant: "destructive",
      });
    }

    setIsLoggingIn(false);
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    setIsRegistering(true);

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some((u: any) => u.email === email);

    if (userExists) {
      toast({
        title: "Registration failed",
        description: "User already exists.",
        variant: "destructive",
      });
    } else {
      const newUser = { email, password, role, name, id: Date.now().toString() };
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      toast({
        title: "Successfully registered",
        description: `Welcome, ${name}!`,
      });
      navigate(getRolePath(role));
    }

    setIsRegistering(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <FadeIn>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-1">TraceChain</h1>
            <p className="text-muted-foreground">Blockchain-powered supply chain transparency</p>
          </div>
          
          <div className="glass-card overflow-hidden">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select your role</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['farmer', 'transporter', 'warehouse',  'consumer'] as UserRole[]).map((r) => (
                        <Button
                          key={r}
                          type="button"
                          variant={role === r ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center h-20 p-2 ${role === r ? 'ring-2 ring-primary' : ''}`}
                          onClick={() => handleRoleChange(r)}
                        >
                          {getRoleIcon(r)}
                          <span className="text-xs mt-1 capitalize">{r}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </Button>
                
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select your role</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['farmer', 'transporter', 'warehouse', 'consumer'] as UserRole[]).map((r) => (
                        <Button
                          key={r}
                          type="button"
                          variant={role === r ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center h-20 p-2 ${role === r ? 'ring-2 ring-primary' : ''}`}
                          onClick={() => handleRoleChange(r)}
                        >
                          {getRoleIcon(r)}
                          <span className="text-xs mt-1 capitalize">{r}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isRegistering}
                  >
                    {isRegistering ? "Registering..." : "Register"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Auth;

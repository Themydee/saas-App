import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserRole, User } from '@/lib/types';
import { getCurrentUser } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FadeIn from '@/components/animations/FadeIn';
import { Leaf, Truck, Warehouse, ShoppingBag, User as UserIcon, Mail, Building, MapPin, Save, Home, Upload } from 'lucide-react';



const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
    };
    fetchUser();
  }, []);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'farmer': return <Leaf className="h-5 w-5" />;
      case 'transporter': return <Truck className="h-5 w-5" />;
      case 'warehouse': return <Warehouse className="h-5 w-5" />;
      case 'retailer': return <ShoppingBag className="h-5 w-5" />;
      case 'consumer': return <UserIcon className="h-5 w-5" />;
      case 'admin': return <UserIcon className="h-5 w-5" />;
      default: return <UserIcon className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setUser(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving to backend or local storage
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
      setIsSaving(false);
      // In a real app, you would update the user in your data store/backend here
    }, 1000);
  };

  const handleBackToDashboard = () => {
    if (user) {
      switch (user.role) {
        case 'farmer':
          navigate('/farmer');
          break;
        case 'transporter':
          navigate('/transporter');
          break;
        case 'warehouse':
          navigate('/warehouse');
          break;
        case 'retailer':
          navigate('/retailer');
          break;
        case 'consumer':
          navigate('/consumer');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/home');
      }
    } else {
      navigate('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <FadeIn>
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-1">User Profile</h1>
            <p className="text-muted-foreground">View and manage your TraceChain profile</p>
          </div>
          
          <Card className="glass-card">
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <div className="mb-4 relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={image || user.avatar || ""} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <input type="file" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
              <CardTitle className="text-2xl mb-1">{user.name}</CardTitle>
              
              <CardDescription className="mt-2 text-md">{user.email}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input 
                        id="name" 
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input 
                        id="email" 
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input 
                        id="company" 
                        name="company"
                        value={user.company || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input 
                        id="location" 
                        name="location"
                        value={user.location || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <span>{user.company}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-end gap-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={handleBackToDashboard}>
                    <Home className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
};

export default Profile;
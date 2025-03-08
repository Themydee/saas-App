
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  showStatus = false,
  className
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get role-specific color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'farmer': return 'bg-role-farmer text-white';
      case 'transporter': return 'bg-role-transporter text-white';
      case 'warehouse': return 'bg-role-warehouse text-white';
      case 'retailer': return 'bg-role-retailer text-white';
      case 'consumer': return 'bg-role-consumer text-white';
      case 'admin': return 'bg-primary text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="relative">
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className={getRoleColor(user.role)}>
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
};

export default UserAvatar;

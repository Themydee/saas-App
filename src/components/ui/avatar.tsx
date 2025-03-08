import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

// Avatar component
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

// AvatarImage component
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, src, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    src={src}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// AvatarFallback component
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// AvatarUpload component
const AvatarUpload = () => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedImage = localStorage.getItem("avatarImage");
    if (storedImage) {
      setImageSrc(storedImage);
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageSrc(base64String);
        localStorage.setItem("avatarImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Avatar>
        {imageSrc ? (
          <AvatarImage src={imageSrc} />
        ) : (
          <AvatarFallback>AB</AvatarFallback>
        )}
      </Avatar>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

// Export components
export { Avatar, AvatarImage, AvatarFallback, AvatarUpload }

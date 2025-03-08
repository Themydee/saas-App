
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { QrCode, Download, Share2 } from 'lucide-react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  showAnimation?: boolean;
  showDownload?: boolean;
  title?: string;
  description?: string;
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  className,
  showAnimation = false,
  showDownload = true,
  title,
  description
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, we would generate a proper QR code
    // For now, simulating loading state and using placeholder
    setLoading(true);
    
    const timer = setTimeout(() => {
      // We're using a fake URL to simulate a QR code generation
      // In a real app, you'd use a library like qrcode.react
      setQrCodeUrl('/placeholder.svg');
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [value]);

  const handleDownload = () => {
    // In a real app, handle actual download
    console.log('Downloading QR code for', value);
  };

  const handleShare = () => {
    // In a real app, handle actual sharing
    console.log('Sharing QR code for', value);
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      
      <div 
        className={cn(
          'bg-white p-4 rounded-lg shadow-sm', 
          showAnimation && 'qr-scan',
          'transition-all duration-300 ease-in-out',
          loading && 'animate-pulse bg-muted'
        )}
        style={{ width: size, height: size }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <QrCode className="w-12 h-12 text-muted-foreground/30" />
          </div>
        ) : (
          <img 
            src={qrCodeUrl} 
            alt="QR Code"
            className="w-full h-full object-contain" 
          />
        )}
      </div>
      
      {showDownload && !loading && (
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      )}
    </div>
  );
};

export default QRCode;

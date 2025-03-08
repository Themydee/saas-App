
export type UserRole = 'farmer' | 'transporter' | 'warehouse' | 'retailer' | 'consumer' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  password: string; 
  avatar?: string;
  location?: string;
  company?: string;
}



export interface Product {
  id: string;
  name: string;
  type: string;
  variety?: string;
  farmerId: string;
  farmerName: string;
  harvestDate: string;
  origin: string;
  quantity: number;
  unit: string;
  qualityGrade?: string;
  organicCertified: boolean;
  imageUrl?: string;
  qrCode: string;
  currentStatus: 'at-farm' | 'in-transit' | 'in-warehouse' | 'at-retailer' | 'sold';
  currentLocation?: string;
  price?: number;
}

export interface TransitEvent {
  id: string;
  productId: string;
  transporterId: string;
  transporterName: string;
  pickupLocation: string;
  pickupTime: string;
  deliveryLocation: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  status: 'scheduled' | 'in-transit' | 'delivered';
  conditions?: {
    temperature?: number;
    humidity?: number;
  };
  notes?: string;
}

export interface StorageEvent {
  id: string;
  productId: string;
  warehouseId: string;
  warehouseName: string;
  receivedTime: string;
  location: string;
  conditions: {
    temperature: number;
    humidity: number;
  };
  qualityCheck?: {
    status: 'passed' | 'failed';
    notes?: string;
  };
  exitTime?: string;
}

export interface RetailEvent {
  id: string;
  productId: string;
  retailerId: string;
  retailerName: string;
  receivedTime: string;
  location: string;
  price: number;
  soldTime?: string;
  consumerId?: string;
}

export interface ProductJourney {
  product: Product;
  transitEvents: TransitEvent[];
  storageEvents: StorageEvent[];
  retailEvents: RetailEvent[];
}

export interface FeedbackEvent {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  rating: number;
  comment: string;
  timestamp: string;
}

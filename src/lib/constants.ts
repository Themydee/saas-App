
import { User, Product, TransitEvent, StorageEvent, RetailEvent, FeedbackEvent, ProductJourney } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'farmer-1',
    name: 'John Smith',
    role: 'farmer',
    email: 'john.smith@example.com',
    password: 'farmer1234'
  },
  {
    id: 'transporter-1',
    name: 'Sarah Logistics',
    role: 'transporter',
    email: 'sarah@quickdelivery.com',
    password: 'transporter1234'
  },
  {
    id: 'warehouse-1',
    name: 'Michael Storage',
    role: 'warehouse',
    email: 'michael@freshstorage.com',
    password: 'ware1234'
  },
  {
    id: 'retailer-1',
    name: 'Emma Markets',
    role: 'retailer',
    email: 'emma@freshmarkets.com',
    password: 'ret1234'
  },
  {
    id: 'consumer-1',
    name: 'Lisa Consumer',
    role: 'consumer',
    email: 'lisa@example.com',
    password: 'consumer1234'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Organic Apples',
    type: 'Fruit',
    variety: 'Honeycrisp',
    farmerId: 'farmer-1',
    farmerName: 'John Smith',
    harvestDate: '2023-09-15',
    origin: 'Green Valley Farm, California',
    quantity: 500,
    unit: 'kg',
    qualityGrade: 'Premium',
    organicCertified: true,
    imageUrl: '/placeholder.svg',
    qrCode: 'prod-001-qr',
    currentStatus: 'at-retailer',
    currentLocation: 'Fresh Markets, San Francisco',
    price: 2.99
  },
  {
    id: 'prod-002',
    name: 'Fresh Strawberries',
    type: 'Fruit',
    variety: 'Sweet Ruby',
    farmerId: 'farmer-1',
    farmerName: 'John Smith',
    harvestDate: '2023-09-20',
    origin: 'Green Valley Farm, California',
    quantity: 200,
    unit: 'kg',
    qualityGrade: 'Premium',
    organicCertified: true,
    imageUrl: '/placeholder.svg',
    qrCode: 'prod-002-qr',
    currentStatus: 'in-warehouse',
    currentLocation: 'Fresh Storage Solutions, Oakland'
  },
  {
    id: 'prod-003',
    name: 'Fresh Lettuce',
    type: 'Vegetable',
    variety: 'Romaine',
    farmerId: 'farmer-1',
    farmerName: 'John Smith',
    harvestDate: '2023-09-22',
    origin: 'Green Valley Farm, California',
    quantity: 300,
    unit: 'kg',
    qualityGrade: 'Standard',
    organicCertified: true,
    imageUrl: '/placeholder.svg',
    qrCode: 'prod-003-qr',
    currentStatus: 'in-transit',
    currentLocation: 'In transit to Fresh Storage Solutions'
  }
];

export const MOCK_TRANSIT_EVENTS: TransitEvent[] = [
  {
    id: 'transit-001',
    productId: 'prod-001',
    transporterId: 'transporter-1',
    transporterName: 'Sarah Logistics',
    pickupLocation: 'Green Valley Farm, California',
    pickupTime: '2023-09-16T08:30:00Z',
    deliveryLocation: 'Fresh Storage Solutions, Oakland',
    estimatedDeliveryTime: '2023-09-16T14:30:00Z',
    actualDeliveryTime: '2023-09-16T14:15:00Z',
    status: 'delivered',
    conditions: {
      temperature: 4.5,
      humidity: 75
    }
  },
  {
    id: 'transit-002',
    productId: 'prod-001',
    transporterId: 'transporter-1',
    transporterName: 'Sarah Logistics',
    pickupLocation: 'Fresh Storage Solutions, Oakland',
    pickupTime: '2023-09-20T09:00:00Z',
    deliveryLocation: 'Fresh Markets, San Francisco',
    estimatedDeliveryTime: '2023-09-20T11:00:00Z',
    actualDeliveryTime: '2023-09-20T10:45:00Z',
    status: 'delivered',
    conditions: {
      temperature: 4.2,
      humidity: 72
    }
  },
  {
    id: 'transit-003',
    productId: 'prod-002',
    transporterId: 'transporter-1',
    transporterName: 'Sarah Logistics',
    pickupLocation: 'Green Valley Farm, California',
    pickupTime: '2023-09-21T08:00:00Z',
    deliveryLocation: 'Fresh Storage Solutions, Oakland',
    estimatedDeliveryTime: '2023-09-21T14:00:00Z',
    actualDeliveryTime: '2023-09-21T14:30:00Z',
    status: 'delivered',
    conditions: {
      temperature: 4.0,
      humidity: 78
    }
  },
  {
    id: 'transit-004',
    productId: 'prod-003',
    transporterId: 'transporter-1',
    transporterName: 'Sarah Logistics',
    pickupLocation: 'Green Valley Farm, California',
    pickupTime: '2023-09-23T07:30:00Z',
    deliveryLocation: 'Fresh Storage Solutions, Oakland',
    estimatedDeliveryTime: '2023-09-23T13:30:00Z',
    status: 'in-transit',
    conditions: {
      temperature: 4.1,
      humidity: 76
    }
  }
];

export const MOCK_STORAGE_EVENTS: StorageEvent[] = [
  {
    id: 'storage-001',
    productId: 'prod-001',
    warehouseId: 'warehouse-1',
    warehouseName: 'Fresh Storage Solutions',
    receivedTime: '2023-09-16T14:15:00Z',
    location: 'Section A, Shelf 12',
    conditions: {
      temperature: 3.8,
      humidity: 85
    },
    qualityCheck: {
      status: 'passed',
      notes: 'Product in excellent condition'
    },
    exitTime: '2023-09-20T09:00:00Z'
  },
  {
    id: 'storage-002',
    productId: 'prod-002',
    warehouseId: 'warehouse-1',
    warehouseName: 'Fresh Storage Solutions',
    receivedTime: '2023-09-21T14:30:00Z',
    location: 'Section B, Shelf 5',
    conditions: {
      temperature: 4.0,
      humidity: 82
    },
    qualityCheck: {
      status: 'passed',
      notes: 'Product in good condition'
    }
  }
];

export const MOCK_RETAIL_EVENTS: RetailEvent[] = [
  {
    id: 'retail-001',
    productId: 'prod-001',
    retailerId: 'retailer-1',
    retailerName: 'Fresh Markets',
    receivedTime: '2023-09-20T10:45:00Z',
    location: 'Fresh Markets, San Francisco',
    price: 2.99
  }
];

export const MOCK_FEEDBACK: FeedbackEvent[] = [
  {
    id: 'feedback-001',
    productId: 'prod-001',
    userId: 'consumer-1',
    userName: 'Lisa Consumer',
    userRole: 'consumer',
    rating: 5,
    comment: 'These apples are incredibly fresh and tasty!',
    timestamp: '2023-09-22T15:30:00Z'
  }
];

export const getProductJourney = (productId: string): ProductJourney | undefined => {
  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  if (!product) return undefined;
  
  return {
    product,
    transitEvents: MOCK_TRANSIT_EVENTS.filter(e => e.productId === productId),
    storageEvents: MOCK_STORAGE_EVENTS.filter(e => e.productId === productId),
    retailEvents: MOCK_RETAIL_EVENTS.filter(e => e.productId === productId)
  };
};

export const getCurrentUser = (): User => {
  // In a real app, this would be determined by authentication
  return MOCK_USERS[0]; // Default to farmer for this demo
};

export const isUserRole = (role: string): boolean => {
  const currentUser = getCurrentUser();
  return currentUser.role === role;
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

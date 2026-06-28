// the shape of one product row
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: 'Active' | 'Paused' | 'Archived';
}

// sample dataset used to test search, sorting and pagination
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 29,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Office Keyboard',
    category: 'Accessories',
    price: 45,
    status: 'Paused',
  },
  {
    id: 3,
    name: 'USB-C Hub',
    category: 'Electronics',
    price: 59,
    status: 'Active',
  },
  {
    id: 4,
    name: 'Laptop Stand',
    category: 'Office',
    price: 39,
    status: 'Archived',
  },
  {
    id: 5,
    name: 'Noise Cancelling Headset',
    category: 'Audio',
    price: 120,
    status: 'Active',
  },

  {
    id: 6,
    name: 'Bluetooth Speaker',
    category: 'Audio',
    price: 75,
    status: 'Active',
  },
  {
    id: 7,
    name: 'Webcam Full HD',
    category: 'Electronics',
    price: 65,
    status: 'Paused',
  },
  {
    id: 8,
    name: 'Monitor 24 Inch',
    category: 'Electronics',
    price: 180,
    status: 'Active',
  },
  { id: 9, name: 'Desk Lamp', category: 'Office', price: 32, status: 'Active' },
  {
    id: 10,
    name: 'Ergonomic Chair',
    category: 'Office',
    price: 210,
    status: 'Archived',
  },

  {
    id: 11,
    name: 'Portable SSD 1TB',
    category: 'Storage',
    price: 145,
    status: 'Active',
  },
  {
    id: 12,
    name: 'External Hard Drive',
    category: 'Storage',
    price: 89,
    status: 'Paused',
  },
  {
    id: 13,
    name: 'Gaming Mouse Pad',
    category: 'Accessories',
    price: 18,
    status: 'Active',
  },
  {
    id: 14,
    name: 'Laptop Backpack',
    category: 'Accessories',
    price: 55,
    status: 'Active',
  },
  {
    id: 15,
    name: 'Smartphone Stand',
    category: 'Accessories',
    price: 16,
    status: 'Archived',
  },

  {
    id: 16,
    name: 'Wireless Charger',
    category: 'Electronics',
    price: 34,
    status: 'Active',
  },
  {
    id: 17,
    name: 'Tablet Cover',
    category: 'Accessories',
    price: 25,
    status: 'Paused',
  },
  {
    id: 18,
    name: 'HDMI Cable',
    category: 'Cables',
    price: 12,
    status: 'Active',
  },
  {
    id: 19,
    name: 'USB-C Cable',
    category: 'Cables',
    price: 10,
    status: 'Active',
  },
  {
    id: 20,
    name: 'Ethernet Cable',
    category: 'Cables',
    price: 14,
    status: 'Archived',
  },

  {
    id: 21,
    name: 'Smart Watch',
    category: 'Wearables',
    price: 160,
    status: 'Active',
  },
  {
    id: 22,
    name: 'Fitness Tracker',
    category: 'Wearables',
    price: 95,
    status: 'Paused',
  },
  {
    id: 23,
    name: 'Wireless Earbuds',
    category: 'Audio',
    price: 99,
    status: 'Active',
  },
  {
    id: 24,
    name: 'Microphone USB',
    category: 'Audio',
    price: 70,
    status: 'Active',
  },
  {
    id: 25,
    name: 'Ring Light',
    category: 'Office',
    price: 48,
    status: 'Archived',
  },

  { id: 26, name: 'Printer', category: 'Office', price: 135, status: 'Paused' },
  {
    id: 27,
    name: 'Ink Cartridge',
    category: 'Office',
    price: 28,
    status: 'Active',
  },
  {
    id: 28,
    name: 'Power Bank',
    category: 'Electronics',
    price: 42,
    status: 'Active',
  },
  {
    id: 29,
    name: 'Travel Adapter',
    category: 'Accessories',
    price: 22,
    status: 'Active',
  },
  {
    id: 30,
    name: 'Cable Organizer',
    category: 'Accessories',
    price: 11,
    status: 'Archived',
  },
];

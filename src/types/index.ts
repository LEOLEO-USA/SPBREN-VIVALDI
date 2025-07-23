export interface Property {
  id: string;
  title: string;
  price: number;
  bedrooms: number | string;
  bathrooms: number | string;
  area: number;
  status: 'available' | 'limited' | 'booked';
  images: string[];
  amenities: string[];
  address: string;
  lat: number;
  lng: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface Statistic {
  label: string;
  value: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt?: any;
  updatedAt?: any;
}

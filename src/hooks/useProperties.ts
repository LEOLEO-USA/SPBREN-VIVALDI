import { useState, useEffect } from 'react';

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
}

// Sample data
const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Студия в центре Санкт-Петербурга',
    price: 45000,
    bedrooms: '1К',
    bathrooms: 1,
    area: 35,
    status: 'available',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'Кондиционер', 'Стиральная машина'],
    address: 'Невский проспект, 100',
    lat: 59.9311,
    lng: 30.3609,
  },
  {
    id: '2',
    title: 'Двухкомнатная квартира у метро',
    price: 65000,
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    status: 'limited',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'Отопление', 'Кухня', 'Паркинг'],
    address: 'Московский проспект, 50',
    lat: 59.8944,
    lng: 30.3194,
  },
  {
    id: '3',
    title: 'Трёхкомнатная квартира с видом на Неву',
    price: 95000,
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    status: 'booked',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'Отопление', 'Кондиционер', 'Вид на реку', 'Балкон'],
    address: 'Дворцовая набережная, 25',
    lat: 59.9398,
    lng: 30.3158,
  },
];

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperties(sampleProperties);
      setLoading(false);
    }, 500);
  }, []);

  return { properties, loading, setProperties };
}

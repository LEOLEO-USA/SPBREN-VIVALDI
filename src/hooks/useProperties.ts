import { useState, useEffect } from 'react';
import {
  getProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  subscribeToProperties,
  initializeSampleData
} from '@/lib/firebase';
import { Property } from '@/types';

// Sample data for fallback
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Initialize sample data if needed
        await initializeSampleData();

        // Set up real-time listener with timeout
        let timeoutId: NodeJS.Timeout;

        unsubscribe = subscribeToProperties((updatedProperties) => {
          clearTimeout(timeoutId);
          setProperties(updatedProperties);
          setLoading(false);

          // If no data received, set timeout for fallback
          if (updatedProperties.length === 0) {
            timeoutId = setTimeout(() => {
              console.log('No Firebase data found after timeout, using local fallback');
              setProperties(sampleProperties);
            }, 3000);
          }
        });

        // Set initial timeout for fallback
        timeoutId = setTimeout(() => {
          console.log('Firebase connection timeout, using local fallback');
          setProperties(sampleProperties);
          setLoading(false);
        }, 3000);

      } catch (err) {
        console.error('Error initializing properties:', err);
        setError('Ошибка загрузки данных из Firebase. Используются локальные данные.');

        // Use local fallback data
        setProperties(sampleProperties);
        setLoading(false);
      }
    };

    initializeData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const createProperty = async (propertyData: Omit<Property, 'id'>) => {
    try {
      const id = await addProperty(propertyData);
      if (!id) {
        throw new Error('Failed to create property');
      }
      return id;
    } catch (err) {
      console.error('Error creating property:', err);
      setError('Ошибка создания объекта');
      throw err;
    }
  };

  const editProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const success = await updateProperty(id, updates);
      if (!success) {
        throw new Error('Failed to update property');
      }
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Ошибка обновления объекта');
      throw err;
    }
  };

  const removeProperty = async (id: string) => {
    try {
      const success = await deleteProperty(id);
      if (!success) {
        throw new Error('Failed to delete property');
      }
    } catch (err) {
      console.error('Error deleting property:', err);
      setError('Ошибка удаления объекта');
      throw err;
    }
  };

  return { 
    properties, 
    loading, 
    error,
    createProperty,
    editProperty,
    removeProperty,
    setProperties 
  };
}

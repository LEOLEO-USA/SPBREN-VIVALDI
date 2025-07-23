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

        // Set up real-time listener
        unsubscribe = subscribeToProperties((updatedProperties) => {
          setProperties(updatedProperties);
          setLoading(false);
        });

      } catch (err) {
        console.error('Error initializing properties:', err);
        setError('Ошибка загрузки данных');
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

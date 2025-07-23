import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Property, Booking } from '@/types';

// Properties Collection
export const PROPERTIES_COLLECTION = 'properties';
export const BOOKINGS_COLLECTION = 'bookings';
export const STATISTICS_COLLECTION = 'statistics';

// Property operations
export const getProperties = async (): Promise<Property[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PROPERTIES_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
  } catch (error) {
    console.error('Error getting properties:', error);
    return [];
  }
};

export const addProperty = async (property: Omit<Property, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, PROPERTIES_COLLECTION), {
      ...property,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding property:', error);
    return null;
  }
};

export const updateProperty = async (id: string, updates: Partial<Property>): Promise<boolean> => {
  try {
    await updateDoc(doc(db, PROPERTIES_COLLECTION, id), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating property:', error);
    return false;
  }
};

export const deleteProperty = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, PROPERTIES_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting property:', error);
    return false;
  }
};

// Booking operations
export const getBookings = async (): Promise<Booking[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
};

export const addBooking = async (booking: Omit<Booking, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
      ...booking,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding booking:', error);
    return null;
  }
};

export const updateBooking = async (id: string, updates: Partial<Booking>): Promise<boolean> => {
  try {
    await updateDoc(doc(db, BOOKINGS_COLLECTION, id), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating booking:', error);
    return false;
  }
};

export const deleteBooking = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, BOOKINGS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
};

// Real-time listeners
export const subscribeToProperties = (
  callback: (properties: Property[]) => void
): (() => void) => {
  const unsubscribe = onSnapshot(
    collection(db, PROPERTIES_COLLECTION),
    (snapshot: QuerySnapshot<DocumentData>) => {
      const properties = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Property));
      callback(properties);
    },
    (error) => {
      console.error('Error in properties subscription:', error);
    }
  );

  return unsubscribe;
};

export const subscribeToBookings = (
  callback: (bookings: Booking[]) => void
): (() => void) => {
  const unsubscribe = onSnapshot(
    collection(db, BOOKINGS_COLLECTION),
    (snapshot: QuerySnapshot<DocumentData>) => {
      const bookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
      callback(bookings);
    },
    (error) => {
      console.error('Error in bookings subscription:', error);
    }
  );

  return unsubscribe;
};

// Utility function to initialize sample data
export const initializeSampleData = async () => {
  try {
    // Check if data already exists
    const propertiesSnapshot = await getDocs(collection(db, PROPERTIES_COLLECTION));
    
    if (propertiesSnapshot.empty) {
      // Add sample properties
      const sampleProperties = [
        {
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

      for (const property of sampleProperties) {
        await addProperty(property);
      }

      console.log('Sample properties added to Firebase');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

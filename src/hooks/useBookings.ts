import { useState, useEffect } from 'react';
import { 
  getBookings, 
  addBooking, 
  updateBooking, 
  deleteBooking,
  subscribeToBookings 
} from '@/lib/firebase';
import { Booking } from '@/types';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initializeBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Set up real-time listener
        unsubscribe = subscribeToBookings((updatedBookings) => {
          setBookings(updatedBookings);
          setLoading(false);
        });

      } catch (err) {
        console.error('Error initializing bookings:', err);
        setError('Ошибка загрузки бронирований');
        setLoading(false);
      }
    };

    initializeBookings();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const createBooking = async (bookingData: Omit<Booking, 'id'>) => {
    try {
      const id = await addBooking(bookingData);
      if (!id) {
        throw new Error('Failed to create booking');
      }
      return id;
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Ошибка создания бронирования');
      throw err;
    }
  };

  const editBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      const success = await updateBooking(id, updates);
      if (!success) {
        throw new Error('Failed to update booking');
      }
    } catch (err) {
      console.error('Error updating booking:', err);
      setError('Ошибка обновления бронирования');
      throw err;
    }
  };

  const removeBooking = async (id: string) => {
    try {
      const success = await deleteBooking(id);
      if (!success) {
        throw new Error('Failed to delete booking');
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Ошибка удаления бронирования');
      throw err;
    }
  };

  return { 
    bookings, 
    loading, 
    error,
    createBooking,
    editBooking,
    removeBooking,
    setBookings 
  };
}

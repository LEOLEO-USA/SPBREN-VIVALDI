import { useState, useEffect } from 'react';

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
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings([
        {
          id: 'b1',
          propertyId: '1',
          guestName: 'Иван Петров',
          email: 'ivan@example.com',
          phone: '+7 (900) 123-45-67',
          checkIn: '2024-01-15',
          checkOut: '2024-02-15',
          status: 'confirmed',
          totalPrice: 45000,
        },
        {
          id: 'b2',
          propertyId: '2',
          guestName: 'Мария Сидорова',
          email: 'maria@example.com',
          phone: '+7 (900) 765-43-21',
          checkIn: '2024-02-01',
          checkOut: '2024-03-01',
          status: 'pending',
          totalPrice: 65000,
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { bookings, loading, setBookings };
}

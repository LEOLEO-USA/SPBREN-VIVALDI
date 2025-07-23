import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { Property } from "@/types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export function BookingModal({ isOpen, onClose, property }: BookingModalProps) {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const { createBooking } = useBookings();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBooking({
        propertyId: property.id,
        guestName,
        email,
        phone,
        checkIn,
        checkOut,
        status: 'pending',
        totalPrice: property.price,
      });

      // Reset form
      setGuestName("");
      setEmail("");
      setPhone("");
      setCheckIn("");
      setCheckOut("");

      onClose();
      alert("Заявка на бронирование отправлена!");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Ошибка при отправке заявки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Бронирование</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-4">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold">{property.title}</h3>
            <p className="text-brand-orange font-bold">
              {property.price.toLocaleString("ru-RU")} ₽/мес
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Имя</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Ваше имя"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Телефон</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Заезд</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Выезд</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Отмена
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-brand-orange hover:bg-brand-500"
                disabled={loading}
              >
                {loading ? "Отправляем..." : "Отправить заявку"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

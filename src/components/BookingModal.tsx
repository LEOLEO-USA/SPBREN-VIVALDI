import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  images: string[];
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export function BookingModal({ isOpen, onClose, property }: BookingModalProps) {
  if (!isOpen) return null;

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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Имя</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Телефон</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Отмена
            </Button>
            <Button className="flex-1 bg-brand-orange hover:bg-brand-500">
              Отправить заявку
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

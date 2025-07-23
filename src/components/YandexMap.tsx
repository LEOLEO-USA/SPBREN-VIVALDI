interface Property {
  id: string;
  title: string;
  price: number;
  status: "available" | "limited" | "booked";
  lat: number;
  lng: number;
  address: string;
}

interface YandexMapProps {
  properties: Property[];
  onPropertySelect?: (propertyId: string) => void;
  height?: string;
}

export function YandexMap({ properties, onPropertySelect, height = "400px" }: YandexMapProps) {
  return (
    <div className="w-full bg-neutral-100 rounded-lg flex items-center justify-center" style={{ height }}>
      <div className="text-center text-neutral-500">
        <div className="text-4xl mb-2">🗺️</div>
        <div className="text-sm">
          Яндекс.Карта загружается...
        </div>
        <div className="text-xs mt-1 text-neutral-400">
          {properties.length} объект{properties.length === 1 ? "" : properties.length < 5 ? "а" : "ов"} на к��рте
        </div>
      </div>
    </div>
  );
}

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

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

const statusColors = {
  available: '#22c55e',    // Green
  limited: '#f39c12',      // Orange  
  booked: '#e74c3c'        // Red
};

export function YandexMap({ properties, onPropertySelect, height = "400px" }: YandexMapProps) {
  const handlePlacemarkClick = (propertyId: string) => {
    onPropertySelect?.(propertyId);
  };

  // Center map on Saint Petersburg
  const mapCenter = [59.9311, 30.3609];
  const mapZoom = 11;

  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ height }}>
      <YMaps
        query={{
          apikey: 'e07b0ca7-5652-436b-b92f-0e83397a5f53',
          lang: 'ru_RU',
        }}
      >
        <Map
          defaultState={{
            center: mapCenter,
            zoom: mapZoom,
          }}
          width="100%"
          height={height}
          options={{
            suppressMapOpenBlock: true,
          }}
        >
          {properties.map((property) => (
            <Placemark
              key={property.id}
              geometry={[property.lat, property.lng]}
              properties={{
                balloonContentHeader: property.title,
                balloonContentBody: `
                  <div>
                    <p><strong>Цена:</strong> ${property.price.toLocaleString('ru-RU')} ₽/мес</p>
                    <p><strong>Адрес:</strong> ${property.address}</p>
                    <p><strong>Статус:</strong> ${getStatusText(property.status)}</p>
                  </div>
                `,
                iconCaption: `${property.price.toLocaleString('ru-RU')} ₽`,
              }}
              options={{
                preset: 'islands#circleIcon',
                iconColor: statusColors[property.status],
                iconCaptionMaxWidth: '100',
              }}
              onClick={() => handlePlacemarkClick(property.id)}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
}

function getStatusText(status: string): string {
  switch (status) {
    case 'available':
      return 'Доступно';
    case 'limited':
      return 'Ограничено';
    case 'booked':
      return 'Забронировано';
    default:
      return status;
  }
}

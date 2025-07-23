import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { YANDEX_MAPS_CONFIG, MAP_STYLES } from '@/config/yandex';

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
  const handlePlacemarkClick = (propertyId: string) => {
    onPropertySelect?.(propertyId);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ height }}>
      <YMaps
        query={{
          apikey: YANDEX_MAPS_CONFIG.apiKey,
          lang: YANDEX_MAPS_CONFIG.language,
        }}
      >
        <Map
          defaultState={{
            center: YANDEX_MAPS_CONFIG.defaultCenter,
            zoom: YANDEX_MAPS_CONFIG.defaultZoom,
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
                  <div style="max-width: 200px;">
                    <p><strong>Цена:</strong> ${property.price.toLocaleString('ru-RU')} ₽/мес</p>
                    <p><strong>Адрес:</strong> ${property.address}</p>
                    <p><strong>Статус:</strong> ${MAP_STYLES.statusLabels[property.status]}</p>
                  </div>
                `,
                iconCaption: `${property.price.toLocaleString('ru-RU')} ₽`,
              }}
              options={{
                preset: 'islands#circleIcon',
                iconColor: MAP_STYLES.statusColors[property.status],
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

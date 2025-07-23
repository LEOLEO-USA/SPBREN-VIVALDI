export const YANDEX_MAPS_CONFIG = {
  apiKey: 'e07b0ca7-5652-436b-b92f-0e83397a5f53',
  language: 'ru_RU',
  defaultCenter: [59.9311, 30.3609] as [number, number], // Saint Petersburg
  defaultZoom: 11,
};

export const MAP_STYLES = {
  statusColors: {
    available: '#22c55e',    // Green
    limited: '#f39c12',      // Orange  
    booked: '#e74c3c'        // Red
  },
  statusLabels: {
    available: 'Доступно',
    limited: 'Ограничено',
    booked: 'Забронировано'
  }
};

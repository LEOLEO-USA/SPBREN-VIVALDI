import { useState, useEffect } from 'react';

interface Statistic {
  label: string;
  value: string;
}

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStatistics([
        { label: 'Всего объектов', value: '150+' },
        { label: 'Довольных клиентов', value: '1,200+' },
        { label: 'Городов', value: '5' },
        { label: 'Лет работы', value: '8' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return { statistics, loading };
}

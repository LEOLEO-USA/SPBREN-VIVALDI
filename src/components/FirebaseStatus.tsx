import { useState, useEffect } from 'react';
import { testFirebaseConnection } from '@/lib/firebase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FirebaseStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      const connected = await testFirebaseConnection();
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const getStatusIcon = () => {
    if (isLoading) return '🔄';
    if (isConnected === null) return '❓';
    return isConnected ? '✅' : '❌';
  };

  const getStatusText = () => {
    if (isLoading) return 'Проверка подключения...';
    if (isConnected === null) return 'Неизвестно';
    return isConnected ? 'Firebase подключен' : 'Firebase недоступен';
  };

  const getStatusColor = () => {
    if (isLoading || isConnected === null) return 'text-neutral-600';
    return isConnected ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card className="p-4 mb-4 bg-neutral-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getStatusIcon()}</span>
          <div>
            <div className={`font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
            {!isConnected && isConnected !== null && (
              <div className="text-sm text-neutral-500">
                Используются локальные данные
              </div>
            )}
          </div>
        </div>
        
        <Button
          onClick={checkConnection}
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          {isLoading ? 'Проверка...' : 'Проверить'}
        </Button>
      </div>
      
      {!isConnected && isConnected !== null && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <strong>Для подключения к Firebase:</strong>
          <ol className="mt-2 space-y-1 text-xs">
            <li>1. Перейдите в <a href="https://console.firebase.google.com/project/spbrent2025/firestore/rules" target="_blank" className="text-blue-600 underline">Firebase Console</a></li>
            <li>2. Откройте раздел Firestore Database → Rules</li>
            <li>3. Замените правила на: <code className="bg-gray-100 px-1">allow read, write: if true;</code></li>
          </ol>
        </div>
      )}
    </Card>
  );
}

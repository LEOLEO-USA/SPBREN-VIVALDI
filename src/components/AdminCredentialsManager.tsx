import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { updateAdminCredentials, getAdminCredentials, AdminCredentials } from '../lib/adminCredentials';
import { Settings, Save, Eye, EyeOff } from 'lucide-react';

export function AdminCredentialsManager() {
  const [credentials, setCredentials] = useState<AdminCredentials | null>(null);
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    setLoading(true);
    try {
      const creds = await getAdminCredentials();
      if (creds) {
        setCredentials(creds);
        setNewLogin(creds.login);
        setNewPassword(creds.password);
      }
    } catch (error) {
      console.error('Ошибка загрузки учетных данных:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newLogin.trim() || !newPassword.trim()) {
      setMessage('Логин и пароль не могут быть пустыми');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const success = await updateAdminCredentials(newLogin.trim(), newPassword.trim());
      if (success) {
        setMessage('Учетные данные успешно обновлены');
        await loadCredentials();
      } else {
        setMessage('Ошибка обновления учетных данных');
      }
    } catch (error) {
      setMessage('Ошибка при сохранении');
      console.error('Ошибка сохранения:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Управление учетными данными
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Загрузка...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Управление учетными данными
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {credentials && (
          <div className="text-sm text-neutral-600 mb-4">
            Последнее обновление: {credentials.updatedAt.toLocaleString('ru-RU')}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Логин администратора
            </label>
            <input
              type="text"
              value={newLogin}
              onChange={(e) => setNewLogin(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите логин"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Пароль администратора
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Введите пароль"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className={`text-sm p-3 rounded-md ${
            message.includes('успешно') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>

        <div className="text-xs text-neutral-500 mt-4">
          <strong>Внимание:</strong> После изменения учетных данных потребуется войти в систему заново.
        </div>
      </CardContent>
    </Card>
  );
}

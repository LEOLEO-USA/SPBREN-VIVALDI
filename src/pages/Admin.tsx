import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useProperties";
import { useBookings } from "@/hooks/useBookings";
import { AdminCredentialsManager } from "@/components/AdminCredentialsManager";
import {
  Home,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  MapPin
} from "lucide-react";

export default function Admin() {
  const { properties } = useProperties();
  const { bookings } = useBookings();

  // Calculate statistics
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const bookedCount = properties.filter(p => p.status === 'booked').length;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="flex-1">
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-8xl mx-auto px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Панель администратора
              </h1>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Управление объектами недвижимости и системой аренды
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-8xl mx-auto px-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">
                      Всего объектов
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {properties.length}
                    </p>
                  </div>
                  <Home className="w-8 h-8 text-blue-600" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">
                      Активные аренды
                    </p>
                    <p className="text-2xl font-bold text-green-900">
                      {bookedCount}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">
                      Доход в месяц
                    </p>
                    <p className="text-2xl font-bold text-orange-900">
                      ₽{totalRevenue.toLocaleString("ru-RU")}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">
                      Заявки на бронирование
                    </p>
                    <p className="text-2xl font-bold text-purple-900">
                      {bookings.length}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Управление объектами
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-600">
                    Добавляйте, редактируйте и управляйте объектами недвижимости
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full bg-brand-orange hover:bg-brand-500">
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить объект
                    </Button>
                    <Button variant="outline" className="w-full">
                      Просмотреть все объекты
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Бронирования
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-600">
                    Просматривайте и управляйте заявками на бронирование
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Новые заявки ({bookings.filter(b => b.status === 'pending').length})
                    </Button>
                    <Button variant="outline" className="w-full">
                      Все бронирования
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Аналитика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-600">
                    Просматривайте статистику и отчеты
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Отчет по доходам
                    </Button>
                    <Button variant="outline" className="w-full">
                      Статистика заполненности
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    На��тройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-600">
                    Настройки системы и конфигурация
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Общие настройки
                    </Button>
                    <Button variant="outline" className="w-full">
                      Интеграции
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

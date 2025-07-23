import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { YandexMap } from "@/components/YandexMap";
import { MapSidebar } from "@/components/MapSidebar";
import { useProperties } from "@/hooks/useProperties";

export default function Map() {
  const { properties } = useProperties();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="flex-1">
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-8xl mx-auto px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Интерактивная карта объектов
              </h1>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Исследуйте все доступные квартиры на карте Санкт-Петербурга.
                Выберите удоб��ое расположение и найдите идеальное жилье рядом с
                работой, учебой или любимыми местами.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-8xl mx-auto px-8">
            <div className="flex gap-6 h-[600px]">
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
                <YandexMap properties={properties} />
              </div>

              <div className="w-80 flex-shrink-0">
                <MapSidebar properties={properties} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-8xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗺️</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Точные координаты
                </h3>
                <p className="text-neutral-600 text-sm">
                  Все объекты отмечены с точными координатами на карте Яндекс
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Фильтрация
                </h3>
                <p className="text-neutral-600 text-sm">
                  Фильтруйте объекты по статусу, цене и другим параметрам
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Инфраструктура
                </h3>
                <p className="text-neutral-600 text-sm">
                  Смотрите ближайшие станции метро, магазины и другие объекты
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DynamicContent() {
  const { pageId } = useParams();

  const getContent = (id: string) => {
    switch (id) {
      case "details":
        return {
          title: "Детали квартир",
          content: (
            <div className="space-y-6">
              <p className="text-lg text-neutral-600">
                Подробная информация о наших квартирах и услугах аренды.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Процесс аренды</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-neutral-600">
                      <li>• Выбор квартиры из каталога</li>
                      <li>• Просмотр объекта</li>
                      <li>• Подписание договора</li>
                      <li>• Заселение</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Что включено</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-neutral-600">
                      <li>• Полностью меблированные квартиры</li>
                      <li>• Интернет и коммунальные услуги</li>
                      <li>• Клининг раз в неделю</li>
                      <li>• Техническая поддержка 24/7</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ),
        };
      case "contacts":
        return {
          title: "Контакты",
          content: (
            <div className="space-y-6">
              <p className="text-lg text-neutral-600">
                Свяжитесь с нами любым удобным способом.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Офис в Санкт-Петербурге</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p><strong>Адрес:</strong> Невский проспект, 100</p>
                    <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
                    <p><strong>Email:</strong> info@rental-hub.ru</p>
                    <p><strong>Время работы:</strong> Пн-Пт 9:00-20:00</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Экстренная связь</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p><strong>Горячая линия:</strong> +7 (800) 555-55-55</p>
                    <p><strong>Telegram:</strong> @rental_support</p>
                    <p><strong>WhatsApp:</strong> +7 (900) 123-45-67</p>
                    <p><strong>Поддержка:</strong> 24/7</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ),
        };
      default:
        return {
          title: "Страница не найдена",
          content: (
            <p className="text-lg text-neutral-600">
              Запрошенная страница не существует.
            </p>
          ),
        };
    }
  };

  const content = getContent(pageId || "");

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="flex-1">
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-8xl mx-auto px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                {content.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-8xl mx-auto px-8">
            {content.content}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

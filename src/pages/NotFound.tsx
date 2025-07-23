import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-brand-orange mb-4">404</div>
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
          Страница не найдена
        </h1>
        <p className="text-neutral-600 mb-8">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-brand-orange hover:bg-brand-500"
        >
          <Home className="w-4 h-4 mr-2" />
          На главную
        </Button>
      </div>
    </div>
  );
}

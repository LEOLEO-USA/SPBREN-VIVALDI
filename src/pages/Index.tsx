import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>SPB Rent Archive</CardTitle>
          <CardDescription>
            Добро пожаловать в архив аренды Санкт-Петербурга
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Начать работу</Button>
        </CardContent>
      </Card>
    </div>
  );
}

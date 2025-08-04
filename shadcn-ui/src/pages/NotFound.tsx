import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-4xl font-bold mb-2">404 - Seite nicht gefunden</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Die von dir gesuchte Seite konnte leider nicht gefunden werden.
        </p>
        <Button asChild>
          <Link to="/">Zurück zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
}
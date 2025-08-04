import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Schiedsrichter Vereinigung Wolfsburg. Alle Rechte vorbehalten.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Datenschutz
          </Link>
          <Link to="/imprint" className="text-sm text-muted-foreground hover:text-foreground">
            Impressum
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Kontakt
          </Link>
        </div>
      </div>
    </footer>
  );
}
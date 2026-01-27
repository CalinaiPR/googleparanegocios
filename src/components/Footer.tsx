import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-foreground">
      <div className="container px-6">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">
              Calina – Especialista em Visibilidade Local no Google
            </span>
          </div>
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const FinalCTA = () => {
  const whatsappLink = "https://wa.me/5521980079983?text=Olá Calina! Quero aparecer no Google";

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Quer ser encontrado por quem já está procurando por você?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Vamos conversar e descobrir como posicionar melhor o seu negócio no Google.
          </p>
          <Button
            asChild
            size="lg"
            className="text-lg px-10 py-7 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-6 h-6 mr-2" />
              Falar com Calina no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

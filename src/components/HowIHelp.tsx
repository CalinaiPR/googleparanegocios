import { MapPin, Settings, TrendingUp } from "lucide-react";

const services = [
  {
    icon: MapPin,
    title: "Criação e otimização",
    description: "Google Meu Negócio configurado do zero ou otimizado para máximo desempenho.",
  },
  {
    icon: Settings,
    title: "Estruturação profissional",
    description: "Perfil completo com fotos, informações e categorias corretas.",
  },
  {
    icon: TrendingUp,
    title: "Mais visibilidade",
    description: "Apareça para mais clientes locais que buscam seus serviços.",
  },
];

const HowIHelp = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Como eu ajudo
          </h2>
          <p className="text-lg text-muted-foreground">
            Organizo e otimizo perfis no Google Meu Negócio para que empresas 
            apareçam melhor nas buscas locais, no Google Maps e recebam mais 
            contatos todos os dias.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIHelp;

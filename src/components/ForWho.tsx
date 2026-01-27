import { Building2, Scissors, Stethoscope, UtensilsCrossed, Wrench, Store } from "lucide-react";

const businesses = [
  { icon: Stethoscope, label: "Clínicas" },
  { icon: Scissors, label: "Salões" },
  { icon: UtensilsCrossed, label: "Restaurantes" },
  { icon: Wrench, label: "Prestadores" },
  { icon: Building2, label: "Consultórios" },
  { icon: Store, label: "Comércios" },
];

const ForWho = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Para quem é
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Ideal para profissionais e empresas locais como clínicas, consultórios, 
            salões, restaurantes, prestadores de serviço e comércios em geral.
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
            {businesses.map((business, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-accent transition-colors duration-300"
              >
                <business.icon className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {business.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;

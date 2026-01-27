import { Check } from "lucide-react";

const reasons = [
  "Pessoas procuram serviços no Google todos os dias",
  "Quem aparece primeiro vende mais",
  "O Google mostra quem está melhor estruturado",
  "Seu perfil pode trabalhar por você 24h por dia",
];

const WhyItWorks = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Por que funciona
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium pt-1">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;

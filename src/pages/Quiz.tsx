import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

type QuizData = {
  nome: string;
  whatsapp: string;
  perfilGoogle: string;
  segmento: string;
  cidadeBairro: string;
  fonteClientes: string;
  investimento: string;
  email: string;
};

const TOTAL_STEPS = 9; // 7 questions + confirmation + thank you

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [rejected, setRejected] = useState(false);
  const [finished, setFinished] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<QuizData>({
    nome: "",
    whatsapp: "",
    perfilGoogle: "",
    segmento: "",
    cidadeBairro: "",
    fonteClientes: "",
    investimento: "",
    email: "",
  });

  const updateField = (field: keyof QuizData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 13;
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!data.nome.trim()) newErrors.nome = "Por favor, insira seu nome.";
        break;
      case 2:
        if (!data.whatsapp.trim()) newErrors.whatsapp = "Por favor, insira seu WhatsApp.";
        else if (!validatePhone(data.whatsapp)) newErrors.whatsapp = "Formato inválido. Ex: (21) 99999-9999";
        break;
      case 3:
        if (!data.perfilGoogle) newErrors.perfilGoogle = "Selecione uma opção.";
        break;
      case 4:
        if (!data.segmento.trim()) newErrors.segmento = "Por favor, insira o segmento.";
        break;
      case 5:
        if (!data.cidadeBairro.trim()) newErrors.cidadeBairro = "Por favor, insira sua cidade e bairro.";
        break;
      case 6:
        if (!data.fonteClientes) newErrors.fonteClientes = "Selecione uma opção.";
        break;
      case 8:
        if (!data.email.trim()) newErrors.email = "Por favor, insira seu e-mail.";
        else if (!validateEmail(data.email)) newErrors.email = "Formato de e-mail inválido.";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step, data]);

  const next = () => {
    if (!validateStep()) return;

    if (step === 7) {
      if (data.investimento === "nao") {
        setRejected(true);
        return;
      }
    }

    if (step === 8) {
      // Log all data
      console.log("📋 Lead qualificado:", data);
      setStep(9);
      return;
    }

    setStep((s) => s + 1);
  };

  const back = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const restart = () => {
    setStep(1);
    setRejected(false);
    setFinished(false);
    setData({
      nome: "",
      whatsapp: "",
      perfilGoogle: "",
      segmento: "",
      cidadeBairro: "",
      fonteClientes: "",
      investimento: "",
      email: "",
    });
    setErrors({});
  };

  const progressPercent = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);

  // Rejected screen
  if (rejected && !finished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <XCircle className="w-16 h-16 text-destructive mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            Lamentamos muito, neste momento nosso serviço pode não ser o mais indicado pra sua realidade financeira.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Prezamos pela saúde financeira dos nossos clientes e, com base nas suas respostas, entendemos que agora talvez não seja o melhor momento para investir nesse tipo de serviço.
          </p>
          <p className="text-muted-foreground text-sm">
            Mesmo assim, vamos continuar compartilhando dicas gratuitas para te ajudar a fortalecer sua presença no Google ao longo do tempo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button onClick={restart} size="lg" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Quero tentar novamente
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setFinished(true)}
            >
              Agora não está no meu orçamento
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Finished (after rejection)
  if (finished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Obrigado pela sinceridade!</h2>
          <p className="text-muted-foreground">
            Desejamos sucesso na sua jornada. Quando sentir que é o momento certo, estaremos aqui para te ajudar.
          </p>
          <Link to="/">
            <Button size="lg" className="mt-4">Voltar para o site principal</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Thank you screen (step 9)
  if (step === 9) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Obrigado, {data.nome}!
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Recebi suas respostas. Vou analisar o seu caso e entrar em contato pelo WhatsApp ou e-mail em até <strong className="text-foreground">24 horas</strong> para te explicar os próximos passos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link to="/">
              <Button variant="outline" size="lg">
                Voltar para o site principal
              </Button>
            </Link>
            <a
              href="https://wa.me/5521980079983?text=Olá! Acabei de preencher o quiz e gostaria de saber mais."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp agora
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-secondary h-2">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-r-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full">
          {/* Step indicator */}
          <p className="text-sm text-muted-foreground mb-8 text-center">
            Passo {step} de 8
          </p>

          {/* Step 1 - Nome */}
          {step === 1 && (
            <StepWrapper>
              <StepTitle>Qual o seu nome?</StepTitle>
              <Input
                placeholder="Seu nome completo"
                value={data.nome}
                onChange={(e) => updateField("nome", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                autoFocus
                className="text-base h-12"
              />
              <StepError message={errors.nome} />
            </StepWrapper>
          )}

          {/* Step 2 - WhatsApp */}
          {step === 2 && (
            <StepWrapper>
              <StepTitle>Qual número de WhatsApp podemos usar pra falar com você?</StepTitle>
              <Input
                placeholder="(21) 99999-9999"
                value={data.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                autoFocus
                className="text-base h-12"
                type="tel"
              />
              <StepError message={errors.whatsapp} />
            </StepWrapper>
          )}

          {/* Step 3 - Perfil Google */}
          {step === 3 && (
            <StepWrapper>
              <StepTitle>Sua empresa já tem perfil no Google?</StepTitle>
              <div className="space-y-3">
                <OptionButton
                  selected={data.perfilGoogle === "desatualizado"}
                  onClick={() => updateField("perfilGoogle", "desatualizado")}
                >
                  Sim, mas está desatualizado
                </OptionButton>
                <OptionButton
                  selected={data.perfilGoogle === "nao_tenho"}
                  onClick={() => updateField("perfilGoogle", "nao_tenho")}
                >
                  Não, ainda não tenho
                </OptionButton>
              </div>
              <StepError message={errors.perfilGoogle} />
            </StepWrapper>
          )}

          {/* Step 4 - Segmento */}
          {step === 4 && (
            <StepWrapper>
              <StepTitle>Qual é o segmento da sua empresa?</StepTitle>
              <Input
                placeholder="Ex.: terapeuta, clínica, salão, restaurante…"
                value={data.segmento}
                onChange={(e) => updateField("segmento", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                autoFocus
                className="text-base h-12"
              />
              <StepError message={errors.segmento} />
            </StepWrapper>
          )}

          {/* Step 5 - Cidade/Bairro */}
          {step === 5 && (
            <StepWrapper>
              <StepTitle>Você atende em qual cidade e bairro?</StepTitle>
              <Input
                placeholder="Ex.: Rio de Janeiro, Copacabana"
                value={data.cidadeBairro}
                onChange={(e) => updateField("cidadeBairro", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                autoFocus
                className="text-base h-12"
              />
              <StepError message={errors.cidadeBairro} />
            </StepWrapper>
          )}

          {/* Step 6 - Fonte de clientes */}
          {step === 6 && (
            <StepWrapper>
              <StepTitle>Hoje, você recebe mais clientes pela internet ou por indicação?</StepTitle>
              <div className="space-y-3">
                <OptionButton
                  selected={data.fonteClientes === "internet"}
                  onClick={() => updateField("fonteClientes", "internet")}
                >
                  Mais pela internet
                </OptionButton>
                <OptionButton
                  selected={data.fonteClientes === "indicacao"}
                  onClick={() => updateField("fonteClientes", "indicacao")}
                >
                  Mais por indicação
                </OptionButton>
                <OptionButton
                  selected={data.fonteClientes === "poucos"}
                  onClick={() => updateField("fonteClientes", "poucos")}
                >
                  Quase não recebo clientes novos
                </OptionButton>
              </div>
              <StepError message={errors.fonteClientes} />
            </StepWrapper>
          )}

          {/* Step 7 - Investimento */}
          {step === 7 && (
            <StepWrapper>
              <StepTitle>
                Você teria condições de investir a partir de R$&nbsp;497,00 em um serviço profissional para criar/organizar seu perfil no Google?
              </StepTitle>
              <div className="space-y-3">
                <OptionButton
                  selected={data.investimento === "sim"}
                  onClick={() => updateField("investimento", "sim")}
                >
                  SIM, esse valor faz sentido pra mim
                </OptionButton>
                <OptionButton
                  selected={data.investimento === "nao"}
                  onClick={() => updateField("investimento", "nao")}
                >
                  NÃO, esse valor não cabe no meu orçamento agora
                </OptionButton>
              </div>
              <StepError message={errors.investimento} />
            </StepWrapper>
          )}

          {/* Step 8 - Confirmação + Email */}
          {step === 8 && (
            <StepWrapper>
              <div className="bg-accent/50 rounded-xl p-6 mb-6 text-center">
                <p className="text-3xl mb-3">🙌</p>
                <h3 className="text-xl font-bold text-foreground mb-3">Perfeito!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  O investimento para a criação/atualização completa do seu perfil no Google Meu Negócio é de{" "}
                  <strong className="text-foreground">R$&nbsp;497,00</strong>.
                  Esse é um valor único pra te deixar com o perfil pronto, configurado e otimizado pra começar a ser encontrado quando alguém buscar pelo seu serviço no Google.
                </p>
              </div>
              <StepTitle>Insira o melhor e-mail para enviarmos os próximos passos e a proposta formal.</StepTitle>
              <Input
                placeholder="seu@email.com"
                value={data.email}
                onChange={(e) => updateField("email", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                autoFocus
                className="text-base h-12"
                type="email"
              />
              <StepError message={errors.email} />
            </StepWrapper>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button variant="ghost" onClick={back} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            ) : (
              <div />
            )}
            <Button onClick={next} size="lg" className="gap-2">
              {step === 8 ? "Enviar" : "Continuar"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components

const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-5 animate-fade-in">{children}</div>
);

const StepTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">{children}</h2>
);

const StepError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-destructive font-medium">{message}</p> : null;

const OptionButton = ({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-base font-medium
      ${
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-foreground hover:border-primary/40"
      }`}
  >
    {children}
  </button>
);

export default Quiz;

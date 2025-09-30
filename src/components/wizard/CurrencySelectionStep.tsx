import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface CurrencySelectionStepProps {
  currencies: {
    soles: boolean;
    dolares: boolean;
  };
  onCurrencyChange: (currency: 'soles' | 'dolares', value: boolean) => void;
}

const CurrencySelectionStep = ({
  currencies,
  onCurrencyChange
}: CurrencySelectionStepProps) => {
  const handleCurrencySelect = (currency: 'soles' | 'dolares') => {
    onCurrencyChange(currency, !currencies[currency]);
  };

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-interbank-primary mb-2">
          ¿En qué moneda operas?
        </h2>
        <p className="text-muted-foreground">
          Selecciona la(s) moneda(s) de tus cuentas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Soles Option */}
        <Card
          onClick={() => handleCurrencySelect('soles')}
          className={`
            relative p-8 cursor-pointer transition-all duration-300
            hover:shadow-lg hover:scale-105 group
            ${
              currencies.soles
                ? 'border-2 border-interbank-primary shadow-lg bg-interbank-light/30'
                : 'border-2 border-gray-200 hover:border-interbank-primary/50'
            }
          `}
        >
          {/* Selection Indicator */}
          <div
            className={`
              absolute top-4 right-4 w-6 h-6 rounded-full border-2
              flex items-center justify-center transition-all duration-300
              ${
                currencies.soles
                  ? 'border-interbank-primary bg-interbank-primary'
                  : 'border-gray-300 bg-white group-hover:border-interbank-primary/50'
              }
            `}
          >
            {currencies.soles && <Check className="w-4 h-4 text-white" />}
          </div>

          {/* Currency Symbol */}
          <div
            className={`
              text-6xl font-bold mb-4 transition-all duration-300 text-center
              ${
                currencies.soles
                  ? 'text-interbank-primary scale-110'
                  : 'text-gray-400 group-hover:text-interbank-primary/70 group-hover:scale-105'
              }
            `}
          >
            S/
          </div>

          {/* Title */}
          <h3
            className={`
              text-xl font-semibold text-center mb-2 transition-colors duration-300
              ${currencies.soles ? 'text-interbank-primary' : 'text-gray-800'}
            `}
          >
            Soles Peruanos
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center">
            Operaciones en moneda nacional
          </p>

          {/* Visual feedback */}
          <div
            className={`
              absolute inset-0 rounded-lg pointer-events-none
              transition-all duration-300
              ${
                currencies.soles
                  ? 'bg-interbank-primary/5'
                  : 'bg-transparent group-hover:bg-interbank-primary/5'
              }
            `}
          />
        </Card>

        {/* Dólares Option */}
        <Card
          onClick={() => handleCurrencySelect('dolares')}
          className={`
            relative p-8 cursor-pointer transition-all duration-300
            hover:shadow-lg hover:scale-105 group
            ${
              currencies.dolares
                ? 'border-2 border-interbank-primary shadow-lg bg-interbank-light/30'
                : 'border-2 border-gray-200 hover:border-interbank-primary/50'
            }
          `}
        >
          {/* Selection Indicator */}
          <div
            className={`
              absolute top-4 right-4 w-6 h-6 rounded-full border-2
              flex items-center justify-center transition-all duration-300
              ${
                currencies.dolares
                  ? 'border-interbank-primary bg-interbank-primary'
                  : 'border-gray-300 bg-white group-hover:border-interbank-primary/50'
              }
            `}
          >
            {currencies.dolares && <Check className="w-4 h-4 text-white" />}
          </div>

          {/* Currency Symbol */}
          <div
            className={`
              text-6xl font-bold mb-4 transition-all duration-300 text-center
              ${
                currencies.dolares
                  ? 'text-interbank-primary scale-110'
                  : 'text-gray-400 group-hover:text-interbank-primary/70 group-hover:scale-105'
              }
            `}
          >
            $
          </div>

          {/* Title */}
          <h3
            className={`
              text-xl font-semibold text-center mb-2 transition-colors duration-300
              ${currencies.dolares ? 'text-interbank-primary' : 'text-gray-800'}
            `}
          >
            Dólares Americanos
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center">
            Operaciones en moneda extranjera
          </p>

          {/* Visual feedback */}
          <div
            className={`
              absolute inset-0 rounded-lg pointer-events-none
              transition-all duration-300
              ${
                currencies.dolares
                  ? 'bg-interbank-primary/5'
                  : 'bg-transparent group-hover:bg-interbank-primary/5'
              }
            `}
          />
        </Card>
      </div>

      {/* Helper Text */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          💡 Puedes seleccionar ambas monedas si operas en ambas
        </p>
      </div>
    </div>
  );
};

export default CurrencySelectionStep;
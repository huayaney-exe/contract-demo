import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Landmark } from "lucide-react";

interface AccountSelectionStepProps {
  currencies: {
    soles: boolean;
    dolares: boolean;
  };
  accountSoles?: {
    type: 'ahorro' | 'corriente';
    number: string;
  };
  accountDolares?: {
    type: 'ahorro' | 'corriente';
    number: string;
  };
  onAccountChange: (
    currency: 'soles' | 'dolares',
    field: 'type' | 'number',
    value: string
  ) => void;
  errors?: Record<string, string>;
}

const AccountSelectionStep = ({
  currencies,
  accountSoles,
  accountDolares,
  onAccountChange,
  errors = {}
}: AccountSelectionStepProps) => {
  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-interbank-primary mb-2">
          ¿Qué cuenta usamos para comisiones?
        </h2>
        <p className="text-muted-foreground">
          Selecciona la cuenta de cargo principal
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Soles Account */}
        {currencies.soles && (
          <Card className="p-6 border-2 border-gray-200 hover:border-interbank-primary/50 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-interbank-light p-3 rounded-full">
                <Landmark className="w-6 h-6 text-interbank-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-interbank-primary">
                  Cuenta en Soles (S/)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cuenta principal para el cobro de comisiones en moneda nacional
                </p>
              </div>
            </div>

            <div className="space-y-4 pl-14">
              {/* Account Type */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Tipo de cuenta
                </Label>
                <RadioGroup
                  value={accountSoles?.type || 'ahorro'}
                  onValueChange={(value) =>
                    onAccountChange('soles', 'type', value)
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ahorro" id="ahorro-soles" />
                    <Label
                      htmlFor="ahorro-soles"
                      className="cursor-pointer font-normal"
                    >
                      Ahorro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corriente" id="corriente-soles" />
                    <Label
                      htmlFor="corriente-soles"
                      className="cursor-pointer font-normal"
                    >
                      Corriente
                    </Label>
                  </div>
                </RadioGroup>
                {errors.accountSolesType && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.accountSolesType}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Número de cuenta
                </Label>
                <Input
                  type="text"
                  placeholder="Ej: 123-456-789012345"
                  value={accountSoles?.number || ''}
                  onChange={(e) =>
                    onAccountChange('soles', 'number', e.target.value)
                  }
                  className={`max-w-md ${
                    errors.accountSolesNumber ? 'border-destructive' : ''
                  }`}
                />
                {errors.accountSolesNumber && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.accountSolesNumber}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Dólares Account */}
        {currencies.dolares && (
          <Card className="p-6 border-2 border-gray-200 hover:border-interbank-primary/50 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-interbank-light p-3 rounded-full">
                <Landmark className="w-6 h-6 text-interbank-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-interbank-primary">
                  Cuenta en Dólares ($)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Cuenta principal para el cobro de comisiones en moneda extranjera
                </p>
              </div>
            </div>

            <div className="space-y-4 pl-14">
              {/* Account Type */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Tipo de cuenta
                </Label>
                <RadioGroup
                  value={accountDolares?.type || 'ahorro'}
                  onValueChange={(value) =>
                    onAccountChange('dolares', 'type', value)
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ahorro" id="ahorro-dolares" />
                    <Label
                      htmlFor="ahorro-dolares"
                      className="cursor-pointer font-normal"
                    >
                      Ahorro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corriente" id="corriente-dolares" />
                    <Label
                      htmlFor="corriente-dolares"
                      className="cursor-pointer font-normal"
                    >
                      Corriente
                    </Label>
                  </div>
                </RadioGroup>
                {errors.accountDolaresType && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.accountDolaresType}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Número de cuenta
                </Label>
                <Input
                  type="text"
                  placeholder="Ej: 123-456-789012345"
                  value={accountDolares?.number || ''}
                  onChange={(e) =>
                    onAccountChange('dolares', 'number', e.target.value)
                  }
                  className={`max-w-md ${
                    errors.accountDolaresNumber ? 'border-destructive' : ''
                  }`}
                />
                {errors.accountDolaresNumber && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.accountDolaresNumber}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Information Note */}
      <div className="max-w-4xl mx-auto mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          ℹ️ <strong>Nota:</strong> Esta es la cuenta principal de cargo de comisiones por los servicios de pagos masivos.
        </p>
      </div>
    </div>
  );
};

export default AccountSelectionStep;
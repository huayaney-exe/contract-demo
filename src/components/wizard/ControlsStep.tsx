import { Card } from "@/components/ui/card";
import AmountControl from "./AmountControl";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useWizardValidation } from "@/hooks/useWizardValidation";
import { useEffect, useState } from "react";

interface ControlsStepProps {
  services: {
    remuneraciones: boolean;
    proveedores: boolean;
    pagosVarios: boolean;
  };
  currencies: {
    soles: boolean;
    dolares: boolean;
  };
  controls: {
    remuneraciones?: {
      soles?: { maxBatch: string; maxPayment: string };
      dolares?: { maxBatch: string; maxPayment: string };
    };
    proveedores?: {
      soles?: { maxBatch: string; maxPayment: string };
      dolares?: { maxBatch: string; maxPayment: string };
    };
    pagosVarios?: {
      soles?: { maxBatch: string; maxPayment: string };
      dolares?: { maxBatch: string; maxPayment: string };
    };
  };
  onControlChange: (
    service: string,
    currency: string,
    field: string,
    value: string
  ) => void;
}

const ControlsStep = ({
  services,
  currencies,
  controls,
  onControlChange
}: ControlsStepProps) => {
  const { validateAmounts } = useWizardValidation();
  const [validationStates, setValidationStates] = useState<Record<string, any>>({});

  const serviceNames = {
    remuneraciones: 'Remuneraciones/CTS',
    proveedores: 'Proveedores',
    pagosVarios: 'Pagos Varios'
  };

  const currencySymbols = {
    soles: 'S/',
    dolares: '$'
  };

  useEffect(() => {
    // Validate all control pairs
    const newStates: Record<string, any> = {};

    Object.entries(services).forEach(([service, enabled]) => {
      if (enabled) {
        Object.entries(currencies).forEach(([currency, currencyEnabled]) => {
          if (currencyEnabled) {
            const serviceControls = controls[service as keyof typeof controls]?.[currency as keyof typeof controls.remuneraciones];

            if (serviceControls) {
              const validation = validateAmounts(
                serviceControls.maxBatch,
                serviceControls.maxPayment
              );

              newStates[`${service}_${currency}`] = validation;
            }
          }
        });
      }
    });

    setValidationStates(newStates);
  }, [services, currencies, controls, validateAmounts]);

  const renderServiceCurrencyControls = (
    service: keyof typeof services,
    currency: 'soles' | 'dolares'
  ) => {
    if (!services[service] || !currencies[currency]) return null;

    const serviceControls = controls[service]?.[currency] || {
      maxBatch: '',
      maxPayment: ''
    };

    const validationKey = `${service}_${currency}`;
    const validation = validationStates[validationKey];

    return (
      <Card key={`${service}-${currency}`} className="p-6 border-2 border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-semibold text-lg text-interbank-primary">
              {serviceNames[service]} - {currency === 'soles' ? 'Soles' : 'Dólares'}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Define los límites de control para este servicio
            </p>
          </div>

          {/* Validation Status Badge */}
          {validation && (
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                validation.isValid
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {validation.isValid ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  Válido
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3" />
                  Revisar
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Max Batch Amount */}
          <AmountControl
            label="Monto máximo por lote"
            currency={currencySymbols[currency]}
            value={serviceControls.maxBatch}
            onChange={(value) =>
              onControlChange(service, currency, 'maxBatch', value)
            }
            suggestion={100000}
            error={
              validation && !validation.isValid && serviceControls.maxBatch
                ? undefined
                : undefined
            }
            success={
              serviceControls.maxBatch &&
              serviceControls.maxPayment &&
              validation?.isValid
                ? '✓'
                : undefined
            }
          />

          {/* Max Payment Amount */}
          <AmountControl
            label="Monto máximo por pago"
            currency={currencySymbols[currency]}
            value={serviceControls.maxPayment}
            onChange={(value) =>
              onControlChange(service, currency, 'maxPayment', value)
            }
            suggestion={10000}
            error={
              validation && !validation.isValid && serviceControls.maxPayment
                ? validation.error
                : undefined
            }
            success={
              serviceControls.maxBatch &&
              serviceControls.maxPayment &&
              validation?.isValid
                ? '✓'
                : undefined
            }
          />
        </div>

        {/* Validation Message */}
        {validation && !validation.isValid && serviceControls.maxBatch && serviceControls.maxPayment && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800 font-medium">
                {validation.error}
              </p>
              <p className="text-xs text-red-700 mt-1">
                El monto por pago debe ser menor que el monto por lote para garantizar un control adecuado.
              </p>
            </div>
          </div>
        )}
      </Card>
    );
  };

  const hasAnyService = services.remuneraciones || services.proveedores || services.pagosVarios;
  const hasAnyCurrency = currencies.soles || currencies.dolares;

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-interbank-primary mb-2">
          ¿Límites de control?
        </h2>
        <p className="text-muted-foreground">
          Define los montos máximos por lote y por pago para cada servicio
        </p>
      </div>

      {/* Information Banner */}
      <div className="max-w-5xl mx-auto p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Sobre los controles opcionales:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Si no requieres controles, ingresa "SL" o "Sin límites"</li>
            <li>El monto por pago siempre debe ser menor al monto por lote</li>
            <li>Los controles se aplican por servicio y moneda</li>
            <li>Puedes usar los botones de monto sugerido para facilitar el llenado</li>
          </ul>
        </div>
      </div>

      {/* Controls Grid */}
      {hasAnyService && hasAnyCurrency ? (
        <div className="space-y-4 max-w-5xl mx-auto">
          {/* Remuneraciones */}
          {services.remuneraciones && (
            <>
              {renderServiceCurrencyControls('remuneraciones', 'soles')}
              {renderServiceCurrencyControls('remuneraciones', 'dolares')}
            </>
          )}

          {/* Proveedores */}
          {services.proveedores && (
            <>
              {renderServiceCurrencyControls('proveedores', 'soles')}
              {renderServiceCurrencyControls('proveedores', 'dolares')}
            </>
          )}

          {/* Pagos Varios */}
          {services.pagosVarios && (
            <>
              {renderServiceCurrencyControls('pagosVarios', 'soles')}
              {renderServiceCurrencyControls('pagosVarios', 'dolares')}
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Selecciona servicios y monedas para configurar los controles
          </p>
        </div>
      )}
    </div>
  );
};

export default ControlsStep;
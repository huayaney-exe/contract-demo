import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentTypesStepProps {
  aceptaPagosVencidos: boolean;
  obligaPagosSucesivos: boolean;
  aceptaPagosParciales: boolean;
  onAceptaPagosVencidosChange: (value: boolean) => void;
  onObligaPagosSucesivosChange: (value: boolean) => void;
  onAceptaPagosParcialesChange: (value: boolean) => void;
}

export const PaymentTypesStep = ({
  aceptaPagosVencidos,
  obligaPagosSucesivos,
  aceptaPagosParciales,
  onAceptaPagosVencidosChange,
  onObligaPagosSucesivosChange,
  onAceptaPagosParcialesChange,
}: PaymentTypesStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Tipos de Pago</h2>
        <p className="text-muted-foreground">
          Configure las reglas de aceptación de pagos
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          ℹ️ <strong>Reglas de validación:</strong>
        </p>
        <ul className="text-sm text-blue-900 dark:text-blue-100 mt-2 space-y-1 list-disc list-inside">
          <li>Si acepta pagos vencidos = Sí, entonces obliga pagos sucesivos = No</li>
          <li>Si obliga pagos sucesivos = Sí, entonces acepta pagos parciales = No</li>
        </ul>
      </div>

      <div className="space-y-6">
        {/* Acepta Pagos Vencidos */}
        <div className="space-y-3 p-4 border rounded-lg">
          <Label className="text-base font-semibold">¿Acepta pagos vencidos? *</Label>
          <RadioGroup
            value={aceptaPagosVencidos ? 'si' : 'no'}
            onValueChange={(value) => {
              const acepta = value === 'si';
              onAceptaPagosVencidosChange(acepta);
              if (acepta) {
                onObligaPagosSucesivosChange(false);
              } else {
                onObligaPagosSucesivosChange(true);
              }
            }}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="si" id="vencidos-si" />
              <Label htmlFor="vencidos-si" className="cursor-pointer">Sí</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="vencidos-no" />
              <Label htmlFor="vencidos-no" className="cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Obliga Pagos Sucesivos */}
        <div className="space-y-3 p-4 border rounded-lg">
          <Label className="text-base font-semibold">
            ¿Obliga pagos sucesivos (pago de la cuota más antigua)? *
          </Label>
          <RadioGroup
            value={obligaPagosSucesivos ? 'si' : 'no'}
            onValueChange={(value) => {
              const obliga = value === 'si';
              onObligaPagosSucesivosChange(obliga);
              if (obliga) {
                onAceptaPagosParcialesChange(false);
                onAceptaPagosVencidosChange(false);
              }
            }}
            className="flex gap-6"
            disabled={aceptaPagosVencidos}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="si" id="sucesivos-si" disabled={aceptaPagosVencidos} />
              <Label 
                htmlFor="sucesivos-si" 
                className={aceptaPagosVencidos ? 'opacity-50' : 'cursor-pointer'}
              >
                Sí
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="sucesivos-no" disabled={aceptaPagosVencidos} />
              <Label 
                htmlFor="sucesivos-no" 
                className={aceptaPagosVencidos ? 'opacity-50' : 'cursor-pointer'}
              >
                No
              </Label>
            </div>
          </RadioGroup>
          {aceptaPagosVencidos && (
            <p className="text-sm text-muted-foreground">
              Deshabilitado porque acepta pagos vencidos
            </p>
          )}
        </div>

        {/* Acepta Pagos Parciales */}
        <div className="space-y-3 p-4 border rounded-lg">
          <Label className="text-base font-semibold">¿Acepta pagos parciales? *</Label>
          <RadioGroup
            value={aceptaPagosParciales ? 'si' : 'no'}
            onValueChange={(value) => {
              const acepta = value === 'si';
              onAceptaPagosParcialesChange(acepta);
              if (acepta) {
                onObligaPagosSucesivosChange(false);
              }
            }}
            className="flex gap-6"
            disabled={obligaPagosSucesivos}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="si" id="parciales-si" disabled={obligaPagosSucesivos} />
              <Label 
                htmlFor="parciales-si" 
                className={obligaPagosSucesivos ? 'opacity-50' : 'cursor-pointer'}
              >
                Sí
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="parciales-no" disabled={obligaPagosSucesivos} />
              <Label 
                htmlFor="parciales-no" 
                className={obligaPagosSucesivos ? 'opacity-50' : 'cursor-pointer'}
              >
                No
              </Label>
            </div>
          </RadioGroup>
          {obligaPagosSucesivos && (
            <p className="text-sm text-muted-foreground">
              Deshabilitado porque obliga pagos sucesivos
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

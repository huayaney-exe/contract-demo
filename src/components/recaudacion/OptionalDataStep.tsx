import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OptionalDataStepProps {
  tipoRecaudacion: 'exclusiva' | 'compartida' | '';
  numeroClientes: string;
  recaudacionAnualSoles: string;
  recaudacionAnualDolares: string;
  onTipoRecaudacionChange: (value: 'exclusiva' | 'compartida' | '') => void;
  onNumeroClientesChange: (value: string) => void;
  onRecaudacionAnualSolesChange: (value: string) => void;
  onRecaudacionAnualDolaresChange: (value: string) => void;
}

export const OptionalDataStep = ({
  tipoRecaudacion,
  numeroClientes,
  recaudacionAnualSoles,
  recaudacionAnualDolares,
  onTipoRecaudacionChange,
  onNumeroClientesChange,
  onRecaudacionAnualSolesChange,
  onRecaudacionAnualDolaresChange,
}: OptionalDataStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Recaudación de la Empresa</h2>
        <p className="text-muted-foreground">
          Información adicional (Opcional)
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          ℹ️ Esta sección es opcional. La información aquí proporcionada ayuda a Interbank a entender mejor 
          su modelo de negocio y volumen de operaciones.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Tipo de Recaudación</Label>
          <RadioGroup
            value={tipoRecaudacion}
            onValueChange={(value) => onTipoRecaudacionChange(value as 'exclusiva' | 'compartida' | '')}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exclusiva" id="exclusiva" />
              <Label htmlFor="exclusiva" className="cursor-pointer">Exclusiva</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compartida" id="compartida" />
              <Label htmlFor="compartida" className="cursor-pointer">Compartida</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="no-especificar" />
              <Label htmlFor="no-especificar" className="cursor-pointer">No especificar</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numeroClientes">Número de Clientes / Socios / Alumnos</Label>
          <Input
            id="numeroClientes"
            value={numeroClientes}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, '');
              onNumeroClientesChange(cleaned);
            }}
            placeholder="Ej: 5000"
            type="text"
            inputMode="numeric"
          />
          <p className="text-sm text-muted-foreground">
            Cantidad aproximada de deudores o usuarios del servicio
          </p>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold">Recaudación Anual Promedio</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recaudacionSoles">En Soles (S/)</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">S/</span>
                <Input
                  id="recaudacionSoles"
                  value={recaudacionAnualSoles}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^\d.]/g, '');
                    onRecaudacionAnualSolesChange(cleaned);
                  }}
                  placeholder="0.00"
                  type="text"
                  inputMode="decimal"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recaudacionDolares">En Dólares (US$)</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">US$</span>
                <Input
                  id="recaudacionDolares"
                  value={recaudacionAnualDolares}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^\d.]/g, '');
                    onRecaudacionAnualDolaresChange(cleaned);
                  }}
                  placeholder="0.00"
                  type="text"
                  inputMode="decimal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Puede omitir estos campos si no desea proporcionar esta información. 
          No afectará el procesamiento de su solicitud.
        </p>
      </div>
    </div>
  );
};

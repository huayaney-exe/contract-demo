import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ServiceConfigStepProps {
  tipoServicio: 'nuevo' | 'modificacion';
  nombreComercial: string;
  numeroServicio: string;
  nombreServicio: string;
  onTipoServicioChange: (value: 'nuevo' | 'modificacion') => void;
  onNombreComercialChange: (value: string) => void;
  onNumeroServicioChange: (value: string) => void;
  onNombreServicioChange: (value: string) => void;
}

export const ServiceConfigStep = ({
  tipoServicio,
  nombreComercial,
  numeroServicio,
  nombreServicio,
  onTipoServicioChange,
  onNombreComercialChange,
  onNumeroServicioChange,
  onNombreServicioChange,
}: ServiceConfigStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Configuración del Servicio</h2>
        <p className="text-muted-foreground">
          Defina los datos identificadores del servicio de recaudación
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Tipo de Servicio *</Label>
          <RadioGroup
            value={tipoServicio}
            onValueChange={(value) => onTipoServicioChange(value as 'nuevo' | 'modificacion')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nuevo" id="nuevo" />
              <Label htmlFor="nuevo" className="cursor-pointer">Nuevo Servicio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="modificacion" id="modificacion" />
              <Label htmlFor="modificacion" className="cursor-pointer">Modificación</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombreComercial">Nombre Comercial del Cliente *</Label>
          <Input
            id="nombreComercial"
            value={nombreComercial}
            onChange={(e) => {
              if (e.target.value.length <= 13) {
                onNombreComercialChange(e.target.value);
              }
            }}
            placeholder="Máximo 13 caracteres"
            maxLength={13}
          />
          <p className="text-sm text-muted-foreground">
            {nombreComercial.length}/13 caracteres - Este nombre se mostrará en el sistema
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numeroServicio">Número de Servicio *</Label>
          <Input
            id="numeroServicio"
            value={numeroServicio}
            onChange={(e) => onNumeroServicioChange(e.target.value)}
            placeholder="Ingrese el número de servicio"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombreServicio">Nombre de Servicio *</Label>
          <Input
            id="nombreServicio"
            value={nombreServicio}
            onChange={(e) => {
              if (e.target.value.length <= 13) {
                onNombreServicioChange(e.target.value);
              }
            }}
            placeholder="Máximo 13 caracteres"
            maxLength={13}
          />
          <p className="text-sm text-muted-foreground">
            {nombreServicio.length}/13 caracteres - Este nombre será utilizado por el usuario al momento del pago
          </p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          ⚠️ <strong>Importante:</strong> El nombre comercial y el nombre de servicio tienen un límite de 13 caracteres 
          cada uno. Estos nombres serán visibles para los usuarios al realizar pagos.
        </p>
      </div>
    </div>
  );
};

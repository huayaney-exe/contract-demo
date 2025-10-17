import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SpecificCharacteristicsStepProps {
  monedaSoles: boolean;
  monedaDolares: boolean;
  canalAppBanca: boolean;
  canalAgenteLima: boolean;
  canalAgenteProvincias: boolean;
  canalAgenteSupermercados: boolean;
  canalOtros: string;
  tipoAbono: 'lineaDetallado' | 'lineaConsolidado' | 'finalDiaConsolidado';
  onMonedaSolesChange: (value: boolean) => void;
  onMonedaDolaresChange: (value: boolean) => void;
  onCanalAppBancaChange: (value: boolean) => void;
  onCanalAgenteLimaChange: (value: boolean) => void;
  onCanalAgenteProvinciasChange: (value: boolean) => void;
  onCanalAgenteSupermercadosChange: (value: boolean) => void;
  onCanalOtrosChange: (value: string) => void;
  onTipoAbonoChange: (value: 'lineaDetallado' | 'lineaConsolidado' | 'finalDiaConsolidado') => void;
}

export const SpecificCharacteristicsStep = ({
  monedaSoles,
  monedaDolares,
  canalAppBanca,
  canalAgenteLima,
  canalAgenteProvincias,
  canalAgenteSupermercados,
  canalOtros,
  tipoAbono,
  onMonedaSolesChange,
  onMonedaDolaresChange,
  onCanalAppBancaChange,
  onCanalAgenteLimaChange,
  onCanalAgenteProvinciasChange,
  onCanalAgenteSupermercadosChange,
  onCanalOtrosChange,
  onTipoAbonoChange,
}: SpecificCharacteristicsStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Características Puntuales del Servicio</h2>
        <p className="text-muted-foreground">
          Defina la moneda, canales y tipo de abono para el servicio
        </p>
      </div>

      <div className="space-y-6">
        {/* Moneda de Cobranza */}
        <div className="space-y-3">
          <Label>Moneda de Cobranza * (puede seleccionar ambas)</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="monedaSoles"
                checked={monedaSoles}
                onCheckedChange={onMonedaSolesChange}
              />
              <Label htmlFor="monedaSoles" className="cursor-pointer">Soles</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="monedaDolares"
                checked={monedaDolares}
                onCheckedChange={onMonedaDolaresChange}
              />
              <Label htmlFor="monedaDolares" className="cursor-pointer">Dólares</Label>
            </div>
          </div>
        </div>

        {/* Canal de Cobro */}
        <div className="space-y-3">
          <Label>Canal de Cobro * (puede seleccionar múltiples)</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="canalAppBanca"
                checked={canalAppBanca}
                onCheckedChange={onCanalAppBancaChange}
              />
              <Label htmlFor="canalAppBanca" className="cursor-pointer">
                App Interbank / Banca por Internet
              </Label>
            </div>

            <div className="space-y-2 pl-6">
              <Label className="text-sm font-semibold">Interbank Agente:</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canalAgenteLima"
                  checked={canalAgenteLima}
                  onCheckedChange={onCanalAgenteLimaChange}
                />
                <Label htmlFor="canalAgenteLima" className="cursor-pointer">Lima</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canalAgenteProvincias"
                  checked={canalAgenteProvincias}
                  onCheckedChange={onCanalAgenteProvinciasChange}
                />
                <Label htmlFor="canalAgenteProvincias" className="cursor-pointer">Provincias</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canalAgenteSupermercados"
                  checked={canalAgenteSupermercados}
                  onCheckedChange={onCanalAgenteSupermercadosChange}
                />
                <Label htmlFor="canalAgenteSupermercados" className="cursor-pointer">
                  En supermercados
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="canalOtros" className="text-sm">
                Otros (trato directo, previa negociación con ejecutivo):
              </Label>
              <Input
                id="canalOtros"
                value={canalOtros}
                onChange={(e) => onCanalOtrosChange(e.target.value)}
                placeholder="Especifique otros canales"
              />
            </div>
          </div>
          
          {monedaDolares && (canalAgenteLima || canalAgenteProvincias || canalAgenteSupermercados) && (
            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-900 dark:text-amber-100">
                ⚠️ <strong>Nota:</strong> El canal Agente no recepciona dólares
              </p>
            </div>
          )}
        </div>

        {/* Tipo de Abono */}
        <div className="space-y-3">
          <Label>Tipo de Abono en Cuenta *</Label>
          <RadioGroup
            value={tipoAbono}
            onValueChange={(value) => onTipoAbonoChange(value as any)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lineaDetallado" id="lineaDetallado" />
              <Label htmlFor="lineaDetallado" className="cursor-pointer">
                En línea y detallado
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lineaConsolidado" id="lineaConsolidado" />
              <Label htmlFor="lineaConsolidado" className="cursor-pointer">
                En línea y consolidado
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="finalDiaConsolidado" id="finalDiaConsolidado" />
              <Label htmlFor="finalDiaConsolidado" className="cursor-pointer">
                Al final del día y consolidado
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

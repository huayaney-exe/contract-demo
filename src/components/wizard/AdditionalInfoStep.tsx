import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Settings, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useWizardValidation } from "@/hooks/useWizardValidation";

interface AdditionalInfoStepProps {
  services: {
    remuneraciones: boolean;
    proveedores: boolean;
    pagosVarios: boolean;
  };
  additional: {
    maxDaysProviders?: string;
    maxDaysVarios?: string;
    consolidateProviders?: 'si' | 'no';
    consolidateVarios?: 'si' | 'no';
    commissionDistribution?: {
      empresaSoles?: string;
      empresaDolares?: string;
      proveedorSoles?: string;
      proveedorDolares?: string;
    };
  };
  onAdditionalChange: (field: string, value: string) => void;
}

const AdditionalInfoStep = ({
  services,
  additional,
  onAdditionalChange
}: AdditionalInfoStepProps) => {
  const { validateMaxDays } = useWizardValidation();
  const [validations, setValidations] = useState({
    maxDaysProviders: { isValid: true, error: '', suggestion: '' },
    maxDaysVarios: { isValid: true, error: '', suggestion: '' }
  });

  const showConsolidation = services.proveedores || services.pagosVarios;
  const showCommission = additional.consolidateProviders === 'si' || additional.consolidateVarios === 'si';

  useEffect(() => {
    if (additional.maxDaysProviders) {
      const validation = validateMaxDays(additional.maxDaysProviders);
      setValidations(prev => ({ ...prev, maxDaysProviders: validation }));
    }
  }, [additional.maxDaysProviders, validateMaxDays]);

  useEffect(() => {
    if (additional.maxDaysVarios) {
      const validation = validateMaxDays(additional.maxDaysVarios);
      setValidations(prev => ({ ...prev, maxDaysVarios: validation }));
    }
  }, [additional.maxDaysVarios, validateMaxDays]);

  const handleSliderChange = (field: string, values: number[]) => {
    onAdditionalChange(field, values[0].toString());
  };

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-interbank-light rounded-full mb-4">
          <Settings className="w-12 h-12 text-interbank-primary" />
        </div>
        <h2 className="text-2xl font-bold text-interbank-primary mb-2">
          Configuración adicional
        </h2>
        <p className="text-muted-foreground">
          Solo para servicios de Proveedores y/o Pagos Varios
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Max Days Section */}
        {(services.proveedores || services.pagosVarios) && (
          <div className="p-6 bg-white border-2 border-gray-200 rounded-lg space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-interbank-primary mb-2">
                Número de días máximo
              </h3>
              <p className="text-sm text-muted-foreground">
                Tiempo máximo para el cobro de cheques y órdenes de pago (1-120 días)
              </p>
            </div>

            {/* Proveedores Max Days */}
            {services.proveedores && (
              <div className="space-y-3">
                <Label className="text-base font-medium">Proveedores</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="1"
                    max="120"
                    value={additional.maxDaysProviders || ''}
                    onChange={(e) => onAdditionalChange('maxDaysProviders', e.target.value)}
                    placeholder="120"
                    className={`w-24 text-center text-lg font-semibold ${
                      additional.maxDaysProviders && validations.maxDaysProviders.error
                        ? 'border-destructive'
                        : additional.maxDaysProviders && validations.maxDaysProviders.isValid
                        ? 'border-green-500'
                        : ''
                    }`}
                  />
                  <span className="text-sm text-muted-foreground">días</span>
                  {additional.maxDaysProviders && validations.maxDaysProviders.isValid && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {additional.maxDaysProviders && validations.maxDaysProviders.error && (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>

                {additional.maxDaysProviders && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>1 día</span>
                      <span className="font-medium text-interbank-primary">
                        {additional.maxDaysProviders} días
                      </span>
                      <span>120 días</span>
                    </div>
                    <Slider
                      value={[parseInt(additional.maxDaysProviders) || 120]}
                      onValueChange={(values) => handleSliderChange('maxDaysProviders', values)}
                      min={1}
                      max={120}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}

                {additional.maxDaysProviders && validations.maxDaysProviders.error && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {validations.maxDaysProviders.error}
                  </p>
                )}
                {!additional.maxDaysProviders && (
                  <p className="text-xs text-muted-foreground">
                    💡 Si no especificas, se configurará con el máximo (120 días)
                  </p>
                )}
              </div>
            )}

            {/* Pagos Varios Max Days */}
            {services.pagosVarios && (
              <div className="space-y-3">
                <Label className="text-base font-medium">Pagos Varios</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="1"
                    max="120"
                    value={additional.maxDaysVarios || ''}
                    onChange={(e) => onAdditionalChange('maxDaysVarios', e.target.value)}
                    placeholder="120"
                    className={`w-24 text-center text-lg font-semibold ${
                      additional.maxDaysVarios && validations.maxDaysVarios.error
                        ? 'border-destructive'
                        : additional.maxDaysVarios && validations.maxDaysVarios.isValid
                        ? 'border-green-500'
                        : ''
                    }`}
                  />
                  <span className="text-sm text-muted-foreground">días</span>
                  {additional.maxDaysVarios && validations.maxDaysVarios.isValid && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {additional.maxDaysVarios && validations.maxDaysVarios.error && (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>

                {additional.maxDaysVarios && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>1 día</span>
                      <span className="font-medium text-interbank-primary">
                        {additional.maxDaysVarios} días
                      </span>
                      <span>120 días</span>
                    </div>
                    <Slider
                      value={[parseInt(additional.maxDaysVarios) || 120]}
                      onValueChange={(values) => handleSliderChange('maxDaysVarios', values)}
                      min={1}
                      max={120}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}

                {additional.maxDaysVarios && validations.maxDaysVarios.error && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {validations.maxDaysVarios.error}
                  </p>
                )}
                {!additional.maxDaysVarios && (
                  <p className="text-xs text-muted-foreground">
                    💡 Si no especificas, se configurará con el máximo (120 días)
                  </p>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-muted-foreground">
                ⏰ <strong>Importante:</strong> Culminado el plazo, los cheques y órdenes de pago se revocan y se devuelven los fondos a la cuenta de cargo.
              </p>
            </div>
          </div>
        )}

        {/* Invoice Consolidation */}
        {showConsolidation && (
          <div className="p-6 bg-white border-2 border-gray-200 rounded-lg space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-interbank-primary mb-2">
                Consolidar facturas
              </h3>
              <p className="text-sm text-muted-foreground">
                ¿Consolidar Facturas, Notas de Crédito y Notas de Débito en un solo abono o cheque?
              </p>
            </div>

            {/* Proveedores Consolidation */}
            {services.proveedores && (
              <div className="space-y-3">
                <Label className="text-base font-medium">Proveedores</Label>
                <RadioGroup
                  value={additional.consolidateProviders || 'no'}
                  onValueChange={(value) => onAdditionalChange('consolidateProviders', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="consolidate-prov-si" />
                    <Label htmlFor="consolidate-prov-si" className="cursor-pointer font-normal">
                      Sí, consolidar
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="consolidate-prov-no" />
                    <Label htmlFor="consolidate-prov-no" className="cursor-pointer font-normal">
                      No consolidar
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Pagos Varios Consolidation */}
            {services.pagosVarios && (
              <div className="space-y-3">
                <Label className="text-base font-medium">Pagos Varios</Label>
                <RadioGroup
                  value={additional.consolidateVarios || 'no'}
                  onValueChange={(value) => onAdditionalChange('consolidateVarios', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="consolidate-varios-si" />
                    <Label htmlFor="consolidate-varios-si" className="cursor-pointer font-normal">
                      Sí, consolidar
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="consolidate-varios-no" />
                    <Label htmlFor="consolidate-varios-no" className="cursor-pointer font-normal">
                      No consolidar
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
        )}

        {/* Commission Distribution - Only if consolidation enabled */}
        {showCommission && (
          <div className="p-6 bg-white border-2 border-interbank-primary/30 rounded-lg space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-interbank-primary mb-2">
                Distribución de comisión
              </h3>
              <p className="text-sm text-muted-foreground">
                Distribución de comisión de Cheque de Gerencia (Ordenante/Pagador)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Empresa Soles */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Empresa (S/)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={additional.commissionDistribution?.empresaSoles || ''}
                    onChange={(e) => onAdditionalChange('empresaSoles', e.target.value)}
                    placeholder="0"
                    className="w-20 text-center"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>

              {/* Empresa Dólares */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Empresa ($)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={additional.commissionDistribution?.empresaDolares || ''}
                    onChange={(e) => onAdditionalChange('empresaDolares', e.target.value)}
                    placeholder="0"
                    className="w-20 text-center"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>

              {/* Proveedor Soles */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Proveedor (S/)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={additional.commissionDistribution?.proveedorSoles || ''}
                    onChange={(e) => onAdditionalChange('proveedorSoles', e.target.value)}
                    placeholder="0"
                    className="w-20 text-center"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>

              {/* Proveedor Dólares */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Proveedor ($)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={additional.commissionDistribution?.proveedorDolares || ''}
                    onChange={(e) => onAdditionalChange('proveedorDolares', e.target.value)}
                    placeholder="0"
                    className="w-20 text-center"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800">
                ⚠️ <strong>Nota:</strong> Si no especificas distribución, la comisión será asumida en su totalidad por el Cliente.
              </p>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">ℹ️ Información adicional opcional</p>
              <p className="text-xs">
                Esta configuración solo aplica si seleccionaste los servicios de Proveedores y/o Pagos Varios. Puedes dejar los campos vacíos para usar valores predeterminados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoStep;
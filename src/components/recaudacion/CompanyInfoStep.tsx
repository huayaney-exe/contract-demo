import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, AlertCircle } from "lucide-react";
import { useRecaudacionValidation } from "@/hooks/useRecaudacionValidation";
import { useState, useEffect } from "react";

interface CompanyInfoStepProps {
  codigoUnico: string;
  puntoServicio: string;
  razonSocial: string;
  ruc: string;
  giroEmpresa: string;
  onCodigoUnicoChange: (value: string) => void;
  onPuntoServicioChange: (value: string) => void;
  onRazonSocialChange: (value: string) => void;
  onRucChange: (value: string) => void;
  onGiroEmpresaChange: (value: string) => void;
}

export const CompanyInfoStep = ({
  codigoUnico,
  puntoServicio,
  razonSocial,
  ruc,
  giroEmpresa,
  onCodigoUnicoChange,
  onPuntoServicioChange,
  onRazonSocialChange,
  onRucChange,
  onGiroEmpresaChange,
}: CompanyInfoStepProps) => {
  const { validateRUC } = useRecaudacionValidation();
  const [rucValidation, setRucValidation] = useState({ isValid: false, error: '', suggestion: '' });
  const [touched, setTouched] = useState({
    codigoUnico: false,
    puntoServicio: false,
    razonSocial: false,
    ruc: false,
    giroEmpresa: false,
  });

  useEffect(() => {
    if (touched.ruc) {
      setRucValidation(validateRUC(ruc));
    }
  }, [ruc, touched.ruc, validateRUC]);

  const handleRucChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    onRucChange(cleaned);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Información de la Empresa</h2>
        <p className="text-muted-foreground">
          Complete los datos básicos de su empresa para el servicio de recaudación
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="codigoUnico">Código Único *</Label>
            <Input
              id="codigoUnico"
              value={codigoUnico}
              onChange={(e) => onCodigoUnicoChange(e.target.value)}
              onBlur={() => setTouched({ ...touched, codigoUnico: true })}
              placeholder="Ingrese código único"
              className={touched.codigoUnico && !codigoUnico ? 'border-destructive' : ''}
            />
            {touched.codigoUnico && !codigoUnico && (
              <p className="text-sm text-destructive">Código único es requerido</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="puntoServicio">Punto de Servicio *</Label>
            <Input
              id="puntoServicio"
              value={puntoServicio}
              onChange={(e) => onPuntoServicioChange(e.target.value)}
              onBlur={() => setTouched({ ...touched, puntoServicio: true })}
              placeholder="Ingrese punto de servicio"
              className={touched.puntoServicio && !puntoServicio ? 'border-destructive' : ''}
            />
            {touched.puntoServicio && !puntoServicio && (
              <p className="text-sm text-destructive">Punto de servicio es requerido</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="razonSocial">Nombre o Razón Social *</Label>
          <Input
            id="razonSocial"
            value={razonSocial}
            onChange={(e) => onRazonSocialChange(e.target.value)}
            onBlur={() => setTouched({ ...touched, razonSocial: true })}
            placeholder="Ingrese nombre o razón social de la empresa"
            className={touched.razonSocial && !razonSocial ? 'border-destructive' : ''}
          />
          {touched.razonSocial && !razonSocial && (
            <p className="text-sm text-destructive">Razón social es requerida</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ruc">RUC *</Label>
          <div className="relative">
            <Input
              id="ruc"
              value={ruc}
              onChange={(e) => handleRucChange(e.target.value)}
              onBlur={() => setTouched({ ...touched, ruc: true })}
              placeholder="11 dígitos"
              maxLength={11}
              className={
                touched.ruc
                  ? rucValidation.isValid
                    ? 'border-green-500 pr-10'
                    : 'border-destructive pr-10'
                  : ''
              }
            />
            {touched.ruc && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {rucValidation.isValid ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            )}
          </div>
          {touched.ruc && !rucValidation.isValid && (
            <p className="text-sm text-destructive">{rucValidation.error}</p>
          )}
          {touched.ruc && rucValidation.suggestion && (
            <p className="text-sm text-muted-foreground">{rucValidation.suggestion}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="giroEmpresa">Giro de la Empresa *</Label>
          <Input
            id="giroEmpresa"
            value={giroEmpresa}
            onChange={(e) => onGiroEmpresaChange(e.target.value)}
            onBlur={() => setTouched({ ...touched, giroEmpresa: true })}
            placeholder="Ej: Comercio, Educación, Servicios, etc."
            className={touched.giroEmpresa && !giroEmpresa ? 'border-destructive' : ''}
          />
          {touched.giroEmpresa && !giroEmpresa && (
            <p className="text-sm text-destructive">Giro de empresa es requerido</p>
          )}
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Nota:</strong> Todos los campos marcados con (*) son obligatorios para continuar.
        </p>
      </div>
    </div>
  );
};

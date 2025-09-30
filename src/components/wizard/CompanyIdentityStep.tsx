import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building2, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useWizardValidation } from "@/hooks/useWizardValidation";

interface CompanyIdentityStepProps {
  companyName: string;
  ruc: string;
  onCompanyNameChange: (value: string) => void;
  onRucChange: (value: string) => void;
}

const CompanyIdentityStep = ({
  companyName,
  ruc,
  onCompanyNameChange,
  onRucChange
}: CompanyIdentityStepProps) => {
  const { validateRUC } = useWizardValidation();
  const [rucValidation, setRucValidation] = useState({ isValid: false, error: '', suggestion: '' });
  const [touched, setTouched] = useState({ companyName: false, ruc: false });

  useEffect(() => {
    if (ruc && touched.ruc) {
      const validation = validateRUC(ruc);
      setRucValidation(validation);
    }
  }, [ruc, validateRUC, touched.ruc]);

  const handleRucChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    onRucChange(value);
  };

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-interbank-light rounded-full mb-4">
          <Building2 className="w-12 h-12 text-interbank-primary" />
        </div>
        <h2 className="text-2xl font-bold text-interbank-primary mb-2">
          ¿Quién eres?
        </h2>
        <p className="text-muted-foreground">
          Comencemos con la identificación de tu empresa
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label className="text-base font-medium">
            Razón Social / Nombre del Cliente
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={companyName}
              onChange={(e) => onCompanyNameChange(e.target.value)}
              onBlur={() => setTouched({ ...touched, companyName: true })}
              placeholder="Ej: Acme Corporación S.A.C."
              className={`text-base h-12 ${
                touched.companyName && !companyName.trim()
                  ? 'border-destructive focus-visible:ring-destructive'
                  : companyName.trim()
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : ''
              }`}
            />
            {companyName.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
          {touched.companyName && !companyName.trim() && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Este campo es requerido
            </p>
          )}
        </div>

        {/* RUC/DNI */}
        <div className="space-y-2">
          <Label className="text-base font-medium flex items-center gap-2">
            RUC / DNI
            <div className="group relative">
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              <div className="absolute left-0 top-6 hidden group-hover:block z-10 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                <p className="font-semibold mb-1">RUC o DNI:</p>
                <ul className="space-y-1">
                  <li>• RUC: 11 dígitos para empresas</li>
                  <li>• DNI: 8 dígitos para personas</li>
                </ul>
              </div>
            </div>
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={ruc}
              onChange={handleRucChange}
              onBlur={() => setTouched({ ...touched, ruc: true })}
              placeholder="Ej: 20123456789 (RUC) o 12345678 (DNI)"
              maxLength={11}
              className={`text-base h-12 font-mono ${
                touched.ruc && rucValidation.error
                  ? 'border-destructive focus-visible:ring-destructive'
                  : rucValidation.isValid
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : ''
              }`}
            />
            {touched.ruc && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {rucValidation.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : rucValidation.error ? (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                ) : null}
              </div>
            )}
          </div>

          {/* RUC Length Indicator */}
          {ruc && !rucValidation.isValid && !rucValidation.error && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-interbank-primary transition-all duration-300"
                  style={{
                    width: `${Math.min((ruc.length / 11) * 100, 100)}%`
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {ruc.length}/11
              </span>
            </div>
          )}

          {/* Validation Messages */}
          {touched.ruc && rucValidation.error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {rucValidation.error}
            </p>
          )}
          {rucValidation.isValid && rucValidation.suggestion && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {rucValidation.suggestion}
            </p>
          )}
        </div>

        {/* Helper Card */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">💡 Consejos:</p>
              <ul className="space-y-1 text-xs">
                <li>• Ingresa el nombre completo de tu empresa tal como aparece en documentos oficiales</li>
                <li>• El RUC debe coincidir con el registro en SUNAT</li>
                <li>• Si eres persona natural, puedes usar tu DNI de 8 dígitos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyIdentityStep;
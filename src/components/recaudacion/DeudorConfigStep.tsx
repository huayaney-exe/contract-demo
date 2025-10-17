import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeudorConfigStepProps {
  codigoIdentificadorDeudor: string;
  numeroCaracteresDeudor: string;
  onCodigoIdentificadorDeudorChange: (value: string) => void;
  onNumeroCaracteresDeudorChange: (value: string) => void;
}

export const DeudorConfigStep = ({
  codigoIdentificadorDeudor,
  numeroCaracteresDeudor,
  onCodigoIdentificadorDeudorChange,
  onNumeroCaracteresDeudorChange,
}: DeudorConfigStepProps) => {
  const handleCodigoChange = (value: string) => {
    // Remove invalid characters: "/" and ","
    const cleaned = value.replace(/[\/,]/g, '');
    if (cleaned.length <= 13) {
      onCodigoIdentificadorDeudorChange(cleaned);
    }
  };

  const handleNumeroCaracteresChange = (value: string) => {
    // Only allow numbers
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 14) {
      onNumeroCaracteresDeudorChange(cleaned);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Configuración del Deudor</h2>
        <p className="text-muted-foreground">
          Defina los parámetros de identificación del deudor
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="codigoDeudor">Código Identificador del Deudor (Referencia) *</Label>
          <Input
            id="codigoDeudor"
            value={codigoIdentificadorDeudor}
            onChange={(e) => handleCodigoChange(e.target.value)}
            placeholder="DNI, RUC, Cód. Suministro, ID alumno, etc."
            maxLength={13}
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {codigoIdentificadorDeudor.length}/13 caracteres
            </span>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-900 dark:text-amber-100">
              ⚠️ <strong>Restricciones:</strong> Longitud máxima 13 caracteres. No debe contener los caracteres "/" ni ","
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numeroCaracteres">Número de Caracteres del Código del Deudor *</Label>
          <Input
            id="numeroCaracteres"
            value={numeroCaracteresDeudor}
            onChange={(e) => handleNumeroCaracteresChange(e.target.value)}
            placeholder="Máximo 14 caracteres"
            maxLength={14}
            type="text"
            inputMode="numeric"
          />
          <p className="text-sm text-muted-foreground">
            {numeroCaracteresDeudor.length}/14 caracteres - Ingrese solo números
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 <strong>Ejemplos de códigos identificadores:</strong>
        </p>
        <ul className="text-sm text-blue-900 dark:text-blue-100 mt-2 space-y-1 list-disc list-inside">
          <li>DNI: Documento de identidad del deudor</li>
          <li>RUC: Registro único de contribuyente</li>
          <li>Código de suministro: Para servicios públicos</li>
          <li>ID de alumno: Para instituciones educativas</li>
          <li>Código de cliente: Identificador interno</li>
        </ul>
      </div>
    </div>
  );
};

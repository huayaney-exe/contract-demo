import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2 } from "lucide-react";

interface AccountEntry {
  porcentaje: string;
  tipoCuenta: 'corriente' | 'ahorros';
  moneda: 'soles' | 'dolares';
  numeroCuenta: string;
}

interface AccountDefinitionsStepProps {
  cuentasCobranzas: AccountEntry[];
  cuentasComisiones: AccountEntry[];
  onCuentasCobranzasChange: (cuentas: AccountEntry[]) => void;
  onCuentasComisionesChange: (cuentas: AccountEntry[]) => void;
  monedaSoles: boolean;
  monedaDolares: boolean;
}

export const AccountDefinitionsStep = ({
  cuentasCobranzas,
  cuentasComisiones,
  onCuentasCobranzasChange,
  onCuentasComisionesChange,
  monedaSoles,
  monedaDolares,
}: AccountDefinitionsStepProps) => {
  const addCobranzaAccount = () => {
    onCuentasCobranzasChange([
      ...cuentasCobranzas,
      { porcentaje: '', tipoCuenta: 'corriente', moneda: 'soles', numeroCuenta: '' }
    ]);
  };

  const removeCobranzaAccount = (index: number) => {
    onCuentasCobranzasChange(cuentasCobranzas.filter((_, i) => i !== index));
  };

  const updateCobranzaAccount = (index: number, field: keyof AccountEntry, value: string) => {
    const updated = [...cuentasCobranzas];
    updated[index] = { ...updated[index], [field]: value };
    onCuentasCobranzasChange(updated);
  };

  const addComisionAccount = () => {
    onCuentasComisionesChange([
      ...cuentasComisiones,
      { porcentaje: '', tipoCuenta: 'corriente', moneda: 'soles', numeroCuenta: '' }
    ]);
  };

  const removeComisionAccount = (index: number) => {
    onCuentasComisionesChange(cuentasComisiones.filter((_, i) => i !== index));
  };

  const updateComisionAccount = (index: number, field: keyof AccountEntry, value: string) => {
    const updated = [...cuentasComisiones];
    updated[index] = { ...updated[index], [field]: value };
    onCuentasComisionesChange(updated);
  };

  const calculateTotal = (cuentas: AccountEntry[]) => {
    return cuentas.reduce((sum, cuenta) => sum + (parseFloat(cuenta.porcentaje) || 0), 0);
  };

  const totalCobranzas = calculateTotal(cuentasCobranzas);
  const totalComisiones = calculateTotal(cuentasComisiones);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Definición de Cuentas</h2>
        <p className="text-muted-foreground">
          Configure las cuentas para abonos de cobranzas y cargos por comisiones
        </p>
      </div>

      {/* Cuentas Cobranzas */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Cuentas para Abonos de Cobranzas *</h3>
          <Button onClick={addCobranzaAccount} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Cuenta
          </Button>
        </div>

        {monedaSoles && monedaDolares && (
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              ℹ️ Como el servicio es de doble moneda, debe indicar al menos una cuenta en soles y una en dólares
            </p>
          </div>
        )}

        {cuentasCobranzas.map((cuenta, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Label className="font-semibold">Cuenta {index + 1}</Label>
              <Button
                onClick={() => removeCobranzaAccount(index)}
                size="sm"
                variant="ghost"
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Porcentaje (%)</Label>
                <Input
                  value={cuenta.porcentaje}
                  onChange={(e) => updateCobranzaAccount(index, 'porcentaje', e.target.value)}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Cuenta</Label>
                <RadioGroup
                  value={cuenta.tipoCuenta}
                  onValueChange={(value) => updateCobranzaAccount(index, 'tipoCuenta', value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corriente" id={`cobranza-corriente-${index}`} />
                    <Label htmlFor={`cobranza-corriente-${index}`} className="cursor-pointer">Cta. Cte.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ahorros" id={`cobranza-ahorros-${index}`} />
                    <Label htmlFor={`cobranza-ahorros-${index}`} className="cursor-pointer">Ahorros</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Moneda</Label>
                <RadioGroup
                  value={cuenta.moneda}
                  onValueChange={(value) => updateCobranzaAccount(index, 'moneda', value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="soles" id={`cobranza-soles-${index}`} />
                    <Label htmlFor={`cobranza-soles-${index}`} className="cursor-pointer">Soles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dolares" id={`cobranza-dolares-${index}`} />
                    <Label htmlFor={`cobranza-dolares-${index}`} className="cursor-pointer">Dólares</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Número de Cuenta</Label>
                <Input
                  value={cuenta.numeroCuenta}
                  onChange={(e) => updateCobranzaAccount(index, 'numeroCuenta', e.target.value)}
                  placeholder="Número de cuenta"
                />
              </div>
            </div>
          </div>
        ))}

        {cuentasCobranzas.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay cuentas agregadas. Haga clic en "Agregar Cuenta" para comenzar.
          </p>
        )}

        {cuentasCobranzas.length > 0 && (
          <div className={`text-right font-semibold ${Math.abs(totalCobranzas - 100) > 0.01 ? 'text-destructive' : 'text-green-600'}`}>
            Total: {totalCobranzas.toFixed(2)}% {Math.abs(totalCobranzas - 100) > 0.01 && '(debe sumar 100%)'}
          </div>
        )}
      </div>

      {/* Cuentas Comisiones */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Cuentas para Cargos por Comisiones *</h3>
          <Button onClick={addComisionAccount} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Cuenta
          </Button>
        </div>

        {monedaSoles && monedaDolares && (
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              ℹ️ Como el servicio es de doble moneda, debe indicar al menos una cuenta en soles y una en dólares
            </p>
          </div>
        )}

        {cuentasComisiones.map((cuenta, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Label className="font-semibold">Cuenta {index + 1}</Label>
              <Button
                onClick={() => removeComisionAccount(index)}
                size="sm"
                variant="ghost"
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Porcentaje (%)</Label>
                <Input
                  value={cuenta.porcentaje}
                  onChange={(e) => updateComisionAccount(index, 'porcentaje', e.target.value)}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Cuenta</Label>
                <RadioGroup
                  value={cuenta.tipoCuenta}
                  onValueChange={(value) => updateComisionAccount(index, 'tipoCuenta', value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="corriente" id={`comision-corriente-${index}`} />
                    <Label htmlFor={`comision-corriente-${index}`} className="cursor-pointer">Cta. Cte.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ahorros" id={`comision-ahorros-${index}`} />
                    <Label htmlFor={`comision-ahorros-${index}`} className="cursor-pointer">Ahorros</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Moneda</Label>
                <RadioGroup
                  value={cuenta.moneda}
                  onValueChange={(value) => updateComisionAccount(index, 'moneda', value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="soles" id={`comision-soles-${index}`} />
                    <Label htmlFor={`comision-soles-${index}`} className="cursor-pointer">Soles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dolares" id={`comision-dolares-${index}`} />
                    <Label htmlFor={`comision-dolares-${index}`} className="cursor-pointer">Dólares</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Número de Cuenta</Label>
                <Input
                  value={cuenta.numeroCuenta}
                  onChange={(e) => updateComisionAccount(index, 'numeroCuenta', e.target.value)}
                  placeholder="Número de cuenta"
                />
              </div>
            </div>
          </div>
        ))}

        {cuentasComisiones.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay cuentas agregadas. Haga clic en "Agregar Cuenta" para comenzar.
          </p>
        )}

        {cuentasComisiones.length > 0 && (
          <div className={`text-right font-semibold ${Math.abs(totalComisiones - 100) > 0.01 ? 'text-destructive' : 'text-green-600'}`}>
            Total: {totalComisiones.toFixed(2)}% {Math.abs(totalComisiones - 100) > 0.01 && '(debe sumar 100%)'}
          </div>
        )}
      </div>
    </div>
  );
};

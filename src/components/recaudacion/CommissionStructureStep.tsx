import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CommissionStructureStepProps {
  comisionAgenteEmpresaSoles: string;
  comisionAgenteEmpresaDolares: string;
  comisionAgenteUsuarioLima: string;
  comisionElectronicosEmpresaSoles: string;
  comisionElectronicosOtro1: string;
  comisionElectronicosOtro2: string;
  onComisionAgenteEmpresaSolesChange: (value: string) => void;
  onComisionAgenteEmpresaDolaresChange: (value: string) => void;
  onComisionAgenteUsuarioLimaChange: (value: string) => void;
  onComisionElectronicosEmpresaSolesChange: (value: string) => void;
  onComisionElectronicosOtro1Change: (value: string) => void;
  onComisionElectronicosOtro2Change: (value: string) => void;
}

export const CommissionStructureStep = ({
  comisionAgenteEmpresaSoles,
  comisionAgenteEmpresaDolares,
  comisionAgenteUsuarioLima,
  comisionElectronicosEmpresaSoles,
  comisionElectronicosOtro1,
  comisionElectronicosOtro2,
  onComisionAgenteEmpresaSolesChange,
  onComisionAgenteEmpresaDolaresChange,
  onComisionAgenteUsuarioLimaChange,
  onComisionElectronicosEmpresaSolesChange,
  onComisionElectronicosOtro1Change,
  onComisionElectronicosOtro2Change,
}: CommissionStructureStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Estructura de Comisiones</h2>
        <p className="text-muted-foreground">
          Defina las comisiones por cobro realizado según el canal
        </p>
      </div>

      <div className="space-y-6">
        {/* Interbank Agente Commissions */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-lg">Interbank Agente</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agenteEmpresaSoles">Empresa - Soles (S/)</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">S/</span>
                <Input
                  id="agenteEmpresaSoles"
                  value={comisionAgenteEmpresaSoles}
                  onChange={(e) => onComisionAgenteEmpresaSolesChange(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agenteEmpresaDolares">Empresa - Dólares (US$)</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">US$</span>
                <Input
                  id="agenteEmpresaDolares"
                  value={comisionAgenteEmpresaDolares}
                  onChange={(e) => onComisionAgenteEmpresaDolaresChange(e.target.value)}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenteUsuarioLima">Usuario - Interbank Agente (Lima y Provincias)</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">S/</span>
              <Input
                id="agenteUsuarioLima"
                value={comisionAgenteUsuarioLima}
                onChange={(e) => onComisionAgenteUsuarioLimaChange(e.target.value)}
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Canales Electrónicos Commissions */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-lg">Canales Electrónicos (App Interbank / Banca por Internet)</h3>
          
          <div className="space-y-2">
            <Label htmlFor="electronicosEmpresaSoles">Empresa - Soles (S/)</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">S/</span>
              <Input
                id="electronicosEmpresaSoles"
                value={comisionElectronicosEmpresaSoles}
                onChange={(e) => onComisionElectronicosEmpresaSolesChange(e.target.value)}
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="electronicosOtro1">Otro * (trato directo)</Label>
            <Input
              id="electronicosOtro1"
              value={comisionElectronicosOtro1}
              onChange={(e) => onComisionElectronicosOtro1Change(e.target.value)}
              placeholder="Especificar tipo y monto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="electronicosOtro2">Otro * (trato directo)</Label>
            <Input
              id="electronicosOtro2"
              value={comisionElectronicosOtro2}
              onChange={(e) => onComisionElectronicosOtro2Change(e.target.value)}
              placeholder="Especificar tipo y monto"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            * Trato directo, previa negociación con ejecutivo
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 <strong>Nota:</strong> Las comisiones marcadas con "Otro" requieren negociación directa 
          con un ejecutivo de Interbank. Complete estos campos solo si ya ha acordado comisiones especiales.
        </p>
      </div>
    </div>
  );
};

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface GeneralCharacteristicsStepProps {
  envioArchivo: 'sftp' | 'correo';
  indicadorCarga: '9pm' | '24horas';
  horarioRecaudacion: string;
  onEnvioArchivoChange: (value: 'sftp' | 'correo') => void;
  onIndicadorCargaChange: (value: '9pm' | '24horas') => void;
  onHorarioRecaudacionChange: (value: string) => void;
}

export const GeneralCharacteristicsStep = ({
  envioArchivo,
  indicadorCarga,
  horarioRecaudacion,
  onEnvioArchivoChange,
  onIndicadorCargaChange,
  onHorarioRecaudacionChange,
}: GeneralCharacteristicsStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Características Generales del Servicio</h2>
        <p className="text-muted-foreground">
          Configure los aspectos operativos del servicio de recaudación
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Envío de Archivo de Conciliación *</Label>
          <RadioGroup
            value={envioArchivo}
            onValueChange={(value) => onEnvioArchivoChange(value as 'sftp' | 'correo')}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sftp" id="sftp" />
              <Label htmlFor="sftp" className="cursor-pointer">SFTP</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="correo" id="correo" />
              <Label htmlFor="correo" className="cursor-pointer">
                Correo Electrónico
              </Label>
            </div>
          </RadioGroup>
          {envioArchivo === 'correo' && (
            <p className="text-sm text-muted-foreground pl-6">
              Los correos se configurarán en la sección de envío de archivos de consolidación
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label>Indicador de Carga *</Label>
          <RadioGroup
            value={indicadorCarga}
            onValueChange={(value) => onIndicadorCargaChange(value as '9pm' | '24horas')}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="9pm" id="9pm" />
              <Label htmlFor="9pm" className="cursor-pointer">Hasta las 9 p.m.</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24horas" id="24horas" />
              <Label htmlFor="24horas" className="cursor-pointer">24 horas</Label>
            </div>
          </RadioGroup>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              ℹ️ El indicador de carga debe marcarse sólo en el primer servicio implementado. 
              Esta elección regirá para el resto de las implementaciones.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="horarioRecaudacion">Horario de Recaudación *</Label>
          <Input
            id="horarioRecaudacion"
            value={horarioRecaudacion}
            onChange={(e) => onHorarioRecaudacionChange(e.target.value)}
            placeholder="Ej: Por servicio (un archivo por servicio)"
          />
          <p className="text-sm text-muted-foreground">
            Especifique el horario o modalidad de recaudación
          </p>
        </div>
      </div>
    </div>
  );
};

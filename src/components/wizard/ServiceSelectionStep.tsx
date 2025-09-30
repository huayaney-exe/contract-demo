import { Briefcase, Building2, Wallet } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ServiceSelectionStepProps {
  services: {
    remuneraciones: boolean;
    proveedores: boolean;
    pagosVarios: boolean;
  };
  serviceType: 'nuevo' | 'modificacion' | null;
  onServiceChange: (service: string, value: boolean) => void;
  onServiceTypeChange: (type: 'nuevo' | 'modificacion') => void;
}

const ServiceSelectionStep = ({
  services,
  serviceType,
  onServiceChange,
  onServiceTypeChange
}: ServiceSelectionStepProps) => {
  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-interbank-primary mb-2">
          ¿Qué servicios necesitas?
        </h2>
        <p className="text-muted-foreground">
          Selecciona uno o más servicios de pagos masivos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard
          icon={<Briefcase className="w-12 h-12 text-interbank-primary" />}
          title="Remuneraciones y CTS"
          description="Pagos de planilla, remuneraciones y compensación por tiempo de servicios a tus colaboradores"
          isSelected={services.remuneraciones}
          onSelect={() =>
            onServiceChange('remuneraciones', !services.remuneraciones)
          }
        />

        <ServiceCard
          icon={<Building2 className="w-12 h-12 text-interbank-primary" />}
          title="Proveedores"
          description="Pagos a personas jurídicas y naturales mediante abonos, transferencias CCI/BCR y cheques de gerencia"
          footnote="(1) Incluye pagos a Persona Jurídica y Persona Natural con documento oficial de identidad"
          isSelected={services.proveedores}
          onSelect={() => onServiceChange('proveedores', !services.proveedores)}
        />

        <ServiceCard
          icon={<Wallet className="w-12 h-12 text-interbank-primary" />}
          title="Pagos Varios"
          description="Pagos en efectivo (Orden de Pago), cheques de gerencia y abonos en cuenta para personas naturales"
          footnote="(2) Incluye Persona Natural con documento oficial de identidad"
          isSelected={services.pagosVarios}
          onSelect={() => onServiceChange('pagosVarios', !services.pagosVarios)}
        />
      </div>

      {/* Service Type Selection */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <Label className="text-base font-semibold mb-4 block">
          Tipo de solicitud
        </Label>

        <RadioGroup
          value={serviceType || 'nuevo'}
          onValueChange={(value) => onServiceTypeChange(value as 'nuevo' | 'modificacion')}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-white transition-colors">
            <RadioGroupItem value="nuevo" id="nuevo" />
            <Label
              htmlFor="nuevo"
              className="cursor-pointer flex-1 font-normal"
            >
              <span className="font-semibold">Nuevo</span> - Primera afiliación
              al servicio
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-white transition-colors">
            <RadioGroupItem value="modificacion" id="modificacion" />
            <Label
              htmlFor="modificacion"
              className="cursor-pointer flex-1 font-normal"
            >
              <span className="font-semibold">Modificación</span> - Cambios a un
              servicio existente
            </Label>
          </div>
        </RadioGroup>

        {serviceType === 'modificacion' && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              ℹ️ Solo necesitas completar los campos que deseas modificar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSelectionStep;
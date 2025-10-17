import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ContactInfoStepProps {
  correosConsolidacion: string[];
  correosConfirmacion: string[];
  nombreContacto: string;
  correoContacto: string;
  telefonoContacto: string;
  onCorreosConsolidacionChange: (correos: string[]) => void;
  onCorreosConfirmacionChange: (correos: string[]) => void;
  onNombreContactoChange: (value: string) => void;
  onCorreoContactoChange: (value: string) => void;
  onTelefonoContactoChange: (value: string) => void;
}

export const ContactInfoStep = ({
  correosConsolidacion,
  correosConfirmacion,
  nombreContacto,
  correoContacto,
  telefonoContacto,
  onCorreosConsolidacionChange,
  onCorreosConfirmacionChange,
  onNombreContactoChange,
  onCorreoContactoChange,
  onTelefonoContactoChange,
}: ContactInfoStepProps) => {
  const [newCorreoConsolidacion, setNewCorreoConsolidacion] = useState('');
  const [newCorreoConfirmacion, setNewCorreoConfirmacion] = useState('');

  const addCorreoConsolidacion = () => {
    if (newCorreoConsolidacion.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCorreoConsolidacion)) {
      onCorreosConsolidacionChange([...correosConsolidacion, newCorreoConsolidacion.trim()]);
      setNewCorreoConsolidacion('');
    }
  };

  const removeCorreoConsolidacion = (index: number) => {
    onCorreosConsolidacionChange(correosConsolidacion.filter((_, i) => i !== index));
  };

  const addCorreoConfirmacion = () => {
    if (newCorreoConfirmacion.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCorreoConfirmacion)) {
      onCorreosConfirmacionChange([...correosConfirmacion, newCorreoConfirmacion.trim()]);
      setNewCorreoConfirmacion('');
    }
  };

  const removeCorreoConfirmacion = (index: number) => {
    onCorreosConfirmacionChange(correosConfirmacion.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Información de Contacto y Correos</h2>
        <p className="text-muted-foreground">
          Configure los correos y datos de contacto para el servicio
        </p>
      </div>

      <div className="space-y-6">
        {/* Correos Consolidación */}
        <div className="space-y-3">
          <Label>Correos para el Envío del Archivo de Consolidación *</Label>
          <div className="flex gap-2">
            <Input
              value={newCorreoConsolidacion}
              onChange={(e) => setNewCorreoConsolidacion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCorreoConsolidacion()}
              placeholder="ejemplo@empresa.com"
              type="email"
            />
            <Button onClick={addCorreoConsolidacion} type="button">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {correosConsolidacion.length > 0 && (
            <div className="space-y-2">
              {correosConsolidacion.map((correo, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                  <span className="text-sm">{correo}</span>
                  <Button
                    onClick={() => removeCorreoConsolidacion(index)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {correosConsolidacion.length === 0 && (
            <p className="text-sm text-muted-foreground">No hay correos agregados</p>
          )}
        </div>

        {/* Correos Confirmación */}
        <div className="space-y-3">
          <Label>Correos para Recepción de Confirmación de Carga *</Label>
          <div className="flex gap-2">
            <Input
              value={newCorreoConfirmacion}
              onChange={(e) => setNewCorreoConfirmacion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCorreoConfirmacion()}
              placeholder="ejemplo@empresa.com"
              type="email"
            />
            <Button onClick={addCorreoConfirmacion} type="button">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {correosConfirmacion.length > 0 && (
            <div className="space-y-2">
              {correosConfirmacion.map((correo, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                  <span className="text-sm">{correo}</span>
                  <Button
                    onClick={() => removeCorreoConfirmacion(index)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {correosConfirmacion.length === 0 && (
            <p className="text-sm text-muted-foreground">No hay correos agregados</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Información de la Empresa</h3>
          
          <div className="space-y-2">
            <Label htmlFor="nombreContacto">Nombre Contacto Servicio de Recaudación *</Label>
            <Input
              id="nombreContacto"
              value={nombreContacto}
              onChange={(e) => onNombreContactoChange(e.target.value)}
              placeholder="Nombre completo del contacto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="correoContacto">Correo Electrónico *</Label>
            <Input
              id="correoContacto"
              value={correoContacto}
              onChange={(e) => onCorreoContactoChange(e.target.value)}
              placeholder="correo@empresa.com"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefonoContacto">Teléfono de Contacto *</Label>
            <Input
              id="telefonoContacto"
              value={telefonoContacto}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, '');
                onTelefonoContactoChange(cleaned);
              }}
              placeholder="999999999"
              type="tel"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

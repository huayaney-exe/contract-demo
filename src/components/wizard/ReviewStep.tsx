import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Building2, User, Briefcase, DollarSign, Landmark, Settings } from "lucide-react";
import { WizardFormData } from "@/types/wizard";

interface ReviewStepProps {
  formData: WizardFormData;
  onEdit: (stepId: string) => void;
}

const ReviewStep = ({ formData, onEdit }: ReviewStepProps) => {
  const serviceNames = {
    remuneraciones: 'Remuneraciones/CTS',
    proveedores: 'Proveedores',
    pagosVarios: 'Pagos Varios'
  };

  const selectedServices = Object.entries(formData.services)
    .filter(([_, enabled]) => enabled)
    .map(([service]) => serviceNames[service as keyof typeof serviceNames]);

  const currencies = [];
  if (formData.currencies.soles) currencies.push('Soles (S/)');
  if (formData.currencies.dolares) currencies.push('Dólares ($)');

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-green-50 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-interbank-primary mb-2">
          Revisa y confirma
        </h2>
        <p className="text-muted-foreground">
          Verifica que toda la información sea correcta antes de generar el anexo
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Company Identity */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-interbank-light p-3 rounded-full">
                <Building2 className="w-6 h-6 text-interbank-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-interbank-primary mb-3">
                  Información de la Empresa
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Razón Social:</span>
                    <p className="font-medium">{formData.companyName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RUC/DNI:</span>
                    <p className="font-medium font-mono">{formData.ruc}</p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('company-identity')}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </div>
        </Card>

        {/* Contact Info */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-interbank-light p-3 rounded-full">
                <User className="w-6 h-6 text-interbank-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-interbank-primary mb-3">
                  Información de Contacto
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Nombre:</span>
                    <p className="font-medium">{formData.contactName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Teléfono:</span>
                    <p className="font-medium">{formData.contactPhone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email principal:</span>
                    <p className="font-medium">{formData.contactEmail1}</p>
                  </div>
                  {formData.contactEmail2 && (
                    <div>
                      <span className="text-muted-foreground">Email secundario:</span>
                      <p className="font-medium">{formData.contactEmail2}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('contact-info')}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </div>
        </Card>

        {/* Services */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-interbank-light p-3 rounded-full">
                <Briefcase className="w-6 h-6 text-interbank-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-interbank-primary mb-3">
                  Servicios Seleccionados
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200"
                      >
                        ✓ {service}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <span className="text-muted-foreground">Tipo de solicitud:</span>
                    <p className="font-medium capitalize">{formData.serviceType || 'Nuevo'}</p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('services')}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </div>
        </Card>

        {/* Currencies & Accounts */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-interbank-light p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-interbank-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-interbank-primary mb-3">
                  Monedas y Cuentas
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Monedas:</span>
                    <div className="flex gap-2 mt-1">
                      {currencies.map((currency) => (
                        <span
                          key={currency}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {currency}
                        </span>
                      ))}
                    </div>
                  </div>
                  {formData.accountSoles && (
                    <div>
                      <span className="text-muted-foreground">Cuenta Soles:</span>
                      <p className="font-medium">
                        {formData.accountSoles.type === 'ahorro' ? 'Ahorro' : 'Corriente'} - {formData.accountSoles.number}
                      </p>
                    </div>
                  )}
                  {formData.accountDolares && (
                    <div>
                      <span className="text-muted-foreground">Cuenta Dólares:</span>
                      <p className="font-medium">
                        {formData.accountDolares.type === 'ahorro' ? 'Ahorro' : 'Corriente'} - {formData.accountDolares.number}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit('currency')}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
            </div>
          </div>
        </Card>

        {/* Controls Summary */}
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-interbank-light p-3 rounded-full">
                <Landmark className="w-6 h-6 text-interbank-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-interbank-primary mb-3">
                  Controles Configurados
                </h3>
                <p className="text-sm text-muted-foreground">
                  Límites de control configurados para {selectedServices.length} servicio(s) en {currencies.length} moneda(s)
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit('controls')}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </div>
        </Card>

        {/* Additional Info (if applicable) */}
        {(formData.services.proveedores || formData.services.pagosVarios) && (
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-interbank-light p-3 rounded-full">
                  <Settings className="w-6 h-6 text-interbank-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-interbank-primary mb-3">
                    Configuración Adicional
                  </h3>
                  <div className="space-y-2 text-sm">
                    {formData.additional?.maxDaysProviders && (
                      <div>
                        <span className="text-muted-foreground">Días máximos Proveedores:</span>
                        <p className="font-medium">{formData.additional.maxDaysProviders} días</p>
                      </div>
                    )}
                    {formData.additional?.maxDaysVarios && (
                      <div>
                        <span className="text-muted-foreground">Días máximos Pagos Varios:</span>
                        <p className="font-medium">{formData.additional.maxDaysVarios} días</p>
                      </div>
                    )}
                    {formData.additional?.consolidateProviders && (
                      <div>
                        <span className="text-muted-foreground">Consolidar facturas Proveedores:</span>
                        <p className="font-medium capitalize">{formData.additional.consolidateProviders}</p>
                      </div>
                    )}
                    {formData.additional?.consolidateVarios && (
                      <div>
                        <span className="text-muted-foreground">Consolidar facturas Pagos Varios:</span>
                        <p className="font-medium capitalize">{formData.additional.consolidateVarios}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit('additional')}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
            </div>
          </Card>
        )}

        {/* Confirmation Message */}
        <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 mb-1">
                ¡Todo listo para generar tu anexo!
              </p>
              <p className="text-sm text-green-800">
                Hemos validado toda la información. Presiona "Generar Anexo" para crear tu documento PDF con los datos ingresados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
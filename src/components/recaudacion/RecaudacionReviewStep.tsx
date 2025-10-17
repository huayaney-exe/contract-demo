import { RecaudacionFormData } from "@/types/recaudacion";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface RecaudacionReviewStepProps {
  formData: RecaudacionFormData;
  onEdit: (stepId: string) => void;
}

export const RecaudacionReviewStep = ({ formData, onEdit }: RecaudacionReviewStepProps) => {
  const Section = ({ title, stepId, children }: { title: string; stepId: string; children: React.ReactNode }) => (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          {title}
        </h3>
        <button
          onClick={() => onEdit(stepId)}
          className="text-sm text-primary hover:underline"
        >
          Editar
        </button>
      </div>
      {children}
    </Card>
  );

  const Field = ({ label, value }: { label: string; value: string | number | boolean | undefined }) => (
    <div className="grid grid-cols-3 gap-4 py-2 border-b last:border-b-0">
      <dt className="text-sm font-medium text-muted-foreground">{label}:</dt>
      <dd className="col-span-2 text-sm">{value?.toString() || 'N/A'}</dd>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Revisión Final</h2>
        <p className="text-muted-foreground">
          Revise todos los datos antes de enviar el formulario
        </p>
      </div>

      <div className="space-y-4">
        <Section title="Información de la Empresa" stepId="company-info">
          <dl className="space-y-0">
            <Field label="Código Único" value={formData.codigoUnico} />
            <Field label="Punto de Servicio" value={formData.puntoServicio} />
            <Field label="Razón Social" value={formData.razonSocial} />
            <Field label="RUC" value={formData.ruc} />
            <Field label="Giro de Empresa" value={formData.giroEmpresa} />
          </dl>
        </Section>

        <Section title="Configuración del Servicio" stepId="service-config">
          <dl className="space-y-0">
            <Field label="Tipo de Servicio" value={formData.tipoServicio === 'nuevo' ? 'Nuevo' : 'Modificación'} />
            <Field label="Nombre Comercial" value={formData.nombreComercial} />
            <Field label="Número de Servicio" value={formData.numeroServicio} />
            <Field label="Nombre de Servicio" value={formData.nombreServicio} />
          </dl>
        </Section>

        <Section title="Características Generales" stepId="general-characteristics">
          <dl className="space-y-0">
            <Field label="Envío de Archivo" value={formData.envioArchivo === 'sftp' ? 'SFTP' : 'Correo'} />
            <Field label="Indicador de Carga" value={formData.indicadorCarga === '9pm' ? 'Hasta las 9 p.m.' : '24 horas'} />
            <Field label="Horario de Recaudación" value={formData.horarioRecaudacion} />
          </dl>
        </Section>

        <Section title="Características Específicas" stepId="specific-characteristics">
          <dl className="space-y-0">
            <Field label="Moneda Soles" value={formData.monedaSoles ? 'Sí' : 'No'} />
            <Field label="Moneda Dólares" value={formData.monedaDolares ? 'Sí' : 'No'} />
            <Field label="App/Banca Internet" value={formData.canalAppBanca ? 'Sí' : 'No'} />
            <Field label="Agente Lima" value={formData.canalAgenteLima ? 'Sí' : 'No'} />
            <Field label="Agente Provincias" value={formData.canalAgenteProvincias ? 'Sí' : 'No'} />
            <Field label="Agente Supermercados" value={formData.canalAgenteSupermercados ? 'Sí' : 'No'} />
            {formData.canalOtros && <Field label="Otros Canales" value={formData.canalOtros} />}
            <Field label="Tipo de Abono" value={formData.tipoAbono} />
          </dl>
        </Section>

        <Section title="Tipos de Pago" stepId="payment-types">
          <dl className="space-y-0">
            <Field label="Acepta Pagos Vencidos" value={formData.aceptaPagosVencidos ? 'Sí' : 'No'} />
            <Field label="Obliga Pagos Sucesivos" value={formData.obligaPagosSucesivos ? 'Sí' : 'No'} />
            <Field label="Acepta Pagos Parciales" value={formData.aceptaPagosParciales ? 'Sí' : 'No'} />
          </dl>
        </Section>

        <Section title="Configuración del Deudor" stepId="deudor-config">
          <dl className="space-y-0">
            <Field label="Código Identificador" value={formData.codigoIdentificadorDeudor} />
            <Field label="Número de Caracteres" value={formData.numeroCaracteresDeudor} />
          </dl>
        </Section>

        <Section title="Estructura de Comisiones" stepId="commission-structure">
          <dl className="space-y-0">
            <Field label="Agente Empresa (Soles)" value={formData.comisionAgenteEmpresaSoles ? `S/ ${formData.comisionAgenteEmpresaSoles}` : 'N/A'} />
            <Field label="Agente Empresa (Dólares)" value={formData.comisionAgenteEmpresaDolares ? `US$ ${formData.comisionAgenteEmpresaDolares}` : 'N/A'} />
            <Field label="Agente Usuario (Lima)" value={formData.comisionAgenteUsuarioLima ? `S/ ${formData.comisionAgenteUsuarioLima}` : 'N/A'} />
            <Field label="Electrónicos Empresa" value={formData.comisionElectronicosEmpresaSoles ? `S/ ${formData.comisionElectronicosEmpresaSoles}` : 'N/A'} />
          </dl>
        </Section>

        <Section title="Cuentas de Cobranzas" stepId="account-definitions">
          {formData.cuentasCobranzas.length > 0 ? (
            <div className="space-y-2">
              {formData.cuentasCobranzas.map((cuenta, index) => (
                <div key={index} className="border-b pb-2 last:border-b-0">
                  <p className="text-sm font-medium">Cuenta {index + 1}</p>
                  <p className="text-sm text-muted-foreground">
                    {cuenta.porcentaje}% - {cuenta.tipoCuenta} - {cuenta.moneda} - {cuenta.numeroCuenta}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No hay cuentas agregadas</p>
          )}
        </Section>

        <Section title="Información de Contacto" stepId="contact-info">
          <dl className="space-y-0">
            <Field label="Nombre Contacto" value={formData.nombreContacto} />
            <Field label="Correo Contacto" value={formData.correoContacto} />
            <Field label="Teléfono" value={formData.telefonoContacto} />
            <div className="grid grid-cols-3 gap-4 py-2 border-b">
              <dt className="text-sm font-medium text-muted-foreground">Correos Consolidación:</dt>
              <dd className="col-span-2 text-sm">{formData.correosConsolidacion.join(', ') || 'N/A'}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 py-2">
              <dt className="text-sm font-medium text-muted-foreground">Correos Confirmación:</dt>
              <dd className="col-span-2 text-sm">{formData.correosConfirmacion.join(', ') || 'N/A'}</dd>
            </div>
          </dl>
        </Section>

        {(formData.tipoRecaudacion || formData.numeroClientes) && (
          <Section title="Datos Opcionales" stepId="optional-data">
            <dl className="space-y-0">
              {formData.tipoRecaudacion && <Field label="Tipo Recaudación" value={formData.tipoRecaudacion} />}
              {formData.numeroClientes && <Field label="Número de Clientes" value={formData.numeroClientes} />}
              {formData.recaudacionAnualSoles && <Field label="Recaudación Anual (Soles)" value={`S/ ${formData.recaudacionAnualSoles}`} />}
              {formData.recaudacionAnualDolares && <Field label="Recaudación Anual (Dólares)" value={`US$ ${formData.recaudacionAnualDolares}`} />}
            </dl>
          </Section>
        )}
      </div>

      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-900 dark:text-green-100">
          ✅ Todos los datos se han completado correctamente. Puede proceder a generar el contrato.
        </p>
      </div>
    </div>
  );
};

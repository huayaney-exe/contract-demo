import { useState } from "react";
import { RecaudacionFormData } from "@/types/recaudacion";
import { useRecaudacionValidation } from "@/hooks/useRecaudacionValidation";
import { CompanyInfoStep } from "./CompanyInfoStep";
import { ServiceConfigStep } from "./ServiceConfigStep";
import { GeneralCharacteristicsStep } from "./GeneralCharacteristicsStep";
import { SpecificCharacteristicsStep } from "./SpecificCharacteristicsStep";
import { PaymentTypesStep } from "./PaymentTypesStep";
import { DeudorConfigStep } from "./DeudorConfigStep";
import { CommissionStructureStep } from "./CommissionStructureStep";
import { AccountDefinitionsStep } from "./AccountDefinitionsStep";
import { ContactInfoStep } from "./ContactInfoStep";
import { OptionalDataStep } from "./OptionalDataStep";
import { RecaudacionReviewStep } from "./RecaudacionReviewStep";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressIndicator from "@/components/wizard/ProgressIndicator";

interface RecaudacionWizardContainerProps {
  onComplete: (data: RecaudacionFormData) => void;
}

export const RecaudacionWizardContainer = ({ onComplete }: RecaudacionWizardContainerProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<RecaudacionFormData>({
    codigoUnico: '',
    puntoServicio: '',
    razonSocial: '',
    ruc: '',
    giroEmpresa: '',
    tipoServicio: 'nuevo',
    nombreComercial: '',
    numeroServicio: '',
    nombreServicio: '',
    envioArchivo: 'sftp',
    indicadorCarga: '9pm',
    horarioRecaudacion: '',
    monedaSoles: false,
    monedaDolares: false,
    canalAppBanca: false,
    canalAgenteLima: false,
    canalAgenteProvincias: false,
    canalAgenteSupermercados: false,
    canalOtros: '',
    tipoAbono: 'lineaDetallado',
    aceptaPagosVencidos: false,
    obligaPagosSucesivos: true,
    aceptaPagosParciales: false,
    codigoIdentificadorDeudor: '',
    numeroCaracteresDeudor: '',
    comisionAgenteEmpresaSoles: '',
    comisionAgenteEmpresaDolares: '',
    comisionAgenteUsuarioLima: '',
    comisionElectronicosEmpresaSoles: '',
    comisionElectronicosOtro1: '',
    comisionElectronicosOtro2: '',
    cuentasCobranzas: [],
    cuentasComisiones: [],
    correosConsolidacion: [],
    correosConfirmacion: [],
    nombreContacto: '',
    correoContacto: '',
    telefonoContacto: '',
    tipoRecaudacion: '',
    numeroClientes: '',
    recaudacionAnualSoles: '',
    recaudacionAnualDolares: '',
  });

  const validation = useRecaudacionValidation();

  const steps = [
    { id: 'company-info', title: 'Información de la Empresa', isComplete: false },
    { id: 'service-config', title: 'Configuración del Servicio', isComplete: false },
    { id: 'general-characteristics', title: 'Características Generales', isComplete: false },
    { id: 'specific-characteristics', title: 'Características Específicas', isComplete: false },
    { id: 'payment-types', title: 'Tipos de Pago', isComplete: false },
    { id: 'deudor-config', title: 'Configuración del Deudor', isComplete: false },
    { id: 'commission-structure', title: 'Estructura de Comisiones', isComplete: false },
    { id: 'account-definitions', title: 'Definición de Cuentas', isComplete: false },
    { id: 'contact-info', title: 'Información de Contacto', isComplete: false },
    { id: 'optional-data', title: 'Datos Opcionales', isComplete: false },
    { id: 'review', title: 'Revisión Final', isComplete: false },
  ];

  const validateCurrentStep = () => {
    const stepId = steps[currentStepIndex].id;
    
    switch (stepId) {
      case 'company-info': return validation.validateCompanyInfo(formData);
      case 'service-config': return validation.validateServiceConfig(formData);
      case 'general-characteristics': return validation.validateGeneralCharacteristics(formData);
      case 'specific-characteristics': return validation.validateSpecificCharacteristics(formData);
      case 'payment-types': return validation.validatePaymentTypes(formData);
      case 'deudor-config': return validation.validateDeudorConfig(formData);
      case 'commission-structure': return validation.validateCommissionStructure(formData);
      case 'account-definitions': return validation.validateAccountDefinitions(formData);
      case 'contact-info': return validation.validateContactInfo(formData);
      default: return { isValid: true, errors: {}, canProceed: true };
    }
  };

  const handleNext = () => {
    const stepValidation = validateCurrentStep();
    
    if (!stepValidation.canProceed) {
      validation.setErrors(stepValidation.errors);
      return;
    }
    
    validation.setErrors({});
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      validation.setErrors({});
    }
  };

  const handleEdit = (stepId: string) => {
    const index = steps.findIndex(s => s.id === stepId);
    if (index !== -1) {
      setCurrentStepIndex(index);
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const renderStepContent = () => {
    const stepId = steps[currentStepIndex].id;

    switch (stepId) {
      case 'company-info':
        return <CompanyInfoStep {...formData} onCodigoUnicoChange={(v) => setFormData({...formData, codigoUnico: v})} onPuntoServicioChange={(v) => setFormData({...formData, puntoServicio: v})} onRazonSocialChange={(v) => setFormData({...formData, razonSocial: v})} onRucChange={(v) => setFormData({...formData, ruc: v})} onGiroEmpresaChange={(v) => setFormData({...formData, giroEmpresa: v})} />;
      case 'service-config':
        return <ServiceConfigStep {...formData} onTipoServicioChange={(v) => setFormData({...formData, tipoServicio: v})} onNombreComercialChange={(v) => setFormData({...formData, nombreComercial: v})} onNumeroServicioChange={(v) => setFormData({...formData, numeroServicio: v})} onNombreServicioChange={(v) => setFormData({...formData, nombreServicio: v})} />;
      case 'general-characteristics':
        return <GeneralCharacteristicsStep {...formData} onEnvioArchivoChange={(v) => setFormData({...formData, envioArchivo: v})} onIndicadorCargaChange={(v) => setFormData({...formData, indicadorCarga: v})} onHorarioRecaudacionChange={(v) => setFormData({...formData, horarioRecaudacion: v})} />;
      case 'specific-characteristics':
        return <SpecificCharacteristicsStep {...formData} onMonedaSolesChange={(v) => setFormData({...formData, monedaSoles: v})} onMonedaDolaresChange={(v) => setFormData({...formData, monedaDolares: v})} onCanalAppBancaChange={(v) => setFormData({...formData, canalAppBanca: v})} onCanalAgenteLimaChange={(v) => setFormData({...formData, canalAgenteLima: v})} onCanalAgenteProvinciasChange={(v) => setFormData({...formData, canalAgenteProvincias: v})} onCanalAgenteSupermercadosChange={(v) => setFormData({...formData, canalAgenteSupermercados: v})} onCanalOtrosChange={(v) => setFormData({...formData, canalOtros: v})} onTipoAbonoChange={(v) => setFormData({...formData, tipoAbono: v})} />;
      case 'payment-types':
        return <PaymentTypesStep {...formData} onAceptaPagosVencidosChange={(v) => setFormData({...formData, aceptaPagosVencidos: v})} onObligaPagosSucesivosChange={(v) => setFormData({...formData, obligaPagosSucesivos: v})} onAceptaPagosParcialesChange={(v) => setFormData({...formData, aceptaPagosParciales: v})} />;
      case 'deudor-config':
        return <DeudorConfigStep {...formData} onCodigoIdentificadorDeudorChange={(v) => setFormData({...formData, codigoIdentificadorDeudor: v})} onNumeroCaracteresDeudorChange={(v) => setFormData({...formData, numeroCaracteresDeudor: v})} />;
      case 'commission-structure':
        return <CommissionStructureStep {...formData} onComisionAgenteEmpresaSolesChange={(v) => setFormData({...formData, comisionAgenteEmpresaSoles: v})} onComisionAgenteEmpresaDolaresChange={(v) => setFormData({...formData, comisionAgenteEmpresaDolares: v})} onComisionAgenteUsuarioLimaChange={(v) => setFormData({...formData, comisionAgenteUsuarioLima: v})} onComisionElectronicosEmpresaSolesChange={(v) => setFormData({...formData, comisionElectronicosEmpresaSoles: v})} onComisionElectronicosOtro1Change={(v) => setFormData({...formData, comisionElectronicosOtro1: v})} onComisionElectronicosOtro2Change={(v) => setFormData({...formData, comisionElectronicosOtro2: v})} />;
      case 'account-definitions':
        return <AccountDefinitionsStep {...formData} onCuentasCobranzasChange={(v) => setFormData({...formData, cuentasCobranzas: v})} onCuentasComisionesChange={(v) => setFormData({...formData, cuentasComisiones: v})} />;
      case 'contact-info':
        return <ContactInfoStep {...formData} onCorreosConsolidacionChange={(v) => setFormData({...formData, correosConsolidacion: v})} onCorreosConfirmacionChange={(v) => setFormData({...formData, correosConfirmacion: v})} onNombreContactoChange={(v) => setFormData({...formData, nombreContacto: v})} onCorreoContactoChange={(v) => setFormData({...formData, correoContacto: v})} onTelefonoContactoChange={(v) => setFormData({...formData, telefonoContacto: v})} />;
      case 'optional-data':
        return <OptionalDataStep {...formData} onTipoRecaudacionChange={(v) => setFormData({...formData, tipoRecaudacion: v})} onNumeroClientesChange={(v) => setFormData({...formData, numeroClientes: v})} onRecaudacionAnualSolesChange={(v) => setFormData({...formData, recaudacionAnualSoles: v})} onRecaudacionAnualDolaresChange={(v) => setFormData({...formData, recaudacionAnualDolares: v})} />;
      case 'review':
        return <RecaudacionReviewStep formData={formData} onEdit={handleEdit} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <ProgressIndicator currentStep={currentStepIndex + 1} totalSteps={steps.length} steps={steps} />
      
      <div className="min-h-[500px]">{renderStepContent()}</div>

      {Object.keys(validation.errors).length > 0 && (
        <div className="bg-destructive/10 p-4 rounded-lg">
          <p className="text-sm text-destructive font-semibold">Por favor corrija los siguientes errores:</p>
          <ul className="list-disc list-inside text-sm text-destructive mt-2">
            {Object.values(validation.errors).map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t">
        <Button onClick={handleBack} disabled={currentStepIndex === 0} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        
        {currentStepIndex === steps.length - 1 ? (
          <Button onClick={handleSubmit}>
            Generar Contrato
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

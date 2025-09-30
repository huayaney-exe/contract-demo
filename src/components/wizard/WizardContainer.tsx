import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { WizardFormData, WizardStepId } from '@/types/wizard';
import { CompanyData } from '@/pages/Index';
import { useWizardValidation } from '@/hooks/useWizardValidation';
import { mapWizardToCompanyData } from '@/utils/wizardDataMapper';
import { toast } from '@/hooks/use-toast';

// Import step components
import ProgressIndicator from './ProgressIndicator';
import CompanyIdentityStep from './CompanyIdentityStep';
import ContactInfoStep from './ContactInfoStep';
import ServiceSelectionStep from './ServiceSelectionStep';
import CurrencySelectionStep from './CurrencySelectionStep';
import AccountSelectionStep from './AccountSelectionStep';
import ControlsStep from './ControlsStep';
import AdditionalInfoStep from './AdditionalInfoStep';
import ReviewStep from './ReviewStep';

interface WizardContainerProps {
  onComplete: (data: CompanyData) => void;
}

const WizardContainer = ({ onComplete }: WizardContainerProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    validateCompanyIdentity,
    validateContactInfo,
    validateServices,
    validateCurrency,
    validateAccount,
    validateControls
  } = useWizardValidation();

  // Form data state
  const [formData, setFormData] = useState<WizardFormData>({
    companyName: '',
    ruc: '',
    contactName: '',
    contactPhone: '',
    contactEmail1: '',
    contactEmail2: '',
    services: {
      remuneraciones: false,
      proveedores: false,
      pagosVarios: false
    },
    serviceType: 'nuevo',
    currencies: {
      soles: false,
      dolares: false
    },
    controls: {},
    additional: {
      consolidateProviders: 'no',
      consolidateVarios: 'no',
      commissionDistribution: {}
    }
  });

  // Define wizard steps
  const allSteps = [
    {
      id: 'company-identity' as WizardStepId,
      title: 'Empresa',
      isComplete: false,
      isRequired: true,
      shouldShow: () => true
    },
    {
      id: 'contact-info' as WizardStepId,
      title: 'Contacto',
      isComplete: false,
      isRequired: true,
      shouldShow: () => true
    },
    {
      id: 'services' as WizardStepId,
      title: 'Servicios',
      isComplete: false,
      isRequired: true,
      shouldShow: () => true
    },
    {
      id: 'currency' as WizardStepId,
      title: 'Moneda',
      isComplete: false,
      isRequired: true,
      shouldShow: () => true
    },
    {
      id: 'account' as WizardStepId,
      title: 'Cuenta',
      isComplete: false,
      isRequired: true,
      shouldShow: () => true
    },
    {
      id: 'controls' as WizardStepId,
      title: 'Controles',
      isComplete: false,
      isRequired: true,
      shouldShow: () => true
    },
    {
      id: 'additional' as WizardStepId,
      title: 'Adicional',
      isComplete: false,
      isRequired: false,
      shouldShow: (data: Partial<WizardFormData>) =>
        Boolean(data.services?.proveedores || data.services?.pagosVarios)
    },
    {
      id: 'review' as WizardStepId,
      title: 'Revisar',
      isComplete: false,
      isRequired: true,
      shouldShow: () => true
    }
  ];

  // Filter steps based on shouldShow logic
  const visibleSteps = allSteps.filter((step) => step.shouldShow(formData));
  const currentStep = visibleSteps[currentStepIndex];

  // Validate current step
  const validateCurrentStep = useCallback((): boolean => {
    let validation;

    switch (currentStep.id) {
      case 'company-identity':
        validation = validateCompanyIdentity(formData);
        break;
      case 'contact-info':
        validation = validateContactInfo(formData);
        break;
      case 'services':
        validation = validateServices(formData);
        break;
      case 'currency':
        validation = validateCurrency(formData);
        break;
      case 'account':
        validation = validateAccount(formData);
        break;
      case 'controls':
        validation = validateControls(formData);
        break;
      default:
        return true;
    }

    if (!validation.canProceed) {
      toast({
        title: 'Información incompleta',
        description: Object.values(validation.errors)[0] || 'Por favor completa todos los campos requeridos',
        variant: 'destructive'
      });
    }

    return validation.canProceed;
  }, [currentStep.id, formData, validateCompanyIdentity, validateContactInfo, validateServices, validateCurrency, validateAccount, validateControls]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentStep.id === 'review') {
      // Final submission
      handleSubmit();
      return;
    }

    if (validateCurrentStep()) {
      setCurrentStepIndex((prev) => Math.min(prev + 1, visibleSteps.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep.id, validateCurrentStep, visibleSteps.length]);

  const handleBack = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStepClick = useCallback((stepIndex: number) => {
    // Only allow clicking on completed steps or current step
    if (stepIndex <= currentStepIndex) {
      setCurrentStepIndex(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  const handleEdit = useCallback((stepId: string) => {
    const stepIndex = visibleSteps.findIndex((s) => s.id === stepId);
    if (stepIndex !== -1) {
      setCurrentStepIndex(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [visibleSteps]);

  // Final submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Map wizard data to CompanyData format
      const companyData = mapWizardToCompanyData(formData);

      toast({
        title: 'Generando anexo',
        description: 'Procesando tu información...'
      });

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      onComplete(companyData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al generar el anexo. Por favor intenta nuevamente.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep.id) {
      case 'company-identity':
        return (
          <CompanyIdentityStep
            companyName={formData.companyName}
            ruc={formData.ruc}
            onCompanyNameChange={(value) =>
              setFormData((prev) => ({ ...prev, companyName: value }))
            }
            onRucChange={(value) => setFormData((prev) => ({ ...prev, ruc: value }))}
          />
        );

      case 'contact-info':
        return (
          <ContactInfoStep
            contactName={formData.contactName}
            contactPhone={formData.contactPhone}
            contactEmail1={formData.contactEmail1}
            contactEmail2={formData.contactEmail2}
            onContactNameChange={(value) =>
              setFormData((prev) => ({ ...prev, contactName: value }))
            }
            onContactPhoneChange={(value) =>
              setFormData((prev) => ({ ...prev, contactPhone: value }))
            }
            onContactEmail1Change={(value) =>
              setFormData((prev) => ({ ...prev, contactEmail1: value }))
            }
            onContactEmail2Change={(value) =>
              setFormData((prev) => ({ ...prev, contactEmail2: value }))
            }
          />
        );

      case 'services':
        return (
          <ServiceSelectionStep
            services={formData.services}
            serviceType={formData.serviceType}
            onServiceChange={(service, value) =>
              setFormData((prev) => ({
                ...prev,
                services: { ...prev.services, [service]: value }
              }))
            }
            onServiceTypeChange={(type) =>
              setFormData((prev) => ({ ...prev, serviceType: type }))
            }
          />
        );

      case 'currency':
        return (
          <CurrencySelectionStep
            currencies={formData.currencies}
            onCurrencyChange={(currency, value) =>
              setFormData((prev) => ({
                ...prev,
                currencies: { ...prev.currencies, [currency]: value }
              }))
            }
          />
        );

      case 'account':
        return (
          <AccountSelectionStep
            currencies={formData.currencies}
            accountSoles={formData.accountSoles}
            accountDolares={formData.accountDolares}
            onAccountChange={(currency, field, value) => {
              setFormData((prev) => ({
                ...prev,
                [`account${currency === 'soles' ? 'Soles' : 'Dolares'}`]: {
                  ...prev[`account${currency === 'soles' ? 'Soles' : 'Dolares'}`],
                  [field]: value
                }
              }));
            }}
          />
        );

      case 'controls':
        return (
          <ControlsStep
            services={formData.services}
            currencies={formData.currencies}
            controls={formData.controls}
            onControlChange={(service, currency, field, value) => {
              setFormData((prev) => ({
                ...prev,
                controls: {
                  ...prev.controls,
                  [service]: {
                    ...prev.controls[service as keyof typeof prev.controls],
                    [currency]: {
                      ...(prev.controls[service as keyof typeof prev.controls]?.[currency as 'soles' | 'dolares']),
                      [field]: value
                    }
                  }
                }
              }));
            }}
          />
        );

      case 'additional':
        return (
          <AdditionalInfoStep
            services={formData.services}
            additional={formData.additional || {}}
            onAdditionalChange={(field, value) => {
              setFormData((prev) => ({
                ...prev,
                additional: {
                  ...prev.additional,
                  ...(field.includes('empresa') || field.includes('proveedor')
                    ? {
                        commissionDistribution: {
                          ...prev.additional?.commissionDistribution,
                          [field]: value
                        }
                      }
                    : { [field]: value })
                }
              }));
            }}
          />
        );

      case 'review':
        return <ReviewStep formData={formData} onEdit={handleEdit} />;

      default:
        return null;
    }
  };

  const canProceed = currentStep.id !== 'review' || !isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-interbank-light to-white py-12">
      <div className="container-custom max-w-6xl mx-auto px-4">
        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStepIndex}
          totalSteps={visibleSteps.length}
          steps={visibleSteps.map((step, index) => ({
            ...step,
            isComplete: index < currentStepIndex
          }))}
          onStepClick={handleStepClick}
        />

        {/* Step Content */}
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center max-w-4xl mx-auto pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            size="lg"
            onClick={handleBack}
            disabled={currentStepIndex === 0 || isSubmitting}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-interbank-primary hover:bg-interbank-accent"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generando...
              </>
            ) : currentStep.id === 'review' ? (
              'Generar Anexo'
            ) : (
              <>
                Continuar
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WizardContainer;
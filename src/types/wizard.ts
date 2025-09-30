// Wizard step definitions and types
export type WizardStepId =
  | 'company-identity'
  | 'contact-info'
  | 'services'
  | 'currency'
  | 'account'
  | 'controls'
  | 'additional'
  | 'review';

export interface WizardStep {
  id: WizardStepId;
  title: string;
  description: string;
  isComplete: boolean;
  isRequired: boolean;
  shouldShow: (data: Partial<WizardFormData>) => boolean;
}

export interface WizardFormData {
  // Step 1: Company Identity
  companyName: string;
  ruc: string;

  // Step 2: Contact Info
  contactName: string;
  contactPhone: string;
  contactEmail1: string;
  contactEmail2?: string;

  // Step 3: Services
  services: {
    remuneraciones: boolean;
    proveedores: boolean;
    pagosVarios: boolean;
  };
  serviceType: 'nuevo' | 'modificacion' | null;

  // Step 4: Currency
  currencies: {
    soles: boolean;
    dolares: boolean;
  };

  // Step 5: Account
  accountSoles?: {
    type: 'ahorro' | 'corriente';
    number: string;
  };
  accountDolares?: {
    type: 'ahorro' | 'corriente';
    number: string;
  };

  // Step 6: Controls (per service and currency)
  controls: {
    remuneraciones?: {
      soles?: {
        maxBatch: string;
        maxPayment: string;
      };
      dolares?: {
        maxBatch: string;
        maxPayment: string;
      };
    };
    proveedores?: {
      soles?: {
        maxBatch: string;
        maxPayment: string;
      };
      dolares?: {
        maxBatch: string;
        maxPayment: string;
      };
    };
    pagosVarios?: {
      soles?: {
        maxBatch: string;
        maxPayment: string;
      };
      dolares?: {
        maxBatch: string;
        maxPayment: string;
      };
    };
  };

  // Step 7: Additional Info (conditional)
  additional?: {
    maxDaysProviders?: string;
    maxDaysVarios?: string;
    consolidateProviders?: 'si' | 'no';
    consolidateVarios?: 'si' | 'no';
    commissionDistribution?: {
      empresaSoles?: string;
      empresaDolares?: string;
      proveedorSoles?: string;
      proveedorDolares?: string;
    };
  };
}

export interface FieldValidation {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}

export interface StepValidation {
  isValid: boolean;
  errors: Record<string, string>;
  canProceed: boolean;
}

import { useState, useCallback } from 'react';
import { WizardFormData, FieldValidation, StepValidation } from '@/types/wizard';

export const useWizardValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Real-time field validation
  const validateRUC = useCallback((value: string): FieldValidation => {
    if (!value.trim()) {
      return { isValid: false, error: 'RUC/DNI es requerido' };
    }

    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length === 8) {
      return {
        isValid: true,
        suggestion: 'DNI válido ✓'
      };
    }

    if (numericValue.length === 11) {
      return {
        isValid: true,
        suggestion: 'RUC válido ✓'
      };
    }

    if (numericValue.length < 8) {
      return {
        isValid: false,
        error: `Faltan ${8 - numericValue.length} dígitos para DNI`
      };
    }

    if (numericValue.length > 8 && numericValue.length < 11) {
      return {
        isValid: false,
        error: `Faltan ${11 - numericValue.length} dígitos para RUC`
      };
    }

    return {
      isValid: false,
      error: 'RUC debe tener 11 dígitos o DNI 8 dígitos'
    };
  }, []);

  const validateEmail = useCallback((value: string): FieldValidation => {
    if (!value.trim()) {
      return { isValid: false, error: 'Email es requerido' };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      return { isValid: false, error: 'Email no válido' };
    }

    return { isValid: true, suggestion: 'Email válido ✓' };
  }, []);

  const validatePhone = useCallback((value: string): FieldValidation => {
    if (!value.trim()) {
      return { isValid: false, error: 'Teléfono es requerido' };
    }

    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length < 7) {
      return {
        isValid: false,
        error: 'Teléfono debe tener al menos 7 dígitos'
      };
    }

    return { isValid: true, suggestion: 'Teléfono válido ✓' };
  }, []);

  const validateAmounts = useCallback((
    batch: string,
    payment: string
  ): FieldValidation => {
    if (!batch || !payment) {
      return {
        isValid: false,
        error: 'Ambos montos son requeridos'
      };
    }

    const batchNum = parseFloat(batch);
    const paymentNum = parseFloat(payment);

    if (isNaN(batchNum) || isNaN(paymentNum)) {
      return {
        isValid: false,
        error: 'Los montos deben ser números válidos'
      };
    }

    if (batchNum <= 0 || paymentNum <= 0) {
      return {
        isValid: false,
        error: 'Los montos deben ser mayores a 0'
      };
    }

    if (paymentNum >= batchNum) {
      return {
        isValid: false,
        error: 'El monto por pago debe ser menor al monto por lote'
      };
    }

    return {
      isValid: true,
      suggestion: '✓ Montos válidos'
    };
  }, []);

  const validateMaxDays = useCallback((value: string): FieldValidation => {
    if (!value) {
      return {
        isValid: true,
        suggestion: 'Se usará el máximo (120 días)'
      };
    }

    const days = parseInt(value);

    if (isNaN(days)) {
      return {
        isValid: false,
        error: 'Debe ser un número'
      };
    }

    if (days < 1 || days > 120) {
      return {
        isValid: false,
        error: 'Debe estar entre 1 y 120 días'
      };
    }

    return { isValid: true, suggestion: `${days} días ✓` };
  }, []);

  // Step-level validation
  const validateCompanyIdentity = useCallback((data: Partial<WizardFormData>): StepValidation => {
    const stepErrors: Record<string, string> = {};

    if (!data.companyName?.trim()) {
      stepErrors.companyName = 'Razón Social es requerida';
    }

    const rucValidation = validateRUC(data.ruc || '');
    if (!rucValidation.isValid) {
      stepErrors.ruc = rucValidation.error || 'RUC/DNI inválido';
    }

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors,
      canProceed: Object.keys(stepErrors).length === 0
    };
  }, [validateRUC]);

  const validateContactInfo = useCallback((data: Partial<WizardFormData>): StepValidation => {
    const stepErrors: Record<string, string> = {};

    if (!data.contactName?.trim()) {
      stepErrors.contactName = 'Nombre de contacto es requerido';
    }

    const phoneValidation = validatePhone(data.contactPhone || '');
    if (!phoneValidation.isValid) {
      stepErrors.contactPhone = phoneValidation.error || 'Teléfono inválido';
    }

    const emailValidation = validateEmail(data.contactEmail1 || '');
    if (!emailValidation.isValid) {
      stepErrors.contactEmail1 = emailValidation.error || 'Email inválido';
    }

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors,
      canProceed: Object.keys(stepErrors).length === 0
    };
  }, [validatePhone, validateEmail]);

  const validateServices = useCallback((data: Partial<WizardFormData>): StepValidation => {
    const stepErrors: Record<string, string> = {};

    const hasService =
      data.services?.remuneraciones ||
      data.services?.proveedores ||
      data.services?.pagosVarios;

    if (!hasService) {
      stepErrors.services = 'Debe seleccionar al menos un servicio';
    }

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors,
      canProceed: Object.keys(stepErrors).length === 0
    };
  }, []);

  const validateCurrency = useCallback((data: Partial<WizardFormData>): StepValidation => {
    const stepErrors: Record<string, string> = {};

    const hasCurrency = data.currencies?.soles || data.currencies?.dolares;

    if (!hasCurrency) {
      stepErrors.currency = 'Debe seleccionar al menos una moneda';
    }

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors,
      canProceed: Object.keys(stepErrors).length === 0
    };
  }, []);

  const validateAccount = useCallback((data: Partial<WizardFormData>): StepValidation => {
    const stepErrors: Record<string, string> = {};

    if (data.currencies?.soles) {
      if (!data.accountSoles?.type) {
        stepErrors.accountSolesType = 'Seleccione tipo de cuenta en Soles';
      }
      if (!data.accountSoles?.number?.trim()) {
        stepErrors.accountSolesNumber = 'Ingrese número de cuenta en Soles';
      }
    }

    if (data.currencies?.dolares) {
      if (!data.accountDolares?.type) {
        stepErrors.accountDolaresType = 'Seleccione tipo de cuenta en Dólares';
      }
      if (!data.accountDolares?.number?.trim()) {
        stepErrors.accountDolaresNumber = 'Ingrese número de cuenta en Dólares';
      }
    }

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors,
      canProceed: Object.keys(stepErrors).length === 0
    };
  }, []);

  const validateControls = useCallback((data: Partial<WizardFormData>): StepValidation => {
    const stepErrors: Record<string, string> = {};

    // Validate controls for each selected service and currency
    const services = ['remuneraciones', 'proveedores', 'pagosVarios'] as const;
    const currencies = ['soles', 'dolares'] as const;

    services.forEach(service => {
      if (data.services?.[service]) {
        currencies.forEach(currency => {
          if (data.currencies?.[currency]) {
            const controls = data.controls?.[service]?.[currency];

            if (!controls?.maxBatch || !controls?.maxPayment) {
              stepErrors[`${service}_${currency}`] =
                `Complete los controles para ${service} en ${currency === 'soles' ? 'Soles' : 'Dólares'}`;
            } else {
              const validation = validateAmounts(controls.maxBatch, controls.maxPayment);
              if (!validation.isValid) {
                stepErrors[`${service}_${currency}_amounts`] = validation.error || 'Montos inválidos';
              }
            }
          }
        });
      }
    });

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors,
      canProceed: Object.keys(stepErrors).length === 0
    };
  }, [validateAmounts]);

  const validateAdditional = useCallback((data: Partial<WizardFormData>): StepValidation => {
    const stepErrors: Record<string, string> = {};

    if (data.services?.proveedores && data.additional?.maxDaysProviders) {
      const validation = validateMaxDays(data.additional.maxDaysProviders);
      if (!validation.isValid) {
        stepErrors.maxDaysProviders = validation.error || 'Días inválidos';
      }
    }

    if (data.services?.pagosVarios && data.additional?.maxDaysVarios) {
      const validation = validateMaxDays(data.additional.maxDaysVarios);
      if (!validation.isValid) {
        stepErrors.maxDaysVarios = validation.error || 'Días inválidos';
      }
    }

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors,
      canProceed: true // Additional info can have warnings but not block
    };
  }, [validateMaxDays]);

  return {
    errors,
    setErrors,
    validateRUC,
    validateEmail,
    validatePhone,
    validateAmounts,
    validateMaxDays,
    validateCompanyIdentity,
    validateContactInfo,
    validateServices,
    validateCurrency,
    validateAccount,
    validateControls,
    validateAdditional
  };
};
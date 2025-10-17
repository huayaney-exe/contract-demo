import { useState } from 'react';
import { RecaudacionFormData } from '@/types/recaudacion';

export interface FieldValidation {
  isValid: boolean;
  error: string;
  suggestion: string;
}

export interface StepValidation {
  isValid: boolean;
  errors: Record<string, string>;
  canProceed: boolean;
}

export const useRecaudacionValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Field-level validations
  const validateRUC = (value: string): FieldValidation => {
    const cleaned = value.replace(/\D/g, '');
    
    if (!cleaned) {
      return { isValid: false, error: 'RUC es requerido', suggestion: 'Ingrese un RUC válido de 11 dígitos' };
    }
    
    if (cleaned.length !== 11 && cleaned.length !== 8) {
      return { 
        isValid: false, 
        error: 'RUC debe tener 11 dígitos o DNI 8 dígitos', 
        suggestion: 'Verifique el número ingresado' 
      };
    }
    
    return { isValid: true, error: '', suggestion: '' };
  };

  const validateMaxLength = (value: string, maxLength: number, fieldName: string): FieldValidation => {
    if (!value || value.trim() === '') {
      return { 
        isValid: false, 
        error: `${fieldName} es requerido`, 
        suggestion: `Ingrese el ${fieldName.toLowerCase()}` 
      };
    }
    
    if (value.length > maxLength) {
      return { 
        isValid: false, 
        error: `Máximo ${maxLength} caracteres`, 
        suggestion: `Reduzca el texto a ${maxLength} caracteres` 
      };
    }
    
    return { isValid: true, error: '', suggestion: '' };
  };

  const validateEmail = (value: string): FieldValidation => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value) {
      return { isValid: false, error: 'Correo es requerido', suggestion: 'Ingrese un correo válido' };
    }
    
    if (!emailRegex.test(value)) {
      return { 
        isValid: false, 
        error: 'Formato de correo inválido', 
        suggestion: 'Use formato: ejemplo@dominio.com' 
      };
    }
    
    return { isValid: true, error: '', suggestion: '' };
  };

  const validatePhone = (value: string): FieldValidation => {
    const cleaned = value.replace(/\D/g, '');
    
    if (!cleaned) {
      return { isValid: false, error: 'Teléfono es requerido', suggestion: 'Ingrese un teléfono válido' };
    }
    
    if (cleaned.length < 7 || cleaned.length > 15) {
      return { 
        isValid: false, 
        error: 'Teléfono debe tener entre 7 y 15 dígitos', 
        suggestion: 'Verifique el número' 
      };
    }
    
    return { isValid: true, error: '', suggestion: '' };
  };

  const validateAccountPercentages = (accounts: Array<{ porcentaje: string }>): FieldValidation => {
    if (!accounts || accounts.length === 0) {
      return { 
        isValid: false, 
        error: 'Debe agregar al menos una cuenta', 
        suggestion: 'Agregue una cuenta' 
      };
    }

    const total = accounts.reduce((sum, acc) => {
      const percent = parseFloat(acc.porcentaje) || 0;
      return sum + percent;
    }, 0);

    if (Math.abs(total - 100) > 0.01) {
      return { 
        isValid: false, 
        error: `Los porcentajes deben sumar 100% (actual: ${total.toFixed(2)}%)`, 
        suggestion: 'Ajuste los porcentajes' 
      };
    }

    return { isValid: true, error: '', suggestion: '' };
  };

  // Step-level validations
  const validateCompanyInfo = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    if (!data.codigoUnico?.trim()) errors.codigoUnico = 'Código único es requerido';
    if (!data.puntoServicio?.trim()) errors.puntoServicio = 'Punto de servicio es requerido';
    if (!data.razonSocial?.trim()) errors.razonSocial = 'Razón social es requerida';
    if (!data.giroEmpresa?.trim()) errors.giroEmpresa = 'Giro de empresa es requerido';

    const rucValidation = validateRUC(data.ruc || '');
    if (!rucValidation.isValid) errors.ruc = rucValidation.error;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validateServiceConfig = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    if (!data.tipoServicio) errors.tipoServicio = 'Tipo de servicio es requerido';

    const nombreComercialValidation = validateMaxLength(data.nombreComercial || '', 13, 'Nombre comercial');
    if (!nombreComercialValidation.isValid) errors.nombreComercial = nombreComercialValidation.error;

    if (!data.numeroServicio?.trim()) errors.numeroServicio = 'Número de servicio es requerido';

    const nombreServicioValidation = validateMaxLength(data.nombreServicio || '', 13, 'Nombre de servicio');
    if (!nombreServicioValidation.isValid) errors.nombreServicio = nombreServicioValidation.error;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validateGeneralCharacteristics = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    if (!data.envioArchivo) errors.envioArchivo = 'Método de envío es requerido';
    if (!data.indicadorCarga) errors.indicadorCarga = 'Indicador de carga es requerido';
    if (!data.horarioRecaudacion?.trim()) errors.horarioRecaudacion = 'Horario de recaudación es requerido';

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validateSpecificCharacteristics = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    if (!data.monedaSoles && !data.monedaDolares) {
      errors.moneda = 'Debe seleccionar al menos una moneda';
    }

    const hasAnyCanal = data.canalAppBanca || data.canalAgenteLima || 
                        data.canalAgenteProvincias || data.canalAgenteSupermercados || 
                        (data.canalOtros && data.canalOtros.trim() !== '');
    
    if (!hasAnyCanal) {
      errors.canal = 'Debe seleccionar al menos un canal de cobro';
    }

    if (!data.tipoAbono) errors.tipoAbono = 'Tipo de abono es requerido';

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validatePaymentTypes = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    // Business rule: If pagos sucesivos is true, parciales must be false
    if (data.obligaPagosSucesivos && data.aceptaPagosParciales) {
      errors.paymentLogic = 'No se puede obligar pagos sucesivos y aceptar pagos parciales simultáneamente';
    }

    // Business rule: If vencidos is false, sucesivos must be true
    if (!data.aceptaPagosVencidos && !data.obligaPagosSucesivos) {
      errors.paymentLogic2 = 'Si no acepta pagos vencidos, debe obligar pagos sucesivos';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validateDeudorConfig = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    const codigoValidation = validateMaxLength(data.codigoIdentificadorDeudor || '', 13, 'Código identificador');
    if (!codigoValidation.isValid) errors.codigoIdentificadorDeudor = codigoValidation.error;

    const numCaracteresValidation = validateMaxLength(data.numeroCaracteresDeudor || '', 14, 'Número de caracteres');
    if (!numCaracteresValidation.isValid) errors.numeroCaracteresDeudor = numCaracteresValidation.error;

    // Validate no special characters in codigo
    if (data.codigoIdentificadorDeudor && /[\/,]/.test(data.codigoIdentificadorDeudor)) {
      errors.codigoIdentificadorDeudor = 'No debe contener caracteres "/" o ","';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validateCommissionStructure = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    // At least one commission field should be filled
    const hasAnyCommission = 
      data.comisionAgenteEmpresaSoles?.trim() ||
      data.comisionAgenteEmpresaDolares?.trim() ||
      data.comisionAgenteUsuarioLima?.trim() ||
      data.comisionElectronicosEmpresaSoles?.trim();

    if (!hasAnyCommission) {
      errors.comisiones = 'Debe ingresar al menos una comisión';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validateAccountDefinitions = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    // Validate cobranzas accounts
    const cobranzasValidation = validateAccountPercentages(data.cuentasCobranzas || []);
    if (!cobranzasValidation.isValid) errors.cuentasCobranzas = cobranzasValidation.error;

    // Validate each account has all required fields
    data.cuentasCobranzas?.forEach((cuenta, index) => {
      if (!cuenta.numeroCuenta?.trim()) {
        errors[`cuentaCobranza${index}`] = `Cuenta ${index + 1}: Número de cuenta requerido`;
      }
      if (!cuenta.porcentaje || parseFloat(cuenta.porcentaje) <= 0) {
        errors[`porcentajeCobranza${index}`] = `Cuenta ${index + 1}: Porcentaje inválido`;
      }
    });

    // Validate comisiones accounts
    const comisionesValidation = validateAccountPercentages(data.cuentasComisiones || []);
    if (!comisionesValidation.isValid) errors.cuentasComisiones = comisionesValidation.error;

    data.cuentasComisiones?.forEach((cuenta, index) => {
      if (!cuenta.numeroCuenta?.trim()) {
        errors[`cuentaComision${index}`] = `Cuenta ${index + 1}: Número de cuenta requerido`;
      }
      if (!cuenta.porcentaje || parseFloat(cuenta.porcentaje) <= 0) {
        errors[`porcentajeComision${index}`] = `Cuenta ${index + 1}: Porcentaje inválido`;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validateContactInfo = (data: Partial<RecaudacionFormData>): StepValidation => {
    const errors: Record<string, string> = {};

    if (!data.correosConsolidacion || data.correosConsolidacion.length === 0) {
      errors.correosConsolidacion = 'Debe agregar al menos un correo para consolidación';
    }

    if (!data.correosConfirmacion || data.correosConfirmacion.length === 0) {
      errors.correosConfirmacion = 'Debe agregar al menos un correo para confirmación';
    }

    if (!data.nombreContacto?.trim()) errors.nombreContacto = 'Nombre de contacto es requerido';

    const emailValidation = validateEmail(data.correoContacto || '');
    if (!emailValidation.isValid) errors.correoContacto = emailValidation.error;

    const phoneValidation = validatePhone(data.telefonoContacto || '');
    if (!phoneValidation.isValid) errors.telefonoContacto = phoneValidation.error;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      canProceed: Object.keys(errors).length === 0
    };
  };

  const validateOptionalData = (data: Partial<RecaudacionFormData>): StepValidation => {
    // This step is optional, so always valid
    return {
      isValid: true,
      errors: {},
      canProceed: true
    };
  };

  return {
    errors,
    setErrors,
    validateRUC,
    validateMaxLength,
    validateEmail,
    validatePhone,
    validateAccountPercentages,
    validateCompanyInfo,
    validateServiceConfig,
    validateGeneralCharacteristics,
    validateSpecificCharacteristics,
    validatePaymentTypes,
    validateDeudorConfig,
    validateCommissionStructure,
    validateAccountDefinitions,
    validateContactInfo,
    validateOptionalData
  };
};

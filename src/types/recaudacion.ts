// Recaudación wizard step definitions and types
export type RecaudacionStepId =
  | 'company-info'
  | 'service-config'
  | 'general-characteristics'
  | 'service-specifics'
  | 'payment-types'
  | 'commission-structure'
  | 'account-definition'
  | 'contact-emails'
  | 'optional-data'
  | 'review';

export interface RecaudacionStep {
  id: RecaudacionStepId;
  title: string;
  description: string;
  isComplete: boolean;
  isRequired: boolean;
}

export interface RecaudacionFormData {
  // Step 1: Company Information
  codigoUnico: string;
  puntoServicio: string;
  razonSocial: string;
  ruc: string;
  giroEmpresa: string;
  
  // Step 2: Service Configuration
  tipoServicio: 'nuevo' | 'modificacion';
  nombreComercial: string; // max 13 chars
  numeroServicio: string;
  nombreServicio: string; // max 13 chars
  
  // Step 3: General Characteristics
  envioArchivo: 'sftp' | 'correo';
  indicadorCarga: '9pm' | '24horas';
  horarioRecaudacion: string;
  
  // Step 4: Specific Characteristics
  monedaSoles: boolean;
  monedaDolares: boolean;
  canalAppBanca: boolean;
  canalAgenteLima: boolean;
  canalAgenteProvincias: boolean;
  canalAgenteSupermercados: boolean;
  canalOtros: string;
  tipoAbono: 'lineaDetallado' | 'lineaConsolidado' | 'finalDiaConsolidado';
  
  // Step 5: Payment Types
  aceptaPagosVencidos: boolean;
  obligaPagosSucesivos: boolean;
  aceptaPagosParciales: boolean;
  
  // Step 6: Deudor Configuration
  codigoIdentificadorDeudor: string; // max 13 chars
  numeroCaracteresDeudor: string; // max 14 chars
  
  // Step 7: Commission Structure
  comisionAgenteEmpresaSoles: string;
  comisionAgenteEmpresaDolares: string;
  comisionAgenteUsuarioLima: string;
  comisionElectronicosEmpresaSoles: string;
  comisionElectronicosOtro1: string;
  comisionElectronicosOtro2: string;
  
  // Step 8: Account Definitions - Cobranzas
  cuentasCobranzas: Array<{
    porcentaje: string;
    tipoCuenta: 'corriente' | 'ahorros';
    moneda: 'soles' | 'dolares';
    numeroCuenta: string;
  }>;
  
  // Step 8: Account Definitions - Comisiones
  cuentasComisiones: Array<{
    porcentaje: string;
    tipoCuenta: 'corriente' | 'ahorros';
    moneda: 'soles' | 'dolares';
    numeroCuenta: string;
  }>;
  
  // Step 9: Email & Contact Information
  correosConsolidacion: string[];
  correosConfirmacion: string[];
  nombreContacto: string;
  correoContacto: string;
  telefonoContacto: string;
  
  // Step 10: Optional Collection Data
  tipoRecaudacion: 'exclusiva' | 'compartida' | '';
  numeroClientes: string;
  recaudacionAnualSoles: string;
  recaudacionAnualDolares: string;
}

export interface RecaudacionFieldValidation {
  isValid: boolean;
  error: string;
  suggestion: string;
}

export interface RecaudacionStepValidation {
  isValid: boolean;
  errors: Record<string, string>;
  canProceed: boolean;
}

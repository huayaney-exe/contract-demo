import { WizardFormData } from '@/types/wizard';
import { CompanyData } from '@/pages/Index';

/**
 * Maps WizardFormData to CompanyData for PDF generation
 * Maintains compatibility with existing ContractPreview and PDF generation
 */
export const mapWizardToCompanyData = (wizard: WizardFormData): CompanyData => {
  // Determine primary account details
  let accountType = '';
  let currency = '';
  let accountNumber = '';

  if (wizard.currencies.soles && wizard.accountSoles) {
    currency = 'soles';
    accountType = wizard.accountSoles.type;
    accountNumber = wizard.accountSoles.number;
  } else if (wizard.currencies.dolares && wizard.accountDolares) {
    currency = 'dolares';
    accountType = wizard.accountDolares.type;
    accountNumber = wizard.accountDolares.number;
  }

  // Build service type string
  let serviceType = '';
  if (wizard.services.remuneraciones) serviceType += 'remuneraciones ';
  if (wizard.services.proveedores) serviceType += 'proveedores ';
  if (wizard.services.pagosVarios) serviceType += 'pagosVarios ';

  return {
    // Basic company info
    companyName: wizard.companyName,
    ruc: wizard.ruc,
    legalRepresentative: wizard.contactName, // Use contact name as legal representative
    dni: '', // Not collected in new wizard
    address: '', // Not collected in new wizard
    district: '', // Not collected in new wizard
    province: '', // Not collected in new wizard
    department: '', // Not collected in new wizard
    phone: wizard.contactPhone,
    email: wizard.contactEmail1,
    businessActivity: '', // Not collected in new wizard

    // Contact fields
    contactName: wizard.contactName,
    contactPhone: wizard.contactPhone,
    contactEmail1: wizard.contactEmail1,
    contactEmail2: wizard.contactEmail2 || '',

    // Service fields
    serviceType: serviceType.trim(),
    isRemuneraciones: wizard.services.remuneraciones,
    isProveedores: wizard.services.proveedores,
    isPagosVarios: wizard.services.pagosVarios,
    isNuevo: wizard.serviceType === 'nuevo',
    isModificacion: wizard.serviceType === 'modificacion',

    // Account fields
    accountType,
    currency,
    accountNumber,

    // Remuneraciones controls
    maxAmountPerBatchSoles: wizard.controls.remuneraciones?.soles?.maxBatch || '',
    maxAmountPerBatchDollars: wizard.controls.remuneraciones?.dolares?.maxBatch || '',
    maxAmountPerPaymentSoles: wizard.controls.remuneraciones?.soles?.maxPayment || '',
    maxAmountPerPaymentDollars: wizard.controls.remuneraciones?.dolares?.maxPayment || '',

    // Proveedores controls
    maxAmountPerBatchProveedoresSoles: wizard.controls.proveedores?.soles?.maxBatch || '',
    maxAmountPerBatchProveedoresDollars: wizard.controls.proveedores?.dolares?.maxBatch || '',
    maxAmountPerPaymentProveedoresSoles: wizard.controls.proveedores?.soles?.maxPayment || '',
    maxAmountPerPaymentProveedoresDollars: wizard.controls.proveedores?.dolares?.maxPayment || '',

    // Pagos Varios controls
    maxAmountPerBatchVariosSoles: wizard.controls.pagosVarios?.soles?.maxBatch || '',
    maxAmountPerBatchVariosDollars: wizard.controls.pagosVarios?.dolares?.maxBatch || '',
    maxAmountPerPaymentVariosSoles: wizard.controls.pagosVarios?.soles?.maxPayment || '',
    maxAmountPerPaymentVariosDollars: wizard.controls.pagosVarios?.dolares?.maxPayment || '',

    // Additional information
    maxDaysProviders: wizard.additional?.maxDaysProviders || '',
    maxDaysPayments: wizard.additional?.maxDaysVarios || '',
    consolidateInvoicesProviders: wizard.additional?.consolidateProviders || '',
    consolidateInvoicesPayments: wizard.additional?.consolidateVarios || '',

    // Commission distribution
    commissionDistributionCompanySoles: wizard.additional?.commissionDistribution?.empresaSoles || '',
    commissionDistributionCompanyDollars: wizard.additional?.commissionDistribution?.empresaDolares || '',
    commissionDistributionProviderSoles: wizard.additional?.commissionDistribution?.proveedorSoles || '',
    commissionDistributionProviderDollars: wizard.additional?.commissionDistribution?.proveedorDolares || '',

    // Bank information (empty for client form, will be filled by bank)
    uniqueCode: '',
    receivingStore: '',
    companyInfo: ''
  };
};
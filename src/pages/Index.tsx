
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import CompanyForm from "@/components/CompanyForm";
import ContractPreview from "@/components/ContractPreview";

export interface CompanyData {
  companyName: string;
  ruc: string;
  legalRepresentative: string;
  dni: string;
  address: string;
  district: string;
  province: string;
  department: string;
  phone: string;
  email: string;
  businessActivity: string;
  
  // Contact person fields
  contactName?: string;
  contactPhone?: string;
  contactEmail1?: string;
  contactEmail2?: string;
  
  // Service fields
  serviceType?: string;
  isRemuneraciones?: boolean;
  isProveedores?: boolean;
  isPagosVarios?: boolean;
  isNuevo?: boolean;
  isModificacion?: boolean;
  
  // Account fields
  accountType?: string;
  currency?: string;
  accountNumber?: string;
  
  // Remuneraciones controls
  maxAmountPerBatchSoles?: string;
  maxAmountPerBatchDollars?: string;
  maxAmountPerPaymentSoles?: string;
  maxAmountPerPaymentDollars?: string;
  
  // Proveedores controls
  maxAmountPerBatchProveedoresSoles?: string;
  maxAmountPerBatchProveedoresDollars?: string;
  maxAmountPerPaymentProveedoresSoles?: string;
  maxAmountPerPaymentProveedoresDollars?: string;
  
  // Pagos Varios controls
  maxAmountPerBatchVariosSoles?: string;
  maxAmountPerBatchVariosDollars?: string;
  maxAmountPerPaymentVariosSoles?: string;
  maxAmountPerPaymentVariosDollars?: string;
  
  // Additional information
  maxDaysProviders?: string;
  maxDaysPayments?: string;
  consolidateInvoicesProviders?: string;
  consolidateInvoicesPayments?: string;
  
  // Commission distribution
  commissionDistributionCompanySoles?: string;
  commissionDistributionCompanyDollars?: string;
  commissionDistributionProviderSoles?: string;
  commissionDistributionProviderDollars?: string;
  
  // Bank information
  uniqueCode?: string;
  receivingStore?: string;
  companyInfo?: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'contract'>('form');
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  const handleFormSubmit = (data: CompanyData) => {
    setCompanyData(data);
    setCurrentStep('contract');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const progress = currentStep === 'form' ? 50 : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-interbank-light to-white">
      <div className="container-custom section">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="gradient-text mb-6 animate-slide-in">
              Anexo Pagos Masivos
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in">
              Si desea afiliarse a los servicios de Pago de Remuneraciones y CTS, Pago a Proveedores y/o Pagos Varios, por favor complete este anexo.
            </p>
          </div>

          {/* Progress Indicator */}
          <Card className="p-8 mb-10 card-hover bg-white/80 backdrop-blur-sm border-interbank-primary/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  currentStep === 'form' 
                    ? 'bg-interbank-primary text-white shadow-lg' 
                    : 'bg-interbank-button-green text-white shadow-lg'
                }`}>
                  {currentStep === 'contract' ? <CheckCircle className="w-6 h-6" /> : '1'}
                </div>
                <div>
                  <span className="font-semibold text-lg">Información del Cliente</span>
                  <p className="text-sm text-muted-foreground">Complete los datos de su empresa</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  currentStep === 'contract' 
                    ? 'bg-interbank-primary text-white shadow-lg' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <div>
                  <span className={`font-semibold text-lg transition-colors duration-300 ${
                    currentStep === 'contract' ? 'text-interbank-primary' : 'text-muted-foreground'
                  }`}>
                    Vista Previa del Anexo
                  </span>
                  <p className="text-sm text-muted-foreground">Revise y confirme la información</p>
                </div>
              </div>
            </div>
            <Progress value={progress} className="w-full h-3 bg-interbank-light" />
          </Card>

          {/* Content */}
          <div className="animate-slide-in">
            {currentStep === 'form' && (
              <CompanyForm onSubmit={handleFormSubmit} />
            )}

            {currentStep === 'contract' && companyData && (
              <ContractPreview 
                companyData={companyData} 
                onBack={handleBackToForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

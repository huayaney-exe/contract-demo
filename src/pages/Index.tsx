
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Generador de Contratos Empresariales
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete sus datos empresariales y genere su contrato automáticamente
            </p>
          </div>

          {/* Progress Indicator */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === 'form' ? 'bg-primary text-primary-foreground' : 'bg-green-500 text-white'
                }`}>
                  {currentStep === 'contract' ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <span className="font-medium">Datos Empresariales</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === 'contract' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <span className={`font-medium ${
                  currentStep === 'contract' ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  Vista Previa del Contrato
                </span>
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </Card>

          {/* Content */}
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
  );
};

export default Index;

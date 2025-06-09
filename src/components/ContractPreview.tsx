
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { CompanyData } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";
import { generateContractPDF } from "@/utils/pdfGenerator";

// Import refactored components
import ContractHeader from "@/components/contract/ContractHeader";
import BasicCompanyInfo from "@/components/contract/BasicCompanyInfo";
import ContactInfo from "@/components/contract/ContactInfo";
import ServiceSelection from "@/components/contract/ServiceSelection";
import AccountInfo from "@/components/contract/AccountInfo";
import OptionalControls from "@/components/contract/OptionalControls";
import AdditionalInfo from "@/components/contract/AdditionalInfo";
import SignatureSection from "@/components/contract/SignatureSection";

interface ContractPreviewProps {
  companyData: CompanyData;
  onBack: () => void;
}

const ContractPreview = ({ companyData, onBack }: ContractPreviewProps) => {
  const currentDate = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownloadPDF = () => {
    toast({
      title: "Generando PDF",
      description: "El anexo se está generando en formato PDF...",
    });

    try {
      generateContractPDF(companyData);
      
      toast({
        title: "PDF generado exitosamente",
        description: "El anexo ha sido descargado en formato PDF.",
      });
    } catch (error) {
      console.error('Error generando PDF:', error);
      toast({
        title: "Error al generar PDF",
        description: "Hubo un problema al generar el archivo PDF. Por favor, intente nuevamente.",
        variant: "destructive"
      });
    }
  };

  const handlePrint = () => {
    toast({
      title: "Preparando impresión",
      description: "El anexo se está preparando para imprimir...",
    });
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Anexo Pagos Masivos - ${companyData.companyName}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                line-height: 1.4; 
                margin: 20px; 
                font-size: 11px;
              }
              .header { text-align: center; margin-bottom: 20px; }
              .field-row { display: flex; align-items: center; margin: 8px 0; }
              .field-label { margin-right: 10px; font-weight: normal; }
              .field-box { 
                border: 2px solid #000; 
                min-height: 20px; 
                padding: 3px 5px; 
                background: white;
                flex-grow: 1;
                max-width: 400px;
              }
              .field-box-small { 
                border: 2px solid #000; 
                min-height: 20px; 
                padding: 3px 5px; 
                background: white;
                width: 150px;
                margin-right: 20px;
              }
              .section-title { 
                font-weight: bold; 
                margin: 15px 0 10px 0; 
                font-size: 12px;
              }
              .checkbox-section { margin: 10px 0; }
              .checkbox { 
                border: 2px solid #000; 
                width: 15px; 
                height: 15px; 
                display: inline-block; 
                margin-right: 5px; 
                text-align: center;
                vertical-align: middle;
              }
              .note { font-size: 9px; margin: 5px 0; }
              .signature-section { 
                margin-top: 40px; 
                display: flex; 
                justify-content: space-between; 
              }
              .signature-box { 
                text-align: center; 
                width: 45%; 
              }
              .signature-line { 
                border-bottom: 2px solid #000; 
                height: 40px; 
                margin-bottom: 5px; 
              }
              table { width: 100%; border-collapse: collapse; margin: 10px 0; }
              th, td { border: 2px solid #000; padding: 5px; text-align: center; }
              .text-left { text-align: left; }
              @media print { 
                body { margin: 15px; } 
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${document.getElementById('contract-content')?.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Formulario
        </Button>
        <div className="flex gap-3">
          <Button onClick={handleDownloadPDF} size="lg" className="bg-interbank-button-green hover:bg-interbank-accent">
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
          <Button onClick={handlePrint} size="lg" variant="outline" className="border-interbank-primary text-interbank-primary hover:bg-interbank-light">
            <Printer className="w-4 h-4 mr-2" />
            Imprimir Anexo
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-interbank-primary text-white">
          <CardTitle className="text-2xl">Vista Previa del Anexo</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div id="contract-content" className="max-w-none text-sm">
            <ContractHeader companyName={companyData.companyName} />
            <BasicCompanyInfo companyData={companyData} />
            <ContactInfo companyData={companyData} />
            <ServiceSelection companyData={companyData} />
            <AccountInfo companyData={companyData} />
            <OptionalControls companyData={companyData} />
            <AdditionalInfo companyData={companyData} />
            <SignatureSection companyData={companyData} currentDate={currentDate} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractPreview;


import { CompanyData } from "@/pages/Index";

interface SignatureSectionProps {
  companyData: CompanyData;
  currentDate: string;
}

const SignatureSection = ({ companyData, currentDate }: SignatureSectionProps) => {
  return (
    <>
      {/* Firmas */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <div className="border-b-2 border-gray-800 mb-2 h-16"></div>
          <p className="font-medium text-sm">Firma Representante Legal del Cliente</p>
          <p className="text-sm">Nombres y Apellidos:</p>
          <div className="border-2 border-gray-800 p-2 min-h-[25px] bg-gray-50 mt-1">
            {companyData.legalRepresentative}
          </div>
        </div>
        
        <div className="text-center">
          <div className="border-b-2 border-gray-800 mb-2 h-16"></div>
          <p className="font-medium text-sm">Firma del banco</p>
          <p className="text-sm">Tienda / Soporte Banca Comercial:</p>
          <div className="border-2 border-gray-800 p-2 min-h-[25px] bg-gray-50 mt-1">
            {/* Campo para información del banco */}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>Documento generado automáticamente el {currentDate}</p>
      </div>
    </>
  );
};

export default SignatureSection;

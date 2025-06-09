
import { CompanyData } from "@/pages/Index";

interface ContactInfoProps {
  companyData: CompanyData;
}

const ContactInfo = ({ companyData }: ContactInfoProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-sm mb-3">Persona de Contacto (En caso se requieran coordinaciones por correcciones en el formato)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-3 min-w-[120px]">Nombre Contacto:</span>
          <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
            {companyData.contactName || companyData.legalRepresentative}
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium mr-3 min-w-[80px]">Teléfono:</span>
          <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
            {companyData.contactPhone || companyData.phone}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-3 min-w-[80px]">Correo 1:</span>
          <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
            {companyData.contactEmail1 || companyData.email}
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium mr-3 min-w-[80px]">Correo 2:</span>
          <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
            {companyData.contactEmail2 || ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

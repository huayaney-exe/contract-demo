
import { CompanyData } from "@/pages/Index";

interface BasicCompanyInfoProps {
  companyData: CompanyData;
}

const BasicCompanyInfo = ({ companyData }: BasicCompanyInfoProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center">
        <span className="text-sm font-medium mr-3 min-w-[250px]">Razón Social / Nombre del Cliente:</span>
        <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
          {companyData.companyName}
        </div>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm font-medium mr-3 min-w-[250px]">RUC / DNI:</span>
        <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
          {companyData.ruc}
        </div>
      </div>
    </div>
  );
};

export default BasicCompanyInfo;

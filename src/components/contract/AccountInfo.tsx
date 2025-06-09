
import { CompanyData } from "@/pages/Index";

interface AccountInfoProps {
  companyData: CompanyData;
}

const AccountInfo = ({ companyData }: AccountInfoProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-sm mb-3">Cuenta de Cargo para el cobro de comisiones (Marcar con "X" la opción que desea seleccionar)</h3>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.accountType === 'ahorro' && companyData.currency === 'soles' ? 'X' : ''}
          </div>
          <span className="text-sm">Ahorro</span>
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.accountType === 'corriente' && companyData.currency === 'soles' ? 'X' : ''}
          </div>
          <span className="text-sm">Corriente S/</span>
          <span className="text-sm">Nro. de cuenta</span>
          <div className="border-2 border-gray-800 p-1 min-h-[25px] bg-gray-50 w-48">
            {companyData.currency === 'soles' ? companyData.accountNumber : ''}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.accountType === 'ahorro' && companyData.currency === 'dolares' ? 'X' : ''}
          </div>
          <span className="text-sm">Ahorro</span>
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.accountType === 'corriente' && companyData.currency === 'dolares' ? 'X' : ''}
          </div>
          <span className="text-sm">Corriente $</span>
          <span className="text-sm">Nro. de Cuenta</span>
          <div className="border-2 border-gray-800 p-1 min-h-[25px] bg-gray-50 w-48">
            {companyData.currency === 'dolares' ? companyData.accountNumber : ''}
          </div>
        </div>
      </div>
      
      <p className="text-xs mt-2">Nota: Esta es la cuenta principal de cargo de comisiones.</p>
    </div>
  );
};

export default AccountInfo;

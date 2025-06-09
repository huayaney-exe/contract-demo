
import { CompanyData } from "@/pages/Index";

interface OptionalControlsProps {
  companyData: CompanyData;
}

const OptionalControls = ({ companyData }: OptionalControlsProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-sm mb-3">Controles Opcionales (Si no se requieren controles, colocar "Sin límites" o "SL", caso contrario se rechazará la solicitud)</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="border-2 border-gray-800 p-2 text-left bg-gray-100"></th>
              <th className="border-2 border-gray-800 p-2 text-center bg-gray-100" colSpan={2}>Control de Monto Máximo por Lote</th>
              <th className="border-2 border-gray-800 p-2 text-center bg-gray-100" colSpan={2}>Control de Monto Máximo por Pago</th>
            </tr>
            <tr>
              <th className="border-2 border-gray-800 p-2 text-left bg-gray-100"></th>
              <th className="border-2 border-gray-800 p-2 text-center bg-gray-100">S/</th>
              <th className="border-2 border-gray-800 p-2 text-center bg-gray-100">$</th>
              <th className="border-2 border-gray-800 p-2 text-center bg-gray-100">S/</th>
              <th className="border-2 border-gray-800 p-2 text-center bg-gray-100">$</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Remuneraciones</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerBatchSoles || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerBatchDollars || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerPaymentSoles || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerPaymentDollars || ''}</td>
            </tr>
            <tr>
              <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Proveedores</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerBatchProveedoresSoles || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerBatchProveedoresDollars || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerPaymentProveedoresSoles || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerPaymentProveedoresDollars || ''}</td>
            </tr>
            <tr>
              <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Pagos Varios</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerBatchVariosSoles || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerBatchVariosDollars || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerPaymentVariosSoles || ''}</td>
              <td className="border-2 border-gray-800 p-2 h-8">{companyData.maxAmountPerPaymentVariosDollars || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionalControls;

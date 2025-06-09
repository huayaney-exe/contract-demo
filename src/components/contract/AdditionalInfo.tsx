
import { CompanyData } from "@/pages/Index";

interface AdditionalInfoProps {
  companyData: CompanyData;
}

const AdditionalInfo = ({ companyData }: AdditionalInfoProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-sm mb-3">Completar solo en caso de elegir el servicio de Pago Proveedores y/o Pagos Varios</h3>
      
      <div className="space-y-4">
        <div>
          <span className="text-sm">Número de días máximo para el cobro de cheques y ordenes de pagos ( )</span>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <span className="text-sm mr-3 w-20">Proveedores</span>
              <div className="border-2 border-gray-800 p-2 min-h-[25px] bg-gray-50 w-32">
                {companyData.maxDaysProviders || ''}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-3 w-20">Pagos Varios</span>
              <div className="border-2 border-gray-800 p-2 min-h-[25px] bg-gray-50 w-32">
                {companyData.maxDaysPayments || ''}
              </div>
            </div>
          </div>
          <p className="text-xs mt-2">( ) Tiempo Máximo 120 días. Culminado el plazo los cheques y órdenes de pago se revocan y se devuelven los fondos a la cuenta de cargo de la operación. En caso no indicar días, se configurará con el tiempo máximo.</p>
        </div>

        {/* Opción de consolidar facturas */}
        <div>
          <span className="text-sm font-medium">Opción de consolidar Facturas, Notas de Crédito, Notas de Débito en un solo abono o Cheque( )</span>
          <p className="text-xs mb-2">(Marcar con "X" la opción que desea seleccionar)</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-sm w-20">Proveedores</span>
              <div className="flex items-center space-x-2">
                <div className="border-2 border-gray-800 w-6 h-6 text-center flex items-center justify-center">
                  {companyData.consolidateInvoicesProviders === 'si' ? 'X' : ''}
                </div>
                <span className="text-sm">Sí</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="border-2 border-gray-800 w-6 h-6 text-center flex items-center justify-center">
                  {companyData.consolidateInvoicesProviders === 'no' ? 'X' : ''}
                </div>
                <span className="text-sm">No</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm w-20">Pagos Varios</span>
              <div className="flex items-center space-x-2">
                <div className="border-2 border-gray-800 w-6 h-6 text-center flex items-center justify-center">
                  {companyData.consolidateInvoicesPayments === 'si' ? 'X' : ''}
                </div>
                <span className="text-sm">Sí</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="border-2 border-gray-800 w-6 h-6 text-center flex items-center justify-center">
                  {companyData.consolidateInvoicesPayments === 'no' ? 'X' : ''}
                </div>
                <span className="text-sm">No</span>
              </div>
            </div>
          </div>
          <p className="text-xs mt-2">( ) En caso no marque una opción, se considera que no desea la opción de consolidar Facturas, Notas de Crédito, Notas de Débito en un solo abono o Cheque</p>
        </div>

        {/* Distribución de comisión */}
        <div>
          <span className="text-sm font-medium">Distribución Comisión Cheque Gerencia (Ordenante/Pagador) ( )</span>
          
          <div className="mt-2">
            <table className="border-collapse text-xs max-w-sm">
              <thead>
                <tr>
                  <th className="border-2 border-gray-800 p-2 text-left bg-gray-100"></th>
                  <th className="border-2 border-gray-800 p-2 text-center bg-gray-100">S/</th>
                  <th className="border-2 border-gray-800 p-2 text-center bg-gray-100">$</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Empresa</td>
                  <td className="border-2 border-gray-800 p-2 text-center">
                    {companyData.commissionDistributionCompanySoles ? `${companyData.commissionDistributionCompanySoles}%` : '% '}
                  </td>
                  <td className="border-2 border-gray-800 p-2 text-center">
                    {companyData.commissionDistributionCompanyDollars ? `${companyData.commissionDistributionCompanyDollars}%` : '% '}
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Proveedor</td>
                  <td className="border-2 border-gray-800 p-2 text-center">
                    {companyData.commissionDistributionProviderSoles ? `${companyData.commissionDistributionProviderSoles}%` : '% '}
                  </td>
                  <td className="border-2 border-gray-800 p-2 text-center">
                    {companyData.commissionDistributionProviderDollars ? `${companyData.commissionDistributionProviderDollars}%` : '% '}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-2">( ) Al no elegir distribución de comisión será asumida en su totalidad por el Cliente</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;

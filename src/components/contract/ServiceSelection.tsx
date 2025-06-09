
import { CompanyData } from "@/pages/Index";

interface ServiceSelectionProps {
  companyData: CompanyData;
}

const ServiceSelection = ({ companyData }: ServiceSelectionProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-sm mb-3">Servicio (Marcar con "X" la opción que desea seleccionar)</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center">
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.isRemuneraciones ? 'X' : ''}
          </div>
          <span className="text-sm">Remuneraciones/CTS</span>
        </div>
        <div className="flex items-center">
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.isProveedores ? 'X' : ''}
          </div>
          <span className="text-sm">Proveedores (1)</span>
        </div>
        <div className="flex items-center">
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.isPagosVarios ? 'X' : ''}
          </div>
          <span className="text-sm">Pagos Varios (2)</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.isNuevo ? 'X' : ''}
          </div>
          <span className="text-sm">Nuevo</span>
        </div>
        <div className="flex items-center">
          <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">
            {companyData.isModificacion ? 'X' : ''}
          </div>
          <span className="text-sm">Modificación ( ) Solo se completarán los campos a modificar</span>
        </div>
      </div>
      
      <div className="text-xs space-y-1">
        <p>(1) Incluye pagos a Persona Jurídica y Persona Natural con documento oficial de identidad, permite realizar pagos mediante abono en cuenta mismo banco, transferencias CCI/BCR y cheques de gerencia.</p>
        <p>(2) Incluye Persona Natural con documento oficial de identidad, permite realizar pagos en efectivo (Orden de Pago), cheques de gerencia y abono en cuenta)</p>
      </div>
    </div>
  );
};

export default ServiceSelection;

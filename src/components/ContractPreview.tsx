
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CompanyData } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";

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
        <Button onClick={handlePrint} size="lg">
          Imprimir Anexo
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl">Vista Previa del Anexo</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div id="contract-content" className="max-w-none text-sm">
            {/* Header del Anexo */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold mb-2">ANEXO PAGOS MASIVOS</h1>
              <p className="text-sm">
                Si desea afiliarse a los servicios de Pago de Remuneraciones y CTS, Pago a Proveedores y/o Pagos Varios, por favor complete este anexo.
              </p>
            </div>

            {/* Información básica */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-3 min-w-[200px]">Razón Social / Nombre del Cliente:</span>
                <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1 max-w-[400px]">
                  {companyData.companyName}
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm font-medium mr-3 min-w-[200px]">RUC / DNI:</span>
                <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1 max-w-[400px]">
                  {companyData.ruc}
                </div>
              </div>
            </div>

            {/* Persona de Contacto */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Persona de Contacto (En caso se requieran coordinaciones por correcciones en el formato)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3 min-w-[120px]">Nombre Contacto:</span>
                  <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
                    {companyData.legalRepresentative}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3 min-w-[80px]">Teléfono:</span>
                  <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
                    {companyData.phone}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3 min-w-[80px]">Correo 1:</span>
                  <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
                    {companyData.email}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3 min-w-[80px]">Correo 2:</span>
                  <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
                    {/* Campo vacío para llenar */}
                  </div>
                </div>
              </div>
            </div>

            {/* Servicio */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Servicio (Marcar con "X" la opción que desea seleccionar)</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center">X</div>
                  <span className="text-sm">Remuneraciones/CTS</span>
                </div>
                <div className="flex items-center">
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center"></div>
                  <span className="text-sm">Proveedores (1)</span>
                </div>
                <div className="flex items-center">
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center"></div>
                  <span className="text-sm">Pagos Varios (2)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center">X</div>
                  <span className="text-sm">Nuevo</span>
                </div>
                <div className="flex items-center">
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center"></div>
                  <span className="text-sm">Modificación ( ) Solo se completarán los campos a modificar</span>
                </div>
              </div>
              
              <div className="text-xs space-y-1">
                <p>(1) Incluye pagos a Persona Jurídica y Persona Natural con documento oficial de identidad, permite realizar pagos mediante abono en cuenta mismo banco, transferencias CCI/BCR y cheques de gerencia.</p>
                <p>(2) Incluye Persona Natural con documento oficial de identidad, permite realizar pagos en efectivo (Orden de Pago), cheques de gerencia y abono en cuenta)</p>
              </div>
            </div>

            {/* Cuenta de Cargo */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Cuenta de Cargo para el cobro de comisiones (Marcar con "X" la opción que desea seleccionar)</h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center">X</div>
                  <span className="text-sm mr-3">Ahorro</span>
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center"></div>
                  <span className="text-sm mr-3">Corriente S/</span>
                  <span className="text-sm mr-3">Nro. de cuenta</span>
                  <div className="border-2 border-gray-800 p-1 min-h-[25px] bg-gray-50 w-48">
                    {/* Campo para número de cuenta */}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center"></div>
                  <span className="text-sm mr-3">Ahorro</span>
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center"></div>
                  <span className="text-sm mr-3">Corriente $</span>
                  <span className="text-sm mr-3">Nro. de Cuenta</span>
                  <div className="border-2 border-gray-800 p-1 min-h-[25px] bg-gray-50 w-48">
                    {/* Campo para número de cuenta */}
                  </div>
                </div>
              </div>
              
              <p className="text-xs mt-2">Nota: Esta es la cuenta principal de cargo de comisiones.</p>
            </div>

            {/* Controles Opcionales */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Controles Opcionales (Si no se requieren controles, colocar "Sin límites" o "SL", caso contrario se rechazará la solicitud)</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr>
                      <th className="border-2 border-gray-800 p-2 text-left"></th>
                      <th className="border-2 border-gray-800 p-2 text-center" colspan="2">Control de Monto Máximo por Lote</th>
                      <th className="border-2 border-gray-800 p-2 text-center" colspan="2">Control de Monto Máximo por Pago</th>
                    </tr>
                    <tr>
                      <th className="border-2 border-gray-800 p-2 text-left"></th>
                      <th className="border-2 border-gray-800 p-2 text-center">S/</th>
                      <th className="border-2 border-gray-800 p-2 text-center">$</th>
                      <th className="border-2 border-gray-800 p-2 text-center">S/</th>
                      <th className="border-2 border-gray-800 p-2 text-center">$</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 border-gray-800 p-2 font-medium">Remuneraciones</td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-800 p-2 font-medium">Proveedores</td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-800 p-2 font-medium">Pagos Varios</td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Completar solo en caso de elegir el servicio de Pago Proveedores y/o Pagos Varios</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm mr-3">Número de días máximo para el cobro de cheques y ordenes de pagos ( )</span>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm mr-3 w-20">Proveedores</span>
                      <div className="border-2 border-gray-800 p-2 min-h-[25px] bg-gray-50 w-32"></div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-3 w-20">Pagos Varios</span>
                      <div className="border-2 border-gray-800 p-2 min-h-[25px] bg-gray-50 w-32"></div>
                    </div>
                  </div>
                  <p className="text-xs mt-2">( ) Tiempo Máximo 120 días. Culminado el plazo los cheques y órdenes de pago se revocan y se devuelven los fondos a la cuenta de cargo de la operación. En caso no indicar días, se configurará con el tiempo máximo.</p>
                </div>
              </div>
            </div>

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
                <div className="border-2 border-gray-800 p-2 min-h-[25px] bg-gray-50 mt-1"></div>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-muted-foreground">
              <p>Documento generado automáticamente el {currentDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractPreview;

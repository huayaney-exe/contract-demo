
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { CompanyData } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

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
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;

      // Helper function to add text with word wrapping
      const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + (lines.length * fontSize * 0.4);
      };

      // Helper function to draw a box
      const drawBox = (x: number, y: number, width: number, height: number, text = '') => {
        pdf.rect(x, y, width, height);
        if (text) {
          pdf.text(text, x + 2, y + height - 2);
        }
        return y + height;
      };

      // Header
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ANEXO PAGOS MASIVOS', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(
        'Si desea afiliarse a los servicios de Pago de Remuneraciones y CTS, Pago a Proveedores y/o Pagos Varios, por favor complete este anexo.',
        margin,
        yPosition,
        pageWidth - 2 * margin
      );
      yPosition += 10;

      // Información básica
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      // Razón Social
      pdf.text('Razón Social / Nombre del Cliente:', margin, yPosition);
      yPosition += 2;
      drawBox(margin, yPosition, pageWidth - 2 * margin, 8, companyData.companyName);
      yPosition += 12;

      // RUC / DNI
      pdf.text('RUC / DNI:', margin, yPosition);
      yPosition += 2;
      drawBox(margin, yPosition, pageWidth - 2 * margin, 8, companyData.ruc);
      yPosition += 15;

      // Persona de Contacto
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Persona de Contacto (En caso se requieran coordinaciones por correcciones en el formato)', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      pdf.setFont('helvetica', 'normal');
      
      // Nombre Contacto y Teléfono en la misma línea
      const halfWidth = (pageWidth - 3 * margin) / 2;
      pdf.text('Nombre Contacto:', margin, yPosition);
      pdf.text('Teléfono:', margin + halfWidth + 10, yPosition);
      yPosition += 2;
      drawBox(margin, yPosition, halfWidth, 8, companyData.contactName || companyData.legalRepresentative);
      drawBox(margin + halfWidth + 10, yPosition, halfWidth, 8, companyData.contactPhone || companyData.phone);
      yPosition += 12;

      // Correo 1 y Correo 2 en la misma línea
      pdf.text('Correo 1:', margin, yPosition);
      pdf.text('Correo 2:', margin + halfWidth + 10, yPosition);
      yPosition += 2;
      drawBox(margin, yPosition, halfWidth, 8, companyData.contactEmail1 || companyData.email);
      drawBox(margin + halfWidth + 10, yPosition, halfWidth, 8, companyData.contactEmail2 || '');
      yPosition += 15;

      // Servicio
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Servicio (Marcar con "X" la opción que desea seleccionar)', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      pdf.setFont('helvetica', 'normal');
      const thirdWidth = (pageWidth - 4 * margin) / 3;
      
      // Checkboxes de servicio
      const checkSize = 5;
      
      // Remuneraciones/CTS
      pdf.rect(margin, yPosition, checkSize, checkSize);
      if (companyData.isRemuneraciones) pdf.text('X', margin + 1, yPosition + 4);
      pdf.text('Remuneraciones/CTS', margin + checkSize + 3, yPosition + 4);
      
      // Proveedores
      pdf.rect(margin + thirdWidth, yPosition, checkSize, checkSize);
      if (companyData.isProveedores) pdf.text('X', margin + thirdWidth + 1, yPosition + 4);
      pdf.text('Proveedores (1)', margin + thirdWidth + checkSize + 3, yPosition + 4);
      
      // Pagos Varios
      pdf.rect(margin + 2 * thirdWidth, yPosition, checkSize, checkSize);
      if (companyData.isPagosVarios) pdf.text('X', margin + 2 * thirdWidth + 1, yPosition + 4);
      pdf.text('Pagos Varios (2)', margin + 2 * thirdWidth + checkSize + 3, yPosition + 4);
      
      yPosition += 10;

      // Nuevo / Modificación
      pdf.rect(margin, yPosition, checkSize, checkSize);
      if (companyData.isNuevo) pdf.text('X', margin + 1, yPosition + 4);
      pdf.text('Nuevo', margin + checkSize + 3, yPosition + 4);
      
      pdf.rect(margin + 80, yPosition, checkSize, checkSize);
      if (companyData.isModificacion) pdf.text('X', margin + 80 + 1, yPosition + 4);
      pdf.text('Modificación ( ) Solo se completarán los campos a modificar', margin + 80 + checkSize + 3, yPosition + 4);
      
      yPosition += 10;

      // Notas explicativas
      pdf.setFontSize(8);
      yPosition = addText('(1) Incluye pagos a Persona Jurídica y Persona Natural con documento oficial de identidad, permite realizar pagos mediante abono en cuenta mismo banco, transferencias CCI/BCR y cheques de gerencia.', margin, yPosition, pageWidth - 2 * margin, 8);
      yPosition = addText('(2) Incluye Persona Natural con documento oficial de identidad, permite realizar pagos en efectivo (Orden de Pago), cheques de gerencia y abono en cuenta)', margin, yPosition, pageWidth - 2 * margin, 8);
      yPosition += 8;

      pdf.setFontSize(10);

      // Cuenta de Cargo
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Cuenta de Cargo para el cobro de comisiones (Marcar con "X" la opción que desea seleccionar)', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      pdf.setFont('helvetica', 'normal');
      
      // Primera línea de cuentas (Soles)
      pdf.rect(margin, yPosition, checkSize, checkSize);
      if (companyData.accountType === 'ahorro' && companyData.currency === 'soles') pdf.text('X', margin + 1, yPosition + 4);
      pdf.text('Ahorro', margin + checkSize + 3, yPosition + 4);
      
      pdf.rect(margin + 30, yPosition, checkSize, checkSize);
      if (companyData.accountType === 'corriente' && companyData.currency === 'soles') pdf.text('X', margin + 30 + 1, yPosition + 4);
      pdf.text('Corriente S/', margin + 30 + checkSize + 3, yPosition + 4);
      
      pdf.text('Nro. de cuenta', margin + 80, yPosition + 4);
      drawBox(margin + 120, yPosition, 60, 6, companyData.currency === 'soles' ? companyData.accountNumber || '' : '');
      yPosition += 10;

      // Segunda línea de cuentas (Dólares)
      pdf.rect(margin, yPosition, checkSize, checkSize);
      if (companyData.accountType === 'ahorro' && companyData.currency === 'dolares') pdf.text('X', margin + 1, yPosition + 4);
      pdf.text('Ahorro', margin + checkSize + 3, yPosition + 4);
      
      pdf.rect(margin + 30, yPosition, checkSize, checkSize);
      if (companyData.accountType === 'corriente' && companyData.currency === 'dolares') pdf.text('X', margin + 30 + 1, yPosition + 4);
      pdf.text('Corriente $', margin + 30 + checkSize + 3, yPosition + 4);
      
      pdf.text('Nro. de Cuenta', margin + 80, yPosition + 4);
      drawBox(margin + 120, yPosition, 60, 6, companyData.currency === 'dolares' ? companyData.accountNumber || '' : '');
      yPosition += 12;

      pdf.setFontSize(8);
      yPosition = addText('Nota: Esta es la cuenta principal de cargo de comisiones.', margin, yPosition, pageWidth - 2 * margin, 8);
      yPosition += 10;

      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(10);

      // Controles Opcionales
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Controles Opcionales (Si no se requieren controles, colocar "Sin límites" o "SL", caso contrario se rechazará la solicitud)', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      // Tabla de controles opcionales
      const tableStartY = yPosition;
      const colWidths = [40, 30, 30, 30, 30];
      const rowHeight = 8;

      // Headers
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      
      // Primera fila de headers
      pdf.rect(margin, yPosition, colWidths[0], rowHeight);
      pdf.rect(margin + colWidths[0], yPosition, colWidths[1] + colWidths[2], rowHeight);
      pdf.text('Control de Monto Máximo por Lote', margin + colWidths[0] + 20, yPosition + 5, { align: 'center' });
      pdf.rect(margin + colWidths[0] + colWidths[1] + colWidths[2], yPosition, colWidths[3] + colWidths[4], rowHeight);
      pdf.text('Control de Monto Máximo por Pago', margin + colWidths[0] + colWidths[1] + colWidths[2] + 20, yPosition + 5, { align: 'center' });
      yPosition += rowHeight;

      // Segunda fila de headers
      pdf.rect(margin, yPosition, colWidths[0], rowHeight);
      pdf.rect(margin + colWidths[0], yPosition, colWidths[1], rowHeight);
      pdf.text('S/', margin + colWidths[0] + 15, yPosition + 5, { align: 'center' });
      pdf.rect(margin + colWidths[0] + colWidths[1], yPosition, colWidths[2], rowHeight);
      pdf.text('$', margin + colWidths[0] + colWidths[1] + 15, yPosition + 5, { align: 'center' });
      pdf.rect(margin + colWidths[0] + colWidths[1] + colWidths[2], yPosition, colWidths[3], rowHeight);
      pdf.text('S/', margin + colWidths[0] + colWidths[1] + colWidths[2] + 15, yPosition + 5, { align: 'center' });
      pdf.rect(margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], yPosition, colWidths[4], rowHeight);
      pdf.text('$', margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 15, yPosition + 5, { align: 'center' });
      yPosition += rowHeight;

      pdf.setFont('helvetica', 'normal');

      // Filas de datos
      const services = ['Remuneraciones', 'Proveedores', 'Pagos Varios'];
      services.forEach((service) => {
        pdf.rect(margin, yPosition, colWidths[0], rowHeight);
        pdf.text(service, margin + 2, yPosition + 5);
        
        for (let i = 1; i < 5; i++) {
          const x = margin + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
          pdf.rect(x, yPosition, colWidths[i], rowHeight);
        }
        
        yPosition += rowHeight;
      });

      yPosition += 10;

      // Información adicional para Proveedores y Pagos Varios
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Completar solo en caso de elegir el servicio de Pago Proveedores y/o Pagos Varios', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      pdf.setFont('helvetica', 'normal');
      yPosition = addText('Número de días máximo para el cobro de cheques y ordenes de pagos ( )', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      // Proveedores y Pagos Varios días
      pdf.text('Proveedores', margin, yPosition);
      drawBox(margin + 40, yPosition - 2, 30, 6, companyData.maxDaysProviders || '');
      
      pdf.text('Pagos Varios', margin + 80, yPosition);
      drawBox(margin + 120, yPosition - 2, 30, 6, companyData.maxDaysPayments || '');
      yPosition += 10;

      pdf.setFontSize(8);
      yPosition = addText('( ) Tiempo Máximo 120 días. Culminado el plazo los cheques y órdenes de pago se revocan y se devuelven los fondos a la cuenta de cargo de la operación. En caso no indicar días, se configurará con el tiempo máximo.', margin, yPosition, pageWidth - 2 * margin, 8);
      yPosition += 8;

      pdf.setFontSize(10);

      // Opción consolidar facturas
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Opción de consolidar Facturas, Notas de Crédito, Notas de Débito en un solo abono o Cheque( )', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 3;
      pdf.setFont('helvetica', 'normal');
      yPosition = addText('(Marcar con "X" la opción que desea seleccionar)', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      // Proveedores consolidar
      pdf.text('Proveedores', margin, yPosition);
      pdf.rect(margin + 40, yPosition - 2, checkSize, checkSize);
      if (companyData.consolidateInvoicesProviders === 'si') pdf.text('X', margin + 40 + 1, yPosition + 2);
      pdf.text('Sí', margin + 40 + checkSize + 3, yPosition);
      
      pdf.rect(margin + 60, yPosition - 2, checkSize, checkSize);
      if (companyData.consolidateInvoicesProviders === 'no') pdf.text('X', margin + 60 + 1, yPosition + 2);
      pdf.text('No', margin + 60 + checkSize + 3, yPosition);
      yPosition += 8;

      // Pagos Varios consolidar
      pdf.text('Pagos Varios', margin, yPosition);
      pdf.rect(margin + 40, yPosition - 2, checkSize, checkSize);
      if (companyData.consolidateInvoicesPayments === 'si') pdf.text('X', margin + 40 + 1, yPosition + 2);
      pdf.text('Sí', margin + 40 + checkSize + 3, yPosition);
      
      pdf.rect(margin + 60, yPosition - 2, checkSize, checkSize);
      if (companyData.consolidateInvoicesPayments === 'no') pdf.text('X', margin + 60 + 1, yPosition + 2);
      pdf.text('No', margin + 60 + checkSize + 3, yPosition);
      yPosition += 10;

      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }

      // Distribución de comisión
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Distribución Comisión Cheque Gerencia (Ordenante/Pagador) ( )', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      // Tabla de distribución
      const commissionTableY = yPosition;
      const commissionColWidths = [30, 20, 20];
      
      // Headers
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.rect(margin, yPosition, commissionColWidths[0], rowHeight);
      pdf.rect(margin + commissionColWidths[0], yPosition, commissionColWidths[1], rowHeight);
      pdf.text('S/', margin + commissionColWidths[0] + 10, yPosition + 5, { align: 'center' });
      pdf.rect(margin + commissionColWidths[0] + commissionColWidths[1], yPosition, commissionColWidths[2], rowHeight);
      pdf.text('$', margin + commissionColWidths[0] + commissionColWidths[1] + 10, yPosition + 5, { align: 'center' });
      yPosition += rowHeight;

      pdf.setFont('helvetica', 'normal');
      
      // Empresa
      pdf.rect(margin, yPosition, commissionColWidths[0], rowHeight);
      pdf.text('Empresa', margin + 2, yPosition + 5);
      pdf.rect(margin + commissionColWidths[0], yPosition, commissionColWidths[1], rowHeight);
      pdf.text('% ', margin + commissionColWidths[0] + 2, yPosition + 5);
      pdf.rect(margin + commissionColWidths[0] + commissionColWidths[1], yPosition, commissionColWidths[2], rowHeight);
      pdf.text('% ', margin + commissionColWidths[0] + commissionColWidths[1] + 2, yPosition + 5);
      yPosition += rowHeight;

      // Proveedor
      pdf.rect(margin, yPosition, commissionColWidths[0], rowHeight);
      pdf.text('Proveedor', margin + 2, yPosition + 5);
      pdf.rect(margin + commissionColWidths[0], yPosition, commissionColWidths[1], rowHeight);
      pdf.text('% ', margin + commissionColWidths[0] + 2, yPosition + 5);
      pdf.rect(margin + commissionColWidths[0] + commissionColWidths[1], yPosition, commissionColWidths[2], rowHeight);
      pdf.text('% ', margin + commissionColWidths[0] + commissionColWidths[1] + 2, yPosition + 5);
      yPosition += 12;

      pdf.setFontSize(8);
      yPosition = addText('( ) Al no elegir distribución de comisión será asumida en su totalidad por el Cliente', margin, yPosition, pageWidth - 2 * margin, 8);
      yPosition += 10;

      pdf.setFontSize(10);

      // Información a completar por INTERBANK
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Información a completar por INTERBANK', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      pdf.setFont('helvetica', 'normal');
      
      // Código único y Tienda Receptora
      pdf.text('Código único:', margin, yPosition);
      drawBox(margin + 40, yPosition - 2, 60, 8, companyData.uniqueCode || '');
      
      pdf.text('Tienda Receptora:', margin + 110, yPosition);
      drawBox(margin + 150, yPosition - 2, 40, 8, companyData.receivingStore || '');
      yPosition += 15;

      // Información de la Empresa
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Información de la Empresa', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 5;

      pdf.setFont('helvetica', 'normal');
      drawBox(margin, yPosition, pageWidth - 2 * margin, 20, companyData.companyInfo || '');
      yPosition += 25;

      // Firmas
      pdf.setFont('helvetica', 'bold');
      yPosition = addText('Firmas:', margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 15;

      // Líneas de firma
      const signatureWidth = (pageWidth - 3 * margin) / 2;
      pdf.line(margin, yPosition, margin + signatureWidth, yPosition);
      pdf.line(pageWidth - margin - signatureWidth, yPosition, pageWidth - margin, yPosition);
      
      yPosition += 5;
      pdf.setFont('helvetica', 'normal');
      pdf.text('Firma Representante Legal del Cliente', margin, yPosition);
      pdf.text('Firma del banco', pageWidth - margin - signatureWidth, yPosition);
      
      yPosition += 5;
      pdf.text('Nombres y Apellidos:', margin, yPosition);
      pdf.text('Tienda / Soporte Banca Comercial:', pageWidth - margin - signatureWidth, yPosition);
      
      yPosition += 3;
      drawBox(margin, yPosition, signatureWidth, 6, companyData.legalRepresentative);
      drawBox(pageWidth - margin - signatureWidth, yPosition, signatureWidth, 6, '');

      // Footer
      yPosition = pageHeight - 15;
      pdf.setFontSize(8);
      pdf.text(`Documento generado el ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' });

      // Save the PDF
      pdf.save(`Anexo_Pagos_Masivos_${companyData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);

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
                    {/* Campo para llenar */}
                  </div>
                </div>
              </div>
            </div>

            {/* Servicio */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Servicio (Marcar con "X" la opción que desea seleccionar)</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">X</div>
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
                  <div className="border-2 border-gray-800 w-6 h-6 mr-2 text-center flex items-center justify-center">X</div>
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
                <div className="flex items-center space-x-2">
                  <div className="border-2 border-gray-800 w-6 h-6 text-center flex items-center justify-center">X</div>
                  <span className="text-sm">Ahorro</span>
                  <div className="border-2 border-gray-800 w-6 h-6 text-center"></div>
                  <span className="text-sm">Corriente S/</span>
                  <span className="text-sm">Nro. de cuenta</span>
                  <div className="border-2 border-gray-800 p-1 min-h-[25px] bg-gray-50 w-48">
                    {/* Campo para número de cuenta */}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="border-2 border-gray-800 w-6 h-6 text-center"></div>
                  <span className="text-sm">Ahorro</span>
                  <div className="border-2 border-gray-800 w-6 h-6 text-center"></div>
                  <span className="text-sm">Corriente $</span>
                  <span className="text-sm">Nro. de Cuenta</span>
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
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Proveedores</td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Pagos Varios</td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                      <td className="border-2 border-gray-800 p-2 h-8"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Información adicional para Proveedores y Pagos Varios */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Completar solo en caso de elegir el servicio de Pago Proveedores y/o Pagos Varios</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm">Número de días máximo para el cobro de cheques y ordenes de pagos ( )</span>
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

                {/* Opción de consolidar facturas */}
                <div>
                  <span className="text-sm font-medium">Opción de consolidar Facturas, Notas de Crédito, Notas de Débito en un solo abono o Cheque( )</span>
                  <p className="text-xs mb-2">(Marcar con "X" la opción que desea seleccionar)</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm w-20">Proveedores</span>
                      <div className="flex items-center space-x-2">
                        <div className="border-2 border-gray-800 w-6 h-6 text-center"></div>
                        <span className="text-sm">Sí</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="border-2 border-gray-800 w-6 h-6 text-center"></div>
                        <span className="text-sm">No</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-sm w-20">Pagos Varios</span>
                      <div className="flex items-center space-x-2">
                        <div className="border-2 border-gray-800 w-6 h-6 text-center"></div>
                        <span className="text-sm">Sí</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="border-2 border-gray-800 w-6 h-6 text-center"></div>
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
                          <td className="border-2 border-gray-800 p-2 text-center">% </td>
                          <td className="border-2 border-gray-800 p-2 text-center">% </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Proveedor</td>
                          <td className="border-2 border-gray-800 p-2 text-center">% </td>
                          <td className="border-2 border-gray-800 p-2 text-center">% </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs mt-2">( ) Al no elegir distribución de comisión será asumida en su totalidad por el Cliente</p>
                </div>
              </div>
            </div>

            {/* Información a completar por INTERBANK */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Información a completar por INTERBANK</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3 min-w-[120px]">Código único:</span>
                  <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
                    {/* Campo para código único */}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3 min-w-[120px]">Tienda Receptora:</span>
                  <div className="border-2 border-gray-800 p-2 min-h-[35px] bg-gray-50 flex-1">
                    {/* Campo para tienda receptora */}
                  </div>
                </div>
              </div>
            </div>

            {/* Información de la Empresa */}
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-3">Información de la Empresa</h3>
              <div className="border-2 border-gray-800 p-4 min-h-[80px] bg-gray-50">
                {/* Campo para información adicional de la empresa */}
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

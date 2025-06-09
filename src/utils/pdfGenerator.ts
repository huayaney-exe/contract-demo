
import jsPDF from 'jspdf';
import { CompanyData } from "@/pages/Index";

export const generateContractPDF = (companyData: CompanyData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  const currentDate = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
  yPosition += 5;
  drawBox(margin, yPosition, pageWidth - 2 * margin, 8, companyData.companyName);
  yPosition += 12;

  // RUC / DNI
  pdf.text('RUC / DNI:', margin, yPosition);
  yPosition += 5;
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
  yPosition += 5;
  drawBox(margin, yPosition, halfWidth, 8, companyData.contactName || companyData.legalRepresentative);
  drawBox(margin + halfWidth + 10, yPosition, halfWidth, 8, companyData.contactPhone || companyData.phone);
  yPosition += 12;

  // Correo 1 y Correo 2 en la misma línea
  pdf.text('Correo 1:', margin, yPosition);
  pdf.text('Correo 2:', margin + halfWidth + 10, yPosition);
  yPosition += 5;
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
  yPosition += 3;
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
  const controlsMapping = [
    {
      name: 'Remuneraciones',
      soles_lote: companyData.maxAmountPerBatchSoles || '',
      dolares_lote: companyData.maxAmountPerBatchDollars || '',
      soles_pago: companyData.maxAmountPerPaymentSoles || '',
      dolares_pago: companyData.maxAmountPerPaymentDollars || ''
    },
    {
      name: 'Proveedores',
      soles_lote: companyData.maxAmountPerBatchProveedoresSoles || '',
      dolares_lote: companyData.maxAmountPerBatchProveedoresDollars || '',
      soles_pago: companyData.maxAmountPerPaymentProveedoresSoles || '',
      dolares_pago: companyData.maxAmountPerPaymentProveedoresDollars || ''
    },
    {
      name: 'Pagos Varios',
      soles_lote: companyData.maxAmountPerBatchVariosSoles || '',
      dolares_lote: companyData.maxAmountPerBatchVariosDollars || '',
      soles_pago: companyData.maxAmountPerPaymentVariosSoles || '',
      dolares_pago: companyData.maxAmountPerPaymentVariosDollars || ''
    }
  ];

  controlsMapping.forEach((control) => {
    pdf.rect(margin, yPosition, colWidths[0], rowHeight);
    pdf.text(control.name, margin + 2, yPosition + 5);
    
    // S/ Lote
    pdf.rect(margin + colWidths[0], yPosition, colWidths[1], rowHeight);
    pdf.text(control.soles_lote, margin + colWidths[0] + 2, yPosition + 5);
    
    // $ Lote
    pdf.rect(margin + colWidths[0] + colWidths[1], yPosition, colWidths[2], rowHeight);
    pdf.text(control.dolares_lote, margin + colWidths[0] + colWidths[1] + 2, yPosition + 5);
    
    // S/ Pago
    pdf.rect(margin + colWidths[0] + colWidths[1] + colWidths[2], yPosition, colWidths[3], rowHeight);
    pdf.text(control.soles_pago, margin + colWidths[0] + colWidths[1] + colWidths[2] + 2, yPosition + 5);
    
    // $ Pago
    pdf.rect(margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], yPosition, colWidths[4], rowHeight);
    pdf.text(control.dolares_pago, margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 2, yPosition + 5);
    
    yPosition += rowHeight;
  });

  yPosition += 10;

  // Check if we need a new page
  if (yPosition > pageHeight - 100) {
    pdf.addPage();
    yPosition = margin;
  }

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

  // Continue with remaining sections...
  // Footer
  yPosition = pageHeight - 15;
  pdf.setFontSize(8);
  pdf.text(`Documento generado el ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' });

  // Save the PDF
  pdf.save(`Anexo_Pagos_Masivos_${companyData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
};

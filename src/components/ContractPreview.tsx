
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
      description: "El contrato se está preparando para imprimir...",
    });
    
    // Crear una nueva ventana para imprimir solo el contrato
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Contrato - ${companyData.companyName}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
              .header { text-align: center; margin-bottom: 30px; }
              .content { margin: 20px 0; }
              .signature-section { margin-top: 60px; }
              .signature-line { border-bottom: 1px solid #000; width: 300px; margin: 20px 0; }
              @media print { body { margin: 20px; } }
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
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Formulario
        </Button>
        <Button onClick={handlePrint} size="lg">
          Imprimir Contrato
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-2xl">Vista Previa del Contrato</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div id="contract-content" className="max-w-none prose prose-lg">
            {/* Header del Contrato */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">CONTRATO DE PRESTACIÓN DE SERVICIOS</h1>
              <p className="text-lg text-muted-foreground">
                Contrato celebrado en Lima, Perú, el {currentDate}
              </p>
            </div>

            {/* Partes del Contrato */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">PARTES CONTRATANTES</h2>
              
              <div className="mb-6">
                <p className="font-semibold">LA EMPRESA:</p>
                <ul className="list-none space-y-1 ml-4">
                  <li><strong>Razón Social:</strong> {companyData.companyName}</li>
                  <li><strong>RUC:</strong> {companyData.ruc}</li>
                  <li><strong>Representante Legal:</strong> {companyData.legalRepresentative}</li>
                  <li><strong>DNI:</strong> {companyData.dni}</li>
                  <li><strong>Dirección:</strong> {companyData.address}, {companyData.district}, {companyData.province}, {companyData.department}</li>
                  <li><strong>Teléfono:</strong> {companyData.phone}</li>
                  <li><strong>Email:</strong> {companyData.email}</li>
                  <li><strong>Actividad Comercial:</strong> {companyData.businessActivity}</li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="font-semibold">EL CONTRATISTA:</p>
                <ul className="list-none space-y-1 ml-4">
                  <li><strong>Nombres y Apellidos:</strong> _________________________________</li>
                  <li><strong>DNI:</strong> _________________________________</li>
                  <li><strong>Dirección:</strong> _________________________________</li>
                  <li><strong>Teléfono:</strong> _________________________________</li>
                  <li><strong>Email:</strong> _________________________________</li>
                </ul>
              </div>
            </div>

            {/* Cláusulas del Contrato */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">PRIMERA: OBJETO DEL CONTRATO</h3>
                <p className="text-justify">
                  Mediante el presente contrato, EL CONTRATISTA se compromete a prestar servicios profesionales 
                  a LA EMPRESA en el área de _________________________, cumpliendo con los más altos estándares 
                  de calidad y profesionalismo.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">SEGUNDA: DURACIÓN</h3>
                <p className="text-justify">
                  El presente contrato tendrá una duración de _____________ meses, iniciando el día 
                  _____________ y culminando el día _____________, pudiendo ser renovado de común acuerdo 
                  entre las partes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">TERCERA: CONTRAPRESTACIÓN</h3>
                <p className="text-justify">
                  Como contraprestación por los servicios prestados, LA EMPRESA se obliga a pagar 
                  a EL CONTRATISTA la suma de S/. _____________ (_______________ soles), que será 
                  cancelada de forma _____________.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">CUARTA: OBLIGACIONES DE LA EMPRESA</h3>
                <p className="text-justify">
                  LA EMPRESA se compromete a:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Proporcionar la información necesaria para el desarrollo de los servicios.</li>
                  <li>Efectuar los pagos en las fechas acordadas.</li>
                  <li>Brindar las facilidades necesarias para el cumplimiento del objeto contractual.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">QUINTA: OBLIGACIONES DEL CONTRATISTA</h3>
                <p className="text-justify">
                  EL CONTRATISTA se compromete a:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Prestar los servicios con la diligencia y profesionalismo requerido.</li>
                  <li>Mantener la confidencialidad de la información proporcionada.</li>
                  <li>Cumplir con los plazos establecidos para la entrega de los servicios.</li>
                  <li>Informar oportunamente sobre el avance de los trabajos.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">SEXTA: CONFIDENCIALIDAD</h3>
                <p className="text-justify">
                  EL CONTRATISTA se obliga a mantener en estricta confidencialidad toda la información 
                  que llegue a su conocimiento con motivo de la ejecución del presente contrato, 
                  no pudiendo divulgarla a terceros sin autorización expresa y por escrito de LA EMPRESA.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">SÉPTIMA: RESOLUCIÓN DE CONTROVERSIAS</h3>
                <p className="text-justify">
                  Las controversias que pudieran surgir con motivo de la interpretación o ejecución 
                  del presente contrato, serán resueltas mediante trato directo entre las partes. 
                  De no ser posible, se someterán a arbitraje de derecho conforme a la legislación peruana.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">OCTAVA: LEY APLICABLE</h3>
                <p className="text-justify">
                  El presente contrato se rige por las leyes de la República del Perú.
                </p>
              </div>
            </div>

            {/* Firmas */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="border-b border-gray-400 mb-2 h-16"></div>
                <p className="font-semibold">{companyData.legalRepresentative}</p>
                <p>Representante Legal</p>
                <p>{companyData.companyName}</p>
                <p>DNI: {companyData.dni}</p>
              </div>
              
              <div className="text-center">
                <div className="border-b border-gray-400 mb-2 h-16"></div>
                <p className="font-semibold">EL CONTRATISTA</p>
                <p>Nombres y Apellidos</p>
                <p>DNI: _______________</p>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Documento generado automáticamente el {currentDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractPreview;

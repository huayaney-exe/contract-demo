
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { CompanyData } from "@/pages/Index";

interface CompanyFormProps {
  onSubmit: (data: CompanyData) => void;
}

const CompanyForm = ({ onSubmit }: CompanyFormProps) => {
  const [formData, setFormData] = useState<CompanyData>({
    companyName: "",
    ruc: "",
    legalRepresentative: "",
    dni: "",
    address: "",
    district: "",
    province: "",
    department: "",
    phone: "",
    email: "",
    businessActivity: ""
  });

  const [additionalData, setAdditionalData] = useState({
    contactName: "",
    contactPhone: "",
    email1: "",
    email2: "",
    serviceType: "",
    operationType: "",
    accountType: "",
    accountNumber: "",
    currency: "",
    maxLoteAmount: "",
    maxPaymentAmount: "",
    maxDaysProviders: "",
    maxDaysVarios: "",
    consolidateInvoices: "",
    commissionDistributionSoles: "",
    commissionDistributionDollars: "",
    enterprisePercentageSoles: "",
    enterprisePercentageDollars: "",
    providerPercentageSoles: "",
    providerPercentageDollars: ""
  });

  const [errors, setErrors] = useState<Partial<CompanyData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CompanyData> = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Razón Social es requerida";
    if (!formData.ruc.trim()) newErrors.ruc = "RUC/DNI es requerido";
    if (!additionalData.contactName.trim()) newErrors.legalRepresentative = "Nombre de contacto es requerido";
    if (!additionalData.contactPhone.trim()) newErrors.phone = "Teléfono de contacto es requerido";
    if (!additionalData.email1.trim()) newErrors.email = "Al menos un correo es requerido";

    if (formData.ruc && !/^\d{8,11}$/.test(formData.ruc)) {
      newErrors.ruc = "RUC debe tener 11 dígitos o DNI 8 dígitos";
    }

    if (additionalData.email1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(additionalData.email1)) {
      newErrors.email = "Email 1 no válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Formulario completado",
        description: "Datos validados correctamente. Generando anexo...",
      });
      
      const completeData = {
        ...formData,
        legalRepresentative: additionalData.contactName,
        phone: additionalData.contactPhone,
        email: additionalData.email1
      };
      
      onSubmit(completeData);
    } else {
      toast({
        title: "Errores en el formulario",
        description: "Por favor, corrija los errores antes de continuar.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof typeof additionalData, value: string) => {
    setAdditionalData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormDataChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-2xl">Anexo Pagos Masivos</CardTitle>
        <p className="text-sm opacity-90">
          Si desea afiliarse a los servicios de Pago de Remuneraciones y CTS, Pago a Proveedores y/o Pagos Varios, por favor complete este anexo.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Información básica */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Razón Social / Nombre del Cliente:</Label>
              <div className="border-2 border-gray-300 p-2 min-h-[40px] bg-gray-50">
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleFormDataChange('companyName', e.target.value)}
                  placeholder=""
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                />
              </div>
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">RUC / DNI:</Label>
              <div className="border-2 border-gray-300 p-2 min-h-[40px] bg-gray-50">
                <Input
                  value={formData.ruc}
                  onChange={(e) => handleFormDataChange('ruc', e.target.value)}
                  placeholder=""
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                />
              </div>
              {errors.ruc && (
                <p className="text-sm text-destructive">{errors.ruc}</p>
              )}
            </div>
          </div>

          {/* Persona de Contacto */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Persona de Contacto (En caso se requieran coordinaciones por correcciones en el formato)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nombre Contacto:</Label>
                <div className="border-2 border-gray-300 p-2 min-h-[40px] bg-gray-50">
                  <Input
                    value={additionalData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Teléfono:</Label>
                <div className="border-2 border-gray-300 p-2 min-h-[40px] bg-gray-50">
                  <Input
                    value={additionalData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Correo 1:</Label>
                <div className="border-2 border-gray-300 p-2 min-h-[40px] bg-gray-50">
                  <Input
                    value={additionalData.email1}
                    onChange={(e) => handleInputChange('email1', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Correo 2:</Label>
                <div className="border-2 border-gray-300 p-2 min-h-[40px] bg-gray-50">
                  <Input
                    value={additionalData.email2}
                    onChange={(e) => handleInputChange('email2', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Servicio */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Servicio (Marcar con "X" la opción que desea seleccionar)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remuneraciones"
                    checked={additionalData.serviceType === 'remuneraciones'}
                    onCheckedChange={(checked) => 
                      handleInputChange('serviceType', checked ? 'remuneraciones' : '')
                    }
                  />
                  <Label htmlFor="remuneraciones" className="text-sm">Remuneraciones/CTS</Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="proveedores"
                    checked={additionalData.serviceType === 'proveedores'}
                    onCheckedChange={(checked) => 
                      handleInputChange('serviceType', checked ? 'proveedores' : '')
                    }
                  />
                  <Label htmlFor="proveedores" className="text-sm">Proveedores (1)</Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="pagos-varios"
                    checked={additionalData.serviceType === 'pagos-varios'}
                    onCheckedChange={(checked) => 
                      handleInputChange('serviceType', checked ? 'pagos-varios' : '')
                    }
                  />
                  <Label htmlFor="pagos-varios" className="text-sm">Pagos Varios (2)</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="nuevo"
                  checked={additionalData.operationType === 'nuevo'}
                  onCheckedChange={(checked) => 
                    handleInputChange('operationType', checked ? 'nuevo' : '')
                  }
                />
                <Label htmlFor="nuevo" className="text-sm">Nuevo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="modificacion"
                  checked={additionalData.operationType === 'modificacion'}
                  onCheckedChange={(checked) => 
                    handleInputChange('operationType', checked ? 'modificacion' : '')
                  }
                />
                <Label htmlFor="modificacion" className="text-sm">Modificación (Solo se completarán los campos a modificar)</Label>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1 mt-4">
              <p>(1) Incluye pagos a Persona Jurídica y Persona Natural con documento oficial de identidad, permite realizar pagos mediante abono en cuenta mismo banco, transferencias CCI/BCR y cheques de gerencia.</p>
              <p>(2) Incluye Persona Natural con documento oficial de identidad, permite realizar pagos en efectivo (Orden de Pago), cheques de gerencia y abono en cuenta)</p>
            </div>
          </div>

          {/* Cuenta de Cargo */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Cuenta de Cargo para el cobro de comisiones (Marcar con "X" la opción que desea seleccionar)</h3>
            
            <RadioGroup 
              value={additionalData.accountType} 
              onValueChange={(value) => handleInputChange('accountType', value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ahorro-soles" id="ahorro-soles" />
                <Label htmlFor="ahorro-soles" className="text-sm">Ahorro S/</Label>
                <span className="text-sm">Nro. de cuenta:</span>
                <div className="border-2 border-gray-300 p-1 min-h-[30px] bg-gray-50 w-48">
                  <Input
                    value={additionalData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="corriente-soles" id="corriente-soles" />
                <Label htmlFor="corriente-soles" className="text-sm">Corriente S/</Label>
                <span className="text-sm">Nro. de cuenta:</span>
                <div className="border-2 border-gray-300 p-1 min-h-[30px] bg-gray-50 w-48">
                  <Input
                    value={additionalData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ahorro-dolares" id="ahorro-dolares" />
                <Label htmlFor="ahorro-dolares" className="text-sm">Ahorro $</Label>
                <span className="text-sm">Nro. de Cuenta:</span>
                <div className="border-2 border-gray-300 p-1 min-h-[30px] bg-gray-50 w-48">
                  <Input
                    value={additionalData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="corriente-dolares" id="corriente-dolares" />
                <Label htmlFor="corriente-dolares" className="text-sm">Corriente $</Label>
                <span className="text-sm">Nro. de Cuenta:</span>
                <div className="border-2 border-gray-300 p-1 min-h-[30px] bg-gray-50 w-48">
                  <Input
                    value={additionalData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
            </RadioGroup>
            
            <p className="text-xs text-muted-foreground">Nota: Esta es la cuenta principal de cargo de comisiones.</p>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" size="lg" className="px-8">
              Generar Anexo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;

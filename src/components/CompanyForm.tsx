
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
    serviceType: [] as string[],
    operationType: "",
    accountType: "",
    accountNumber: "",
    currency: "",
    maxLoteAmountRemuneracionesSoles: "",
    maxLoteAmountRemuneracionesDolares: "",
    maxLoteAmountProveedoresSoles: "",
    maxLoteAmountProveedoresDolares: "",
    maxLoteAmountVariosSoles: "",
    maxLoteAmountVariosDolares: "",
    maxPaymentAmountRemuneracionesSoles: "",
    maxPaymentAmountRemuneracionesDolares: "",
    maxPaymentAmountProveedoresSoles: "",
    maxPaymentAmountProveedoresDolares: "",
    maxPaymentAmountVariosSoles: "",
    maxPaymentAmountVariosDolares: "",
    maxDaysProviders: "",
    maxDaysVarios: "",
    consolidateInvoicesProviders: "",
    consolidateInvoicesVarios: "",
    commissionDistributionSoles: "",
    commissionDistributionDollars: "",
    enterprisePercentageSoles: "",
    enterprisePercentageDollars: "",
    providerPercentageSoles: "",
    providerPercentageDollars: "",
    bankCode: "",
    receivingStore: "",
    representativeName: ""
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

  const handleServiceTypeChange = (service: string, checked: boolean) => {
    setAdditionalData(prev => ({
      ...prev,
      serviceType: checked 
        ? [...prev.serviceType, service]
        : prev.serviceType.filter(s => s !== service)
    }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-interbank-primary text-white">
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
              <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
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
              <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
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
                <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
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
                <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
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
                <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
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
                <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
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
                    checked={additionalData.serviceType.includes('remuneraciones')}
                    onCheckedChange={(checked) => 
                      handleServiceTypeChange('remuneraciones', checked as boolean)
                    }
                  />
                  <Label htmlFor="remuneraciones" className="text-sm">Remuneraciones/CTS</Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="proveedores"
                    checked={additionalData.serviceType.includes('proveedores')}
                    onCheckedChange={(checked) => 
                      handleServiceTypeChange('proveedores', checked as boolean)
                    }
                  />
                  <Label htmlFor="proveedores" className="text-sm">Proveedores (1)</Label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="pagos-varios"
                    checked={additionalData.serviceType.includes('pagos-varios')}
                    onCheckedChange={(checked) => 
                      handleServiceTypeChange('pagos-varios', checked as boolean)
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
                <Label htmlFor="modificacion" className="text-sm">Modificación ( ) Solo se completarán los campos a modificar</Label>
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
                <Label htmlFor="ahorro-soles" className="text-sm">Ahorro</Label>
                <div className="flex items-center space-x-2 ml-4">
                  <Checkbox />
                  <Label className="text-sm">Corriente S/</Label>
                </div>
                <span className="text-sm">Nro. de cuenta</span>
                <div className="border-2 border-gray-800 p-1 min-h-[30px] bg-gray-50 w-48">
                  <Input
                    value={additionalData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label className="text-sm">Ahorro</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Checkbox />
                  <Label className="text-sm">Corriente $</Label>
                </div>
                <span className="text-sm">Nro. de Cuenta</span>
                <div className="border-2 border-gray-800 p-1 min-h-[30px] bg-gray-50 w-48">
                  <Input
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
            </RadioGroup>
            
            <p className="text-xs text-muted-foreground">Nota: Esta es la cuenta principal de cargo de comisiones.</p>
          </div>

          {/* Controles Opcionales */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Controles Opcionales (Si no se requieren controles, colocar "Sin límites" o "SL", caso contrario se rechazará la solicitud)</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="border-2 border-gray-800 p-2 text-left bg-gray-50"></th>
                    <th className="border-2 border-gray-800 p-2 text-center bg-gray-50" colSpan={2}>Control de Monto Máximo por Lote</th>
                    <th className="border-2 border-gray-800 p-2 text-center bg-gray-50" colSpan={2}>Control de Monto Máximo por Pago</th>
                  </tr>
                  <tr>
                    <th className="border-2 border-gray-800 p-2 text-left bg-gray-50"></th>
                    <th className="border-2 border-gray-800 p-2 text-center bg-gray-50">S/</th>
                    <th className="border-2 border-gray-800 p-2 text-center bg-gray-50">$</th>
                    <th className="border-2 border-gray-800 p-2 text-center bg-gray-50">S/</th>
                    <th className="border-2 border-gray-800 p-2 text-center bg-gray-50">$</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Remuneraciones</td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxLoteAmountRemuneracionesSoles}
                        onChange={(e) => handleInputChange('maxLoteAmountRemuneracionesSoles', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxLoteAmountRemuneracionesDolares}
                        onChange={(e) => handleInputChange('maxLoteAmountRemuneracionesDolares', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxPaymentAmountRemuneracionesSoles}
                        onChange={(e) => handleInputChange('maxPaymentAmountRemuneracionesSoles', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxPaymentAmountRemuneracionesDolares}
                        onChange={(e) => handleInputChange('maxPaymentAmountRemuneracionesDolares', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Proveedores</td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxLoteAmountProveedoresSoles}
                        onChange={(e) => handleInputChange('maxLoteAmountProveedoresSoles', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxLoteAmountProveedoresDolares}
                        onChange={(e) => handleInputChange('maxLoteAmountProveedoresDolares', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxPaymentAmountProveedoresSoles}
                        onChange={(e) => handleInputChange('maxPaymentAmountProveedoresSoles', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxPaymentAmountProveedoresDolares}
                        onChange={(e) => handleInputChange('maxPaymentAmountProveedoresDolares', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Pagos Varios</td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxLoteAmountVariosSoles}
                        onChange={(e) => handleInputChange('maxLoteAmountVariosSoles', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxLoteAmountVariosDolares}
                        onChange={(e) => handleInputChange('maxLoteAmountVariosDolares', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxPaymentAmountVariosSoles}
                        onChange={(e) => handleInputChange('maxPaymentAmountVariosSoles', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-gray-800 p-0">
                      <Input
                        value={additionalData.maxPaymentAmountVariosDolares}
                        onChange={(e) => handleInputChange('maxPaymentAmountVariosDolares', e.target.value)}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sección adicional para Proveedores y Pagos Varios */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Completar solo en caso de elegir el servicio de Pago Proveedores y/o Pagos Varios</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Número de días máximo para el cobro de cheques y ordenes de pagos ( )</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm w-20">Proveedores</span>
                    <div className="border-2 border-gray-800 p-2 w-32 bg-gray-50">
                      <Input
                        value={additionalData.maxDaysProviders}
                        onChange={(e) => handleInputChange('maxDaysProviders', e.target.value)}
                        className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm w-20">Pagos Varios</span>
                    <div className="border-2 border-gray-800 p-2 w-32 bg-gray-50">
                      <Input
                        value={additionalData.maxDaysVarios}
                        onChange={(e) => handleInputChange('maxDaysVarios', e.target.value)}
                        className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs mt-2">( ) Tiempo Máximo 120 días. Culminado el plazo los cheques y órdenes de pago se revocan y se devuelven los fondos a la cuenta de cargo de la operación. En caso no indicar días, se configurará con el tiempo máximo.</p>
              </div>

              {/* Consolidar Facturas */}
              <div className="space-y-3">
                <Label className="text-sm">Opción de consolidar Facturas, Notas de Crédito, Notas de Débito en un solo abono o Cheque( )</Label>
                <p className="text-xs">(Marcar con "X" la opción que desea seleccionar)</p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm w-20">Proveedores</span>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={additionalData.consolidateInvoicesProviders === 'si'}
                        onCheckedChange={(checked) => 
                          handleInputChange('consolidateInvoicesProviders', checked ? 'si' : '')
                        }
                      />
                      <Label className="text-sm">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={additionalData.consolidateInvoicesProviders === 'no'}
                        onCheckedChange={(checked) => 
                          handleInputChange('consolidateInvoicesProviders', checked ? 'no' : '')
                        }
                      />
                      <Label className="text-sm">No</Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm w-20">Pagos Varios</span>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={additionalData.consolidateInvoicesVarios === 'si'}
                        onCheckedChange={(checked) => 
                          handleInputChange('consolidateInvoicesVarios', checked ? 'si' : '')
                        }
                      />
                      <Label className="text-sm">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={additionalData.consolidateInvoicesVarios === 'no'}
                        onCheckedChange={(checked) => 
                          handleInputChange('consolidateInvoicesVarios', checked ? 'no' : '')
                        }
                      />
                      <Label className="text-sm">No</Label>
                    </div>
                  </div>
                </div>
                <p className="text-xs">( ) En caso no marque una opción, se considera que no desea la opción de consolidar Facturas, Notas de Crédito, Notas de Débito en un solo abono o Cheque</p>
              </div>

              {/* Distribución Comisión */}
              <div className="space-y-3">
                <Label className="text-sm">Distribución Comisión Cheque Gerencia (Ordenante/Pagador) ( )</Label>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs max-w-md">
                    <thead>
                      <tr>
                        <th className="border-2 border-gray-800 p-2 text-left bg-gray-50"></th>
                        <th className="border-2 border-gray-800 p-2 text-center bg-gray-50">S/</th>
                        <th className="border-2 border-gray-800 p-2 text-center bg-gray-50">$</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Empresa</td>
                        <td className="border-2 border-gray-800 p-0">
                          <div className="flex items-center">
                            <Input
                              value={additionalData.enterprisePercentageSoles}
                              onChange={(e) => handleInputChange('enterprisePercentageSoles', e.target.value)}
                              className="border-0 bg-transparent rounded-none h-8 w-16"
                            />
                            <span className="px-1">%</span>
                          </div>
                        </td>
                        <td className="border-2 border-gray-800 p-0">
                          <div className="flex items-center">
                            <Input
                              value={additionalData.enterprisePercentageDollars}
                              onChange={(e) => handleInputChange('enterprisePercentageDollars', e.target.value)}
                              className="border-0 bg-transparent rounded-none h-8 w-16"
                            />
                            <span className="px-1">%</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-800 p-2 font-medium bg-gray-50">Proveedor</td>
                        <td className="border-2 border-gray-800 p-0">
                          <div className="flex items-center">
                            <Input
                              value={additionalData.providerPercentageSoles}
                              onChange={(e) => handleInputChange('providerPercentageSoles', e.target.value)}
                              className="border-0 bg-transparent rounded-none h-8 w-16"
                            />
                            <span className="px-1">%</span>
                          </div>
                        </td>
                        <td className="border-2 border-gray-800 p-0">
                          <div className="flex items-center">
                            <Input
                              value={additionalData.providerPercentageDollars}
                              onChange={(e) => handleInputChange('providerPercentageDollars', e.target.value)}
                              className="border-0 bg-transparent rounded-none h-8 w-16"
                            />
                            <span className="px-1">%</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs">( ) Al no elegir distribución de comisión será asumida en su totalidad por el Cliente</p>
              </div>
            </div>
          </div>

          {/* Información a completar por INTERBANK */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Información a completar por INTERBANK</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Código único:</Label>
                <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
                  <Input
                    value={additionalData.bankCode}
                    onChange={(e) => handleInputChange('bankCode', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Tienda Receptora:</Label>
                <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
                  <Input
                    value={additionalData.receivingStore}
                    onChange={(e) => handleInputChange('receivingStore', e.target.value)}
                    placeholder=""
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Información de la Empresa */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Información de la Empresa</h3>
            <div className="border-2 border-gray-800 p-4 min-h-[80px] bg-gray-50">
              {/* Campo vacío para llenar */}
            </div>
          </div>

          {/* Representante Legal */}
          <div className="space-y-4">
            <h3 className="font-medium text-base">Firma Representante Legal del Cliente</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nombres y Apellidos:</Label>
              <div className="border-2 border-gray-800 p-2 min-h-[40px] bg-gray-50">
                <Input
                  value={additionalData.representativeName}
                  onChange={(e) => handleInputChange('representativeName', e.target.value)}
                  placeholder=""
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" size="lg" className="px-8 bg-interbank-primary hover:bg-interbank-accent">
              Generar Anexo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;

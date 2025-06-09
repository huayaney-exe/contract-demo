import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

  const [serviceData, setServiceData] = useState({
    remuneraciones: false,
    proveedores: false,
    pagosVarios: false,
    nuevo: false,
    modificacion: false
  });

  const [accountData, setAccountData] = useState({
    ahorroSoles: false,
    corrienteSoles: false,
    ahorroUsd: false,
    corrienteUsd: false,
    accountNumberSoles: "",
    accountNumberUsd: ""
  });

  const [controlsData, setControlsData] = useState({
    remuneracionesLoteSoles: "",
    remuneracionesLoteUsd: "",
    remuneracionesPagoSoles: "",
    remuneracionesPagoUsd: "",
    proveedoresLoteSoles: "",
    proveedoresLoteUsd: "",
    proveedoresPagoSoles: "",
    proveedoresPagoUsd: "",
    variosLoteSoles: "",
    variosLoteUsd: "",
    variosPagoSoles: "",
    variosPagoUsd: ""
  });

  const [additionalData, setAdditionalData] = useState({
    maxDaysProviders: "",
    maxDaysVarios: "",
    consolidateProveedoresSi: false,
    consolidateProveedoresNo: false,
    consolidateVariosSi: false,
    consolidateVariosNo: false,
    empresaSoles: "",
    empresaUsd: "",
    proveedorSoles: "",
    proveedorUsd: ""
  });

  const [contactData, setContactData] = useState({
    contactName: "",
    contactPhone: "",
    email1: "",
    email2: ""
  });

  const [errors, setErrors] = useState<Partial<CompanyData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CompanyData> = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Razón Social es requerida";
    if (!formData.ruc.trim()) newErrors.ruc = "RUC/DNI es requerido";
    if (!contactData.contactName.trim()) newErrors.legalRepresentative = "Nombre de contacto es requerido";
    if (!contactData.contactPhone.trim()) newErrors.phone = "Teléfono de contacto es requerido";
    if (!contactData.email1.trim()) newErrors.email = "Al menos un correo es requerido";

    if (formData.ruc && !/^\d{8,11}$/.test(formData.ruc)) {
      newErrors.ruc = "RUC debe tener 11 dígitos o DNI 8 dígitos";
    }

    if (contactData.email1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email1)) {
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
        contactName: contactData.contactName,
        contactPhone: contactData.contactPhone,
        contactEmail1: contactData.email1,
        contactEmail2: contactData.email2,
        legalRepresentative: contactData.contactName,
        phone: contactData.contactPhone,
        email: contactData.email1
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

  const handleInputChange = (field: string, value: string, section: string) => {
    switch (section) {
      case 'formData':
        setFormData(prev => ({ ...prev, [field]: value }));
        break;
      case 'contactData':
        setContactData(prev => ({ ...prev, [field]: value }));
        break;
      case 'controlsData':
        setControlsData(prev => ({ ...prev, [field]: value }));
        break;
      case 'additionalData':
        setAdditionalData(prev => ({ ...prev, [field]: value }));
        break;
      case 'accountData':
        setAccountData(prev => ({ ...prev, [field]: value }));
        break;
    }
    
    if (errors[field as keyof CompanyData]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setServiceData(prev => ({ ...prev, [service]: checked }));
  };

  const handleAccountChange = (account: string, checked: boolean) => {
    setAccountData(prev => ({ ...prev, [account]: checked }));
  };

  const handleConsolidateChange = (field: string, checked: boolean) => {
    setAdditionalData(prev => ({ ...prev, [field]: checked }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-interbank-primary text-white">
        <CardTitle className="text-2xl text-center">Anexo Pagos Masivos</CardTitle>
        <p className="text-sm opacity-90 text-center">
          Si desea afiliarse a los servicios de Pago de Remuneraciones y CTS, Pago a Proveedores y/o Pagos Varios, por favor complete este anexo.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Información de la Empresa */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-interbank-primary">Información de la Empresa</h3>
            
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Razón Social / Nombre del Cliente:</Label>
                <div className="border-2 border-black mt-1">
                  <Input
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value, 'formData')}
                    className="border-0 rounded-none h-10 focus-visible:ring-0"
                  />
                </div>
                {errors.companyName && (
                  <p className="text-sm text-destructive">{errors.companyName}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium">RUC / DNI:</Label>
                <div className="border-2 border-black mt-1">
                  <Input
                    value={formData.ruc}
                    onChange={(e) => handleInputChange('ruc', e.target.value, 'formData')}
                    className="border-0 rounded-none h-10 focus-visible:ring-0"
                  />
                </div>
                {errors.ruc && (
                  <p className="text-sm text-destructive">{errors.ruc}</p>
                )}
              </div>
            </div>
          </div>

          {/* Persona de Contacto */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-interbank-primary">Persona de Contacto <span className="text-xs font-normal">(En caso se requieran coordinaciones por correcciones en el formato)</span></h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Nombre Contacto:</Label>
                <div className="border-2 border-black mt-1">
                  <Input
                    value={contactData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value, 'contactData')}
                    className="border-0 rounded-none h-10 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Teléfono:</Label>
                <div className="border-2 border-black mt-1">
                  <Input
                    value={contactData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value, 'contactData')}
                    className="border-0 rounded-none h-10 focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Correo 1:</Label>
                <div className="border-2 border-black mt-1">
                  <Input
                    value={contactData.email1}
                    onChange={(e) => handleInputChange('email1', e.target.value, 'contactData')}
                    className="border-0 rounded-none h-10 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Correo 2:</Label>
                <div className="border-2 border-black mt-1">
                  <Input
                    value={contactData.email2}
                    onChange={(e) => handleInputChange('email2', e.target.value, 'contactData')}
                    className="border-0 rounded-none h-10 focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Servicio */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-interbank-primary">Servicio <span className="text-xs font-normal">(Marcar con "X" la opción que desea seleccionar)</span></h3>
            
            <div className="grid grid-cols-3 gap-8">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remuneraciones"
                  checked={serviceData.remuneraciones}
                  onCheckedChange={(checked) => 
                    handleServiceChange('remuneraciones', checked as boolean)
                  }
                />
                <Label htmlFor="remuneraciones" className="text-sm">Remuneraciones/CTS</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="proveedores"
                  checked={serviceData.proveedores}
                  onCheckedChange={(checked) => 
                    handleServiceChange('proveedores', checked as boolean)
                  }
                />
                <Label htmlFor="proveedores" className="text-sm">Proveedores (1)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pagos-varios"
                  checked={serviceData.pagosVarios}
                  onCheckedChange={(checked) => 
                    handleServiceChange('pagosVarios', checked as boolean)
                  }
                />
                <Label htmlFor="pagos-varios" className="text-sm">Pagos Varios (2)</Label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="nuevo"
                  checked={serviceData.nuevo}
                  onCheckedChange={(checked) => 
                    handleServiceChange('nuevo', checked as boolean)
                  }
                />
                <Label htmlFor="nuevo" className="text-sm">Nuevo</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="modificacion"
                  checked={serviceData.modificacion}
                  onCheckedChange={(checked) => 
                    handleServiceChange('modificacion', checked as boolean)
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
            <h3 className="font-bold text-base text-interbank-primary">Cuenta de Cargo para el cobro de comisiones <span className="text-xs font-normal">(Marcar con "X" la opción que desea seleccionar)</span></h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={accountData.ahorroSoles}
                    onCheckedChange={(checked) => 
                      handleAccountChange('ahorroSoles', checked as boolean)
                    }
                  />
                  <Label className="text-sm">Ahorro</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={accountData.corrienteSoles}
                    onCheckedChange={(checked) => 
                      handleAccountChange('corrienteSoles', checked as boolean)
                    }
                  />
                  <Label className="text-sm">Corriente</Label>
                </div>
                <span className="text-sm">S/</span>
                <span className="text-sm">Nro. de cuenta</span>
                <div className="border-2 border-black w-48">
                  <Input
                    value={accountData.accountNumberSoles}
                    onChange={(e) => handleInputChange('accountNumberSoles', e.target.value, 'accountData')}
                    className="border-0 rounded-none h-8 focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={accountData.ahorroUsd}
                    onCheckedChange={(checked) => 
                      handleAccountChange('ahorroUsd', checked as boolean)
                    }
                  />
                  <Label className="text-sm">Ahorro</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={accountData.corrienteUsd}
                    onCheckedChange={(checked) => 
                      handleAccountChange('corrienteUsd', checked as boolean)
                    }
                  />
                  <Label className="text-sm">Corriente</Label>
                </div>
                <span className="text-sm">$</span>
                <span className="text-sm">Nro. de Cuenta</span>
                <div className="border-2 border-black w-48">
                  <Input
                    value={accountData.accountNumberUsd}
                    onChange={(e) => handleInputChange('accountNumberUsd', e.target.value, 'accountData')}
                    className="border-0 rounded-none h-8 focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">Nota: Esta es la cuenta principal de cargo de comisiones.</p>
          </div>

          {/* Controles Opcionales */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-interbank-primary">Controles Opcionales <span className="text-xs font-normal">(Si no se requieren controles, colocar "Sin límites" o "SL", caso contrario se rechazará la solicitud)</span></h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="border-2 border-black p-2 text-left bg-gray-50"></th>
                    <th className="border-2 border-black p-2 text-center bg-gray-50" colSpan={2}>Control de Monto Máximo por Lote</th>
                    <th className="border-2 border-black p-2 text-center bg-gray-50" colSpan={2}>Control de Monto Máximo por Pago</th>
                  </tr>
                  <tr>
                    <th className="border-2 border-black p-2 text-left bg-gray-50"></th>
                    <th className="border-2 border-black p-2 text-center bg-gray-50">S/</th>
                    <th className="border-2 border-black p-2 text-center bg-gray-50">$</th>
                    <th className="border-2 border-black p-2 text-center bg-gray-50">S/</th>
                    <th className="border-2 border-black p-2 text-center bg-gray-50">$</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-black p-2 font-medium bg-gray-50">Remuneraciones</td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.remuneracionesLoteSoles}
                        onChange={(e) => handleInputChange('remuneracionesLoteSoles', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.remuneracionesLoteUsd}
                        onChange={(e) => handleInputChange('remuneracionesLoteUsd', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.remuneracionesPagoSoles}
                        onChange={(e) => handleInputChange('remuneracionesPagoSoles', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.remuneracionesPagoUsd}
                        onChange={(e) => handleInputChange('remuneracionesPagoUsd', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 font-medium bg-gray-50">Proveedores</td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.proveedoresLoteSoles}
                        onChange={(e) => handleInputChange('proveedoresLoteSoles', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.proveedoresLoteUsd}
                        onChange={(e) => handleInputChange('proveedoresLoteUsd', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.proveedoresPagoSoles}
                        onChange={(e) => handleInputChange('proveedoresPagoSoles', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.proveedoresPagoUsd}
                        onChange={(e) => handleInputChange('proveedoresPagoUsd', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black p-2 font-medium bg-gray-50">Pagos Varios</td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.variosLoteSoles}
                        onChange={(e) => handleInputChange('variosLoteSoles', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.variosLoteUsd}
                        onChange={(e) => handleInputChange('variosLoteUsd', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.variosPagoSoles}
                        onChange={(e) => handleInputChange('variosPagoSoles', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                    <td className="border-2 border-black p-0">
                      <Input
                        value={controlsData.variosPagoUsd}
                        onChange={(e) => handleInputChange('variosPagoUsd', e.target.value, 'controlsData')}
                        className="border-0 bg-transparent rounded-none h-8"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Completar solo en caso de elegir el servicio de Pago Proveedores y/o Pagos Varios */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-interbank-primary">Completar solo en caso de elegir el servicio de Pago Proveedores y/o Pagos Varios</h3>
            
            {/* Número de días máximo */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Número de días máximo para el cobro de cheques y ordenes de pagos ( )</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-sm w-20">Proveedores</span>
                  <div className="border-2 border-black w-32">
                    <Input
                      value={additionalData.maxDaysProviders}
                      onChange={(e) => handleInputChange('maxDaysProviders', e.target.value, 'additionalData')}
                      className="border-0 rounded-none h-8 focus-visible:ring-0 text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm w-20">Pagos Varios</span>
                  <div className="border-2 border-black w-32">
                    <Input
                      value={additionalData.maxDaysVarios}
                      onChange={(e) => handleInputChange('maxDaysVarios', e.target.value, 'additionalData')}
                      className="border-0 rounded-none h-8 focus-visible:ring-0 text-sm"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">( ) Tiempo Máximo 120 días. Culminado el plazo los cheques y órdenes de pago se revocan y se devuelven los fondos a la cuenta de cargo de la operación. En caso no indicar días, se configurará con el tiempo máximo.</p>
            </div>

            {/* Opción de consolidar Facturas */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Opción de consolidar Facturas, Notas de Crédito, Notas de Débito en un solo abono o Cheque( )</Label>
              <p className="text-xs text-muted-foreground">(Marcar con "X" la opción que desea seleccionar)</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-8">
                  <span className="text-sm w-20">Proveedores</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={additionalData.consolidateProveedoresSi}
                        onCheckedChange={(checked) => 
                          handleConsolidateChange('consolidateProveedoresSi', checked as boolean)
                        }
                      />
                      <Label className="text-sm">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={additionalData.consolidateProveedoresNo}
                        onCheckedChange={(checked) => 
                          handleConsolidateChange('consolidateProveedoresNo', checked as boolean)
                        }
                      />
                      <Label className="text-sm">No</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <span className="text-sm w-20">Pagos Varios</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={additionalData.consolidateVariosSi}
                        onCheckedChange={(checked) => 
                          handleConsolidateChange('consolidateVariosSi', checked as boolean)
                        }
                      />
                      <Label className="text-sm">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={additionalData.consolidateVariosNo}
                        onCheckedChange={(checked) => 
                          handleConsolidateChange('consolidateVariosNo', checked as boolean)
                        }
                      />
                      <Label className="text-sm">No</Label>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">( ) En caso no marque una opción, se considera que no desea la opción de consolidar Facturas, Notas de Crédito, Notas de Débito en un solo abono o Cheque</p>
            </div>

            {/* Distribución Comisión Cheque Gerencia */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Distribución Comisión Cheque Gerencia (Ordenante/Pagador) ( )</Label>
              
              <div className="overflow-x-auto">
                <table className="border-collapse text-xs max-w-md">
                  <thead>
                    <tr>
                      <th className="border-2 border-black p-2 text-left bg-gray-50"></th>
                      <th className="border-2 border-black p-2 text-center bg-gray-50">S/</th>
                      <th className="border-2 border-black p-2 text-center bg-gray-50">$</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 border-black p-2 font-medium bg-gray-50">Empresa</td>
                      <td className="border-2 border-black p-0">
                        <div className="flex items-center">
                          <Input
                            value={additionalData.empresaSoles}
                            onChange={(e) => handleInputChange('empresaSoles', e.target.value, 'additionalData')}
                            className="border-0 bg-transparent rounded-none h-8 w-16"
                          />
                          <span className="px-1">%</span>
                        </div>
                      </td>
                      <td className="border-2 border-black p-0">
                        <div className="flex items-center">
                          <Input
                            value={additionalData.empresaUsd}
                            onChange={(e) => handleInputChange('empresaUsd', e.target.value, 'additionalData')}
                            className="border-0 bg-transparent rounded-none h-8 w-16"
                          />
                          <span className="px-1">%</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-black p-2 font-medium bg-gray-50">Proveedor</td>
                      <td className="border-2 border-black p-0">
                        <div className="flex items-center">
                          <Input
                            value={additionalData.proveedorSoles}
                            onChange={(e) => handleInputChange('proveedorSoles', e.target.value, 'additionalData')}
                            className="border-0 bg-transparent rounded-none h-8 w-16"
                          />
                          <span className="px-1">%</span>
                        </div>
                      </td>
                      <td className="border-2 border-black p-0">
                        <div className="flex items-center">
                          <Input
                            value={additionalData.proveedorUsd}
                            onChange={(e) => handleInputChange('proveedorUsd', e.target.value, 'additionalData')}
                            className="border-0 bg-transparent rounded-none h-8 w-16"
                          />
                          <span className="px-1">%</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">( ) Al no elegir distribución de comisión será asumida en su totalidad por el Cliente</p>
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


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CompanyData } from "@/pages/Index";

interface CompanyFormProps {
  onSubmit: (data: CompanyData) => void;
}

const peruDepartments = [
  "Lima", "Arequipa", "Cusco", "La Libertad", "Piura", "Lambayeque",
  "Junín", "Cajamarca", "Puno", "Ica", "Ancash", "Huánuco", "Ayacucho",
  "Loreto", "San Martín", "Ucayali", "Apurímac", "Amazonas", "Tumbes",
  "Tacna", "Moquegua", "Pasco", "Huancavelica", "Madre de Dios"
];

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

  const [errors, setErrors] = useState<Partial<CompanyData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CompanyData> = {};

    // Validar campos requeridos
    if (!formData.companyName.trim()) newErrors.companyName = "Razón social es requerida";
    if (!formData.ruc.trim()) newErrors.ruc = "RUC es requerido";
    if (!formData.legalRepresentative.trim()) newErrors.legalRepresentative = "Representante legal es requerido";
    if (!formData.dni.trim()) newErrors.dni = "DNI es requerido";
    if (!formData.address.trim()) newErrors.address = "Dirección es requerida";
    if (!formData.district.trim()) newErrors.district = "Distrito es requerido";
    if (!formData.province.trim()) newErrors.province = "Provincia es requerida";
    if (!formData.department.trim()) newErrors.department = "Departamento es requerido";
    if (!formData.phone.trim()) newErrors.phone = "Teléfono es requerido";
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    if (!formData.businessActivity.trim()) newErrors.businessActivity = "Actividad comercial es requerida";

    // Validar formato RUC (11 dígitos)
    if (formData.ruc && !/^\d{11}$/.test(formData.ruc)) {
      newErrors.ruc = "RUC debe tener 11 dígitos";
    }

    // Validar formato DNI (8 dígitos)
    if (formData.dni && !/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = "DNI debe tener 8 dígitos";
    }

    // Validar email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email no válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Formulario completado",
        description: "Datos validados correctamente. Generando contrato...",
      });
      onSubmit(formData);
    } else {
      toast({
        title: "Errores en el formulario",
        description: "Por favor, corrija los errores antes de continuar.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-2xl">Datos de la Empresa</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información de la Empresa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Razón Social *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Ej: EMPRESA EJEMPLO S.A.C."
                className={errors.companyName ? "border-destructive" : ""}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ruc">RUC *</Label>
              <Input
                id="ruc"
                value={formData.ruc}
                onChange={(e) => handleInputChange('ruc', e.target.value)}
                placeholder="12345678901"
                maxLength={11}
                className={errors.ruc ? "border-destructive" : ""}
              />
              {errors.ruc && (
                <p className="text-sm text-destructive">{errors.ruc}</p>
              )}
            </div>
          </div>

          {/* Representante Legal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="legalRepresentative">Representante Legal *</Label>
              <Input
                id="legalRepresentative"
                value={formData.legalRepresentative}
                onChange={(e) => handleInputChange('legalRepresentative', e.target.value)}
                placeholder="Nombres y Apellidos"
                className={errors.legalRepresentative ? "border-destructive" : ""}
              />
              {errors.legalRepresentative && (
                <p className="text-sm text-destructive">{errors.legalRepresentative}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni">DNI del Representante *</Label>
              <Input
                id="dni"
                value={formData.dni}
                onChange={(e) => handleInputChange('dni', e.target.value)}
                placeholder="12345678"
                maxLength={8}
                className={errors.dni ? "border-destructive" : ""}
              />
              {errors.dni && (
                <p className="text-sm text-destructive">{errors.dni}</p>
              )}
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Av. Principal 123, Urbanización Ejemplo"
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="district">Distrito *</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  placeholder="Miraflores"
                  className={errors.district ? "border-destructive" : ""}
                />
                {errors.district && (
                  <p className="text-sm text-destructive">{errors.district}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Provincia *</Label>
                <Input
                  id="province"
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  placeholder="Lima"
                  className={errors.province ? "border-destructive" : ""}
                />
                {errors.province && (
                  <p className="text-sm text-destructive">{errors.province}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Departamento *</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleInputChange('department', value)}
                >
                  <SelectTrigger className={errors.department ? "border-destructive" : ""}>
                    <SelectValue placeholder="Seleccione departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {peruDepartments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-destructive">{errors.department}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+51 999 999 999"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contacto@empresa.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Actividad Comercial */}
          <div className="space-y-2">
            <Label htmlFor="businessActivity">Actividad Comercial *</Label>
            <Textarea
              id="businessActivity"
              value={formData.businessActivity}
              onChange={(e) => handleInputChange('businessActivity', e.target.value)}
              placeholder="Descripción detallada de la actividad comercial de la empresa"
              rows={3}
              className={errors.businessActivity ? "border-destructive" : ""}
            />
            {errors.businessActivity && (
              <p className="text-sm text-destructive">{errors.businessActivity}</p>
            )}
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" size="lg" className="px-8">
              Generar Contrato
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;

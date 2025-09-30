import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Phone, Mail, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useWizardValidation } from "@/hooks/useWizardValidation";

interface ContactInfoStepProps {
  contactName: string;
  contactPhone: string;
  contactEmail1: string;
  contactEmail2?: string;
  onContactNameChange: (value: string) => void;
  onContactPhoneChange: (value: string) => void;
  onContactEmail1Change: (value: string) => void;
  onContactEmail2Change: (value: string) => void;
}

const ContactInfoStep = ({
  contactName,
  contactPhone,
  contactEmail1,
  contactEmail2,
  onContactNameChange,
  onContactPhoneChange,
  onContactEmail1Change,
  onContactEmail2Change
}: ContactInfoStepProps) => {
  const { validateEmail, validatePhone } = useWizardValidation();
  const [validations, setValidations] = useState({
    email1: { isValid: false, error: '', suggestion: '' },
    email2: { isValid: false, error: '', suggestion: '' },
    phone: { isValid: false, error: '', suggestion: '' }
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email1: false,
    email2: false
  });

  useEffect(() => {
    if (contactEmail1 && touched.email1) {
      const validation = validateEmail(contactEmail1);
      setValidations(prev => ({ ...prev, email1: validation }));
    }
  }, [contactEmail1, validateEmail, touched.email1]);

  useEffect(() => {
    if (contactEmail2 && touched.email2) {
      const validation = validateEmail(contactEmail2);
      setValidations(prev => ({ ...prev, email2: validation }));
    }
  }, [contactEmail2, validateEmail, touched.email2]);

  useEffect(() => {
    if (contactPhone && touched.phone) {
      const validation = validatePhone(contactPhone);
      setValidations(prev => ({ ...prev, phone: validation }));
    }
  }, [contactPhone, validatePhone, touched.phone]);

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-interbank-light rounded-full mb-4">
          <User className="w-12 h-12 text-interbank-primary" />
        </div>
        <h2 className="text-2xl font-bold text-interbank-primary mb-2">
          ¿Cómo te contactamos?
        </h2>
        <p className="text-muted-foreground">
          Persona de contacto para coordinaciones y correcciones
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Contact Name */}
        <div className="space-y-2">
          <Label className="text-base font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            Nombre del Contacto
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={contactName}
              onChange={(e) => onContactNameChange(e.target.value)}
              onBlur={() => setTouched({ ...touched, name: true })}
              placeholder="Ej: María García López"
              className={`text-base h-12 ${
                touched.name && !contactName.trim()
                  ? 'border-destructive focus-visible:ring-destructive'
                  : contactName.trim()
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : ''
              }`}
            />
            {contactName.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
          {touched.name && !contactName.trim() && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              El nombre de contacto es requerido
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="text-base font-medium flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Teléfono de Contacto
          </Label>
          <div className="relative">
            <Input
              type="tel"
              value={contactPhone}
              onChange={(e) => onContactPhoneChange(e.target.value)}
              onBlur={() => setTouched({ ...touched, phone: true })}
              placeholder="Ej: 987654321 o (01) 1234567"
              className={`text-base h-12 ${
                touched.phone && validations.phone.error
                  ? 'border-destructive focus-visible:ring-destructive'
                  : validations.phone.isValid
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : ''
              }`}
            />
            {touched.phone && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {validations.phone.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : validations.phone.error ? (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                ) : null}
              </div>
            )}
          </div>
          {touched.phone && validations.phone.error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validations.phone.error}
            </p>
          )}
          {validations.phone.isValid && validations.phone.suggestion && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {validations.phone.suggestion}
            </p>
          )}
        </div>

        {/* Email 1 (Required) */}
        <div className="space-y-2">
          <Label className="text-base font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Correo Electrónico Principal
          </Label>
          <div className="relative">
            <Input
              type="email"
              value={contactEmail1}
              onChange={(e) => onContactEmail1Change(e.target.value)}
              onBlur={() => setTouched({ ...touched, email1: true })}
              placeholder="Ej: maria.garcia@empresa.com"
              className={`text-base h-12 ${
                touched.email1 && validations.email1.error
                  ? 'border-destructive focus-visible:ring-destructive'
                  : validations.email1.isValid
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : ''
              }`}
            />
            {touched.email1 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {validations.email1.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : validations.email1.error ? (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                ) : null}
              </div>
            )}
          </div>
          {touched.email1 && validations.email1.error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validations.email1.error}
            </p>
          )}
          {validations.email1.isValid && validations.email1.suggestion && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {validations.email1.suggestion}
            </p>
          )}
        </div>

        {/* Email 2 (Optional) */}
        <div className="space-y-2">
          <Label className="text-base font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Correo Electrónico Secundario
            <span className="text-xs text-muted-foreground font-normal">(Opcional)</span>
          </Label>
          <div className="relative">
            <Input
              type="email"
              value={contactEmail2 || ''}
              onChange={(e) => onContactEmail2Change(e.target.value)}
              onBlur={() => setTouched({ ...touched, email2: true })}
              placeholder="Ej: contacto2@empresa.com"
              className={`text-base h-12 ${
                touched.email2 && contactEmail2 && validations.email2.error
                  ? 'border-destructive focus-visible:ring-destructive'
                  : touched.email2 && contactEmail2 && validations.email2.isValid
                  ? 'border-green-500 focus-visible:ring-green-500'
                  : ''
              }`}
            />
            {touched.email2 && contactEmail2 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {validations.email2.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : validations.email2.error ? (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                ) : null}
              </div>
            )}
          </div>
          {touched.email2 && contactEmail2 && validations.email2.error && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validations.email2.error}
            </p>
          )}
          {contactEmail2 && validations.email2.isValid && validations.email2.suggestion && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {validations.email2.suggestion}
            </p>
          )}
        </div>

        {/* Helper Card */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">📧 ¿Para qué usamos esta información?</p>
              <ul className="space-y-1 text-xs">
                <li>• <strong>Coordinaciones:</strong> Para comunicarnos sobre el estado de tu solicitud</li>
                <li>• <strong>Correcciones:</strong> Si necesitamos ajustar algo en el formato enviado</li>
                <li>• <strong>Notificaciones:</strong> Actualizaciones importantes sobre tus servicios</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStep;
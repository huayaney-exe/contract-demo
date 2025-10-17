import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RecaudacionWizardContainer } from "@/components/recaudacion/RecaudacionWizardContainer";
import { RecaudacionFormData } from "@/types/recaudacion";
import { toast } from "sonner";

const Recaudacion = () => {
  const navigate = useNavigate();
  const [showWizard, setShowWizard] = useState(true);

  const handleComplete = (data: RecaudacionFormData) => {
    console.log("Recaudación data:", data);
    toast.success("Formulario completado exitosamente");
    // TODO: Generate PDF with recaudacion data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-interbank-light to-white py-12">
      <div className="container-custom max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-interbank-light"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-interbank-secondary-blue">
              Servicio de Recaudación
            </h1>
            <p className="text-sm text-muted-foreground">
              Anexo N° 2 – Servicio de Recaudación (Interconexión)
            </p>
          </div>
        </div>

        <Card className="p-8 animate-slide-in">
          {showWizard && <RecaudacionWizardContainer onComplete={handleComplete} />}
        </Card>
      </div>
    </div>
  );
};

export default Recaudacion;

import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, DollarSign } from "lucide-react";

const FlowSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-interbank-light to-white py-12">
      <div className="container-custom max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="gradient-text text-4xl md:text-5xl font-bold mb-6">
            Servicios Empresariales
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Selecciona el servicio que deseas configurar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pagos Masivos Card */}
          <Card className="p-8 card-hover cursor-pointer animate-slide-in hover:border-interbank-primary transition-all"
                onClick={() => navigate('/pagos-masivos')}>
            <div className="text-center space-y-6">
              <div className="inline-block p-6 bg-interbank-primary-green-bg rounded-full">
                <DollarSign className="w-16 h-16 text-interbank-primary-green" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-interbank-primary-green mb-3">
                  Pagos Masivos
                </h2>
                <p className="text-muted-foreground mb-6">
                  Servicio para realizar pagos masivos de remuneraciones, proveedores y pagos varios
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-interbank-primary-green"></div>
                  <span>Pago de Remuneraciones y CTS</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-interbank-primary-green"></div>
                  <span>Pago a Proveedores</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-interbank-primary-green"></div>
                  <span>Pagos Varios</span>
                </div>
              </div>

              <Button 
                className="w-full bg-interbank-primary-green hover:bg-interbank-primary-green-light"
                size="lg"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Recaudación Card */}
          <Card className="p-8 card-hover cursor-pointer animate-slide-in hover:border-interbank-secondary-blue transition-all"
                onClick={() => navigate('/recaudacion')}>
            <div className="text-center space-y-6">
              <div className="inline-block p-6 bg-interbank-secondary-blue-pale rounded-full">
                <Users className="w-16 h-16 text-interbank-secondary-blue" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-interbank-secondary-blue mb-3">
                  Recaudación
                </h2>
                <p className="text-muted-foreground mb-6">
                  Servicio de recaudación para cobros y gestión de pagos de clientes
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-interbank-secondary-blue"></div>
                  <span>Interconexión bancaria</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-interbank-secondary-blue"></div>
                  <span>Múltiples canales de cobro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-interbank-secondary-blue"></div>
                  <span>Gestión de comisiones</span>
                </div>
              </div>

              <Button 
                className="w-full bg-interbank-secondary-blue hover:bg-interbank-secondary-blue-dark"
                size="lg"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-2xl">ℹ️</div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-2">¿Necesitas ayuda para elegir?</p>
                <p className="text-xs">
                  <strong>Pagos Masivos:</strong> Ideal para empresas que necesitan realizar pagos recurrentes a empleados, proveedores o terceros.
                  <br />
                  <strong>Recaudación:</strong> Perfecto para negocios que necesitan cobrar pagos de clientes a través de múltiples canales.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlowSelection;

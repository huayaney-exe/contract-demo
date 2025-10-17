import { useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

const PasswordProtection = ({ onAuthenticated }: PasswordProtectionProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (password === "cash") {
        // Store authentication in sessionStorage
        sessionStorage.setItem("authenticated", "true");
        onAuthenticated();
      } else {
        setError(true);
        setPassword("");
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-interbank-light to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-interbank-primary-green-bg mb-4">
            <Lock className="w-8 h-8 text-interbank-primary-green" />
          </div>
          <h1 className="text-2xl font-bold text-interbank-primary-green mb-2">
            Acceso Restringido
          </h1>
          <p className="text-muted-foreground">
            Ingrese la contraseña para acceder a los servicios empresariales
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Ingrese la contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="animate-slide-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Contraseña incorrecta. Por favor, intente nuevamente.
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-interbank-primary-green hover:bg-interbank-primary-green-light"
            disabled={isLoading || !password}
          >
            {isLoading ? "Verificando..." : "Ingresar"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            Sistema de Contratos Empresariales Interbank
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PasswordProtection;

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader className="bg-destructive text-white">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Error en la Aplicación
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Mensaje de Error:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </div>
              
              {this.state.errorInfo && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Stack Trace:</h3>
                  <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-interbank-primary hover:bg-interbank-accent"
                >
                  Recargar Aplicación
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                >
                  Intentar Recuperar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

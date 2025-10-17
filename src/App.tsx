import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlowSelection from "./pages/FlowSelection";
import Index from "./pages/Index";
import Recaudacion from "./pages/Recaudacion";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import PasswordProtection from "./components/PasswordProtection";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated (from sessionStorage)
  useEffect(() => {
    const authenticated = sessionStorage.getItem("authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // If not authenticated, show password protection
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  }

  // If authenticated, show the normal app
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FlowSelection />} />
              <Route path="/pagos-masivos" element={<Index />} />
              <Route path="/recaudacion" element={<Recaudacion />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

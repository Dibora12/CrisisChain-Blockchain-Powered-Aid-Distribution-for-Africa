
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Identity from "./pages/Identity";
import Distribution from "./pages/Distribution";
import Verification from "./pages/Verification";
<<<<<<< HEAD
import GetStarted from "./pages/GetStarted";
=======
>>>>>>> 336e55f82ca4324f1eed472f015a41b49b20b461
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
<<<<<<< HEAD
              <Route path="/" element={<GetStarted />} />
              <Route path="/auth" element={<Auth />} />
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Index />} />
=======
              <Route path="/auth" element={<Auth />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
>>>>>>> 336e55f82ca4324f1eed472f015a41b49b20b461
                <Route path="/identity" element={<Identity />} />
                <Route path="/distribution" element={<Distribution />} />
                <Route path="/verification" element={<Verification />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

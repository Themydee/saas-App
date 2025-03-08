
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
// import NotFound from "./pages/NotFound";
import Farmer from "./pages/Farmer";
import Transporter from "./pages/Transporter";
import Profile from "./pages/Profile";
import Warehouse from "./pages/Warehouse";
import Consumer from "./pages/Consumer";
import Home from "./pages/Home"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/transporter" element={<Transporter /> } />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/consumer" element={<Consumer />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

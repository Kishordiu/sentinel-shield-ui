import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Landing from "@/pages/Landing";
import About from "@/pages/About";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import DeviceList from "@/pages/DeviceList";
import DeviceDetail from "@/pages/DeviceDetail";
import OnboardingQueue from "@/pages/OnboardingQueue";
import AdminConsole from "@/pages/AdminConsole";
import Settings from "@/pages/Settings";
import Alerts from "@/pages/Alerts";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/devices" element={<ProtectedRoute><DeviceList /></ProtectedRoute>} />
              <Route path="/devices/:id" element={<ProtectedRoute><DeviceDetail /></ProtectedRoute>} />
              <Route path="/onboarding" element={<ProtectedRoute><OnboardingQueue /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminConsole /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

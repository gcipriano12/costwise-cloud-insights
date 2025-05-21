
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import VirtualTags from "./pages/VirtualTags";
import Dashboards from "./pages/Dashboards";
import Budgets from "./pages/Budgets";
import FinancialPlans from "./pages/FinancialPlans";
import Resources from "./pages/Resources";
import DataExplorer from "./pages/DataExplorer";
import CostGuard from "./pages/CostGuard";
import MyCommitments from "./pages/MyCommitments";
import CommitmentsLog from "./pages/CommitmentsLog";
import Anomalies from "./pages/Anomalies";
import Reports from "./pages/Reports";
import Governance from "./pages/Governance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="X-Cost-theme">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/virtual-tags" element={<VirtualTags />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/financial-plans" element={<FinancialPlans />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/data-explorer" element={<DataExplorer />} />
          <Route path="/costguard" element={<CostGuard />} />
          <Route path="/my-commitments" element={<MyCommitments />} />
          <Route path="/commitments-log" element={<CommitmentsLog />} />
          <Route path="/anomalies" element={<Anomalies />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Index from "./pages/Index";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Partners from "./pages/Partners";
import PartnerDetail from "./pages/PartnerDetail";
import Wallet from "./pages/Wallet";
import Notifications from "./pages/Notifications";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import SecondReceipt from "./pages/SecondReceipt";
import BillDiscount from "./pages/BillDiscount";
import Contact from "./pages/Contact";
import Regulations from "./pages/Regulations";
import Menu from "./pages/Menu";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/partner/:partnerId" element={<PartnerDetail />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/order/:orderId" element={<OrderDetail />} />
            <Route path="/second-receipt" element={<SecondReceipt />} />
            <Route path="/bill-discount" element={<BillDiscount />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/regulations" element={<Regulations />} />
            <Route path="/menu" element={<Menu />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

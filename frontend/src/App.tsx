// App.tsx
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { BareLayout } from "./components/layout/BareLayout";
import { LandingPage } from "./pages/LandingPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { ListingDetailPage } from "./pages/ListingDetailPage";
import { CreateListingPage } from "./pages/CreateListingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AuthPage } from "./pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explorar" element={<MarketplacePage />} />
        <Route path="/anuncios/:id" element={<ListingDetailPage />} />
        <Route path="/anuncios/novo" element={<CreateListingPage />} />
        <Route path="/anuncios/:id/editar" element={<CreateListingPage />} />
        <Route path="/meus-anuncios" element={<DashboardPage />} />
      </Route>

      <Route element={<BareLayout />}>
        <Route path="/entrar" element={<AuthPage />} />
        <Route path="/cadastro" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;
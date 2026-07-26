import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./pages/LandingPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import {ListingDetailPage} from "./pages/ListingDetailPage"
import { CreateListingPage } from "./pages/CreateListingPAge"

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explorar" element={<MarketplacePage />} />
          <Route path="/anuncios/:id" element={<ListingDetailPage />} />
          <Route path="/anuncios/novo" element={<CreateListingPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
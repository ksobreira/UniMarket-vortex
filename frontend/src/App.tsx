import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./pages/LandingPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import {ListingDetailPage} from "./pages/ListingDetailPage"

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explorar" element={<MarketplacePage />} />
          <Route path="/anuncios/:id" element={<ListingDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
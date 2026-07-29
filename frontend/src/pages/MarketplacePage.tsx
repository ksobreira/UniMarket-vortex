import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingCard } from "../components/listings/ListingCard";
import { ListingsService } from "../services/listing.service";
import { CATEGORY_FILTERS } from "../lib/categories";
import type { Category, Listing } from "../types/listing";

export function MarketplacePage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [activeCategory, setActiveCategory] = useState<Category | "ALL">("ALL");

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await ListingsService.getAll();
      setLoading(false);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setListings(result.data);
    }
    load();
  }, []);

  const filtered = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || listing.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-extrabold text-ink mb-6">Explorar Anúncios</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
        className="w-full max-w-md mb-6 rounded-full border border-border px-4 py-2 text-sm outline-none focus:border-primary-500"
      />

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {CATEGORY_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              activeCategory === value ? "bg-primary-800 text-white" : "bg-surface text-muted hover:bg-primary-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-muted py-12">Carregando anúncios...</p>}
      {error && <p className="text-center text-red-600 py-12">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted">Nenhum anúncio encontrado.</p>
          )}
        </>
      )}
    </div>
  );
}
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingCard } from "../components/listings/ListingCard";
import { mockListings } from "../data/mockListings";
import type { Category } from "../types/listing";

const CATEGORIES: { value: Category | "ALL"; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "BOOKS", label: "Livros" },
  { value: "ELECTRONICS", label: "Eletrônicos" },
  { value: "CLOTHING", label: "Roupas" },
  { value: "FURNITURE", label: "Móveis" },
  { value: "OTHER", label: "Outros" },
];

export function MarketplacePage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [activeCategory, setActiveCategory] = useState<Category | "ALL">("ALL");

  const filtered = mockListings.filter((listing) => {
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
        {CATEGORIES.map(({ value, label }) => (
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

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">Nenhum anúncio encontrado.</p>
      )}
    </div>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { ListingCard } from "../listings/ListingCard";
import { mockListings } from "../../data/mockListings";
import type { Category } from "../../types/listing";
import { CATEGORY_FILTERS } from "../../lib/categories";

export function FeaturedListings() {
  const [activeCategory, setActiveCategory] = useState<Category | "ALL">("ALL");

  const filtered =
    activeCategory === "ALL"
      ? mockListings
      : mockListings.filter((l) => l.category === activeCategory);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-extrabold text-ink md:text-3xl">Últimos anúncios</h2>
          <p className="text-sm text-muted">O que a comunidade está compartilhando agora</p>
        </div>
        <Link to="/explorar" className="hidden text-sm font-bold text-primary-800 hover:underline sm:block">
          Ver todos →
        </Link>
      </div>

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

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">Nenhum anúncio nessa categoria ainda.</p>
      )}
    </section>
  );
}

import { Link } from "react-router-dom";
import type { Listing } from "../../types/listing";
import { CATEGORY_LABELS } from "../../lib/categories";
import { formatPrice } from "../../lib/formatPrice";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to={`/anuncios/${listing.id}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-surface">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-bold text-primary-800">
            {CATEGORY_LABELS[listing.category]}
          </span>
          {listing.isDonation && (
            <span className="rounded-full bg-success-50 px-2 py-0.5 text-xs font-bold text-success-700">
              Doação
            </span>
          )}
        </div>
        <h3 className="mb-1 line-clamp-1 text-sm font-bold text-ink">{listing.title}</h3>
        <p className="mb-3 line-clamp-2 text-xs text-muted">{listing.description}</p>
        <p className="font-extrabold text-primary-800">{formatPrice(listing)}
        </p>
      </div>
    </Link>
  );
}
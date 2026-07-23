import type { Listing } from "../types/listing";

export function formatPrice(listing: Pick<Listing, "price" | "isDonation">): string {
  if (listing.isDonation || !listing.price) return "Gratuito";
  return Number(listing.price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
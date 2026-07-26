// pages/CreateListingPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, HandCoins, Gift } from "lucide-react";
import { ListingsService } from "../services/listing.service";
import { CATEGORY_FILTERS, CATEGORY_LABELS } from "../lib/categories";
import { FormField } from "../components/forms/FormFIeld";
import { ListingCard } from "../components/listings/ListingCard";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import type { Category, Listing } from "../types/listing";

export function CreateListingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isDonation, setIsDonation] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const previewListing: Listing = {
    id: "preview",
    title: title || "Título do anúncio",
    description: description || "A descrição aparecerá aqui.",
    price: isDonation ? null : price || null,
    isDonation,
    imageUrl: imageUrl || "https://placehold.co/400x400/E5E7EB/64748B?text=Sem+imagem",
    category: (category || "OTHER") as Category,
    sellerId: "preview",
    seller: { id: "preview", name: user?.name ?? "Você", avatar: null },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!category) {
      setError("Selecione uma categoria");
      return;
    }

    setLoading(true);
    const result = await ListingsService.create({
      title,
      description,
      price: isDonation ? undefined : Number(price),
      isDonation,
      imageUrl,
      category,
    });
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    navigate(`/anuncios/${result.data.id}`);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-extrabold text-ink mb-1">Publicar Anúncio</h1>
      <p className="text-sm text-muted mb-8">Preencha os dados — a prévia ao lado atualiza em tempo real.</p>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8">
        {/* formulário */}
        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-6 space-y-5">
          <FormField id="title" label="Título" value={title} onChange={setTitle} required />

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium text-ink">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary-500"
            />
          </div>

          {/* categoria como pills, mesmo padrão da Marketplace */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-ink">Categoria</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.filter((c) => c.value !== "ALL").map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value as Category)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    category === c.value ? "bg-primary-800 text-white" : "bg-surface text-muted hover:bg-primary-50"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="imageUrl" className="text-sm font-medium text-ink flex items-center gap-1.5">
              <ImagePlus className="w-3.5 h-3.5" />
              URL da imagem
            </label>
            <input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              placeholder="https://..."
              className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary-500"
            />
          </div>

          {/* toggle venda / doação */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-ink">Tipo de anúncio</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsDonation(false)}
                className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-sm font-bold transition-colors ${
                  !isDonation ? "border-primary-800 bg-primary-50 text-primary-800" : "border-border text-muted"
                }`}
              >
                <HandCoins className="w-4 h-4" />
                Venda
              </button>
              <button
                type="button"
                onClick={() => setIsDonation(true)}
                className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-sm font-bold transition-colors ${
                  isDonation ? "border-success-700 bg-success-50 text-success-700" : "border-border text-muted"
                }`}
              >
                <Gift className="w-4 h-4" />
                Doação
              </button>
            </div>
          </div>

          {!isDonation && (
            <FormField id="price" label="Preço (R$)" type="number" value={price} onChange={setPrice} required />
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Publicando..." : "Publicar Anúncio"}
          </Button>
        </form>

        {/* preview ao vivo */}
        <div>
          <p className="text-xs font-bold text-muted mb-3 uppercase tracking-wide">Prévia</p>
          <div className="pointer-events-none">
            <ListingCard listing={previewListing} />
          </div>
          {category && (
            <p className="text-xs text-muted mt-3">
              Categoria selecionada: <span className="font-bold text-ink">{CATEGORY_LABELS[category]}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
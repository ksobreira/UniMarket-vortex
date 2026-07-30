// pages/CreateListingPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, HandCoins, Gift } from "lucide-react";
import { ListingsService } from "../services/listing.service";
import { CATEGORY_FILTERS, CATEGORY_LABELS } from "../lib/categories";
import { FormField } from "../components/forms/FormField";
import { ListingCard } from "../components/listings/ListingCard";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import type { Category, Listing } from "../types/listing";

export function CreateListingPage() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isDonation, setIsDonation] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingListing, setLoadingListing] = useState(isEditMode);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function loadListing() {
      const result = await ListingsService.getById(id!);
      setLoadingListing(false);
      if (!result.success) {
        setError(result.error);
        return;
      }
      const listing = result.data;
      setTitle(listing.title);
      setDescription(listing.description);
      setPrice(listing.price ?? "");
      setIsDonation(listing.isDonation);
      setImageUrl(listing.imageUrl);
      setCategory(listing.category);
    }

    loadListing();
  }, [id]);

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
    setFieldErrors({});

    if (!category) {
      setError("Selecione uma categoria");
      return;
    }

    setLoading(true);

    const payload = {
      title,
      description,
      price: isDonation ? undefined : Number(price),
      isDonation,
      imageUrl,
      category,
    };

    const result = isEditMode
      ? await ListingsService.update(id!, payload)
      : await ListingsService.create(payload);

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      setFieldErrors(result.fieldErrors ?? {});
      return;
    }

    navigate(`/anuncios/${result.data.id}`);
  }

  if (loadingListing) {
    return <div className="max-w-5xl mx-auto px-6 py-24 text-center text-muted">Carregando anúncio...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-extrabold text-ink mb-1">
        {isEditMode ? "Editar Anúncio" : "Publicar Anúncio"}
      </h1>
      <p className="text-sm text-muted mb-8">Preencha os dados — a prévia ao lado atualiza em tempo real.</p>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8">
        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-6 space-y-5">
          <FormField
            id="title"
            label="Título"
            value={title}
            onChange={setTitle}
            required
            error={fieldErrors.title}
          />

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium text-ink">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${
                fieldErrors.description ? "border-red-400 focus:border-red-500" : "border-border focus:border-primary-500"
              }`}
            />
            {fieldErrors.description && <p className="text-xs text-red-600">{fieldErrors.description}</p>}
          </div>

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
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors ${
                fieldErrors.imageUrl ? "border-red-400 focus:border-red-500" : "border-border focus:border-primary-500"
              }`}
            />
            {fieldErrors.imageUrl && <p className="text-xs text-red-600">{fieldErrors.imageUrl}</p>}
          </div>

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
            <FormField
              id="price"
              label="Preço (R$)"
              type="number"
              value={price}
              onChange={setPrice}
              required
              error={fieldErrors.price}
            />
          )}

          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : isEditMode ? "Salvar Alterações" : "Publicar Anúncio"}
          </Button>
        </form>

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
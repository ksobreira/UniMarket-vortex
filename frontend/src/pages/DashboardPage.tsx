// pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Package, HandCoins, Gift } from "lucide-react";
import { ListingsService } from "../services/listing.service";
import { useAuth } from "../hooks/useAuth";
import { CATEGORY_LABELS } from "../lib/categories";
import { formatPrice } from "../lib/formatPrice";
import { Button } from "../components/ui/Button";
import type { Listing } from "../types/listing";

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const result = await ListingsService.getAll();
      setLoading(false);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setListings(result.data.filter((l) => l.sellerId === user?.id));
    }
    load();
  }, [user]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Tem certeza que deseja excluir este anúncio? Essa ação não pode ser desfeita.");
    if (!confirmed) return;

    const result = await ListingsService.delete(id);
    if (!result.success) {
      alert(result.error);
      return;
    }
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  if (loading) {
    return <div className="max-w-5xl mx-auto px-6 py-12 text-center text-muted">Carregando seus anúncios...</div>;
  }

  const totalVenda = listings.filter((l) => !l.isDonation).length;
  const totalDoacao = listings.filter((l) => l.isDonation).length;

  const initials = user?.name.slice(0, 2).toUpperCase() ?? "?";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* perfil */}
      <div className="bg-white border border-border rounded-2xl p-6 flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-primary-800 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {initials}
        </div>
        <div>
          <h1 className="text-lg font-extrabold text-ink">{user?.name}</h1>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
      </div>

      {/* resumo — tudo calculado a partir do dado real */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-border rounded-2xl p-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-primary-800" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-ink">{listings.length}</p>
            <p className="text-xs text-muted">Anúncios</p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
            <HandCoins className="w-5 h-5 text-primary-800" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-ink">{totalVenda}</p>
            <p className="text-xs text-muted">À venda</p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5 text-success-700" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-ink">{totalDoacao}</p>
            <p className="text-xs text-muted">Em doação</p>
          </div>
        </div>
      </div>

      {/* barra de proporção — também real, sem número inventado */}
      {listings.length > 0 && (
        <div className="bg-white border border-border rounded-2xl p-5 mb-8">
          <p className="text-xs font-bold text-muted mb-3">Distribuição dos seus anúncios</p>
          <div className="flex h-2.5 rounded-full overflow-hidden bg-surface">
            <div
              className="bg-primary-800"
              style={{ width: `${(totalVenda / listings.length) * 100}%` }}
            />
            <div
              className="bg-success-500"
              style={{ width: `${(totalDoacao / listings.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-4 mt-2.5">
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-2 h-2 rounded-full bg-primary-800" /> Venda ({totalVenda})
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-2 h-2 rounded-full bg-success-500" /> Doação ({totalDoacao})
            </span>
          </div>
        </div>
      )}

      {/* lista de anúncios */}
      <div className="bg-white border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-extrabold text-ink">Meus Anúncios</h2>
          <Button asChild size="sm" className="gap-1.5">
            <Link to="/anuncios/novo"><Plus className="w-4 h-4" /> Novo Anúncio</Link>
          </Button>
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {listings.length === 0 && !error ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted mb-4">Você ainda não publicou nenhum anúncio.</p>
            <Button asChild size="sm">
              <Link to="/anuncios/novo">Publicar meu primeiro anúncio</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center gap-4 border border-border rounded-xl p-3"
              >
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0 bg-surface"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-ink truncate">{listing.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      listing.isDonation ? "bg-success-50 text-success-700" : "bg-primary-50 text-primary-800"
                    }`}>
                      {listing.isDonation ? "Doação" : "Venda"}
                    </span>
                    <span className="text-xs text-muted">{CATEGORY_LABELS[listing.category]}</span>
                  </div>
                </div>

                <p className="text-sm font-extrabold text-primary-800 shrink-0">{formatPrice(listing)}</p>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => navigate(`/anuncios/${listing.id}/editar`)}
                    className="p-2 rounded-lg text-muted hover:bg-surface hover:text-primary-800"
                    aria-label="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="p-2 rounded-lg text-muted hover:bg-red-50 hover:text-red-600"
                    aria-label="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, Clock, MessageCircleOff } from "lucide-react";
import { mockListings } from "../data/mockListings";
import { CATEGORY_LABELS } from "../lib/categories";
import { formatPrice } from "../lib/formatPrice";
import { formatRelativeDate } from "../lib/formatRelativeDate";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";

export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-lg font-bold text-ink mb-2">Anúncio não encontrado</p>
        <p className="text-muted text-sm mb-6">
          Ele pode ter sido removido ou o link está incorreto.
        </p>
        <Button asChild>
          <Link to="/explorar">Voltar para Explorar</Link>
        </Button>
      </div>
    );
  }

  const isOwner = user?.id === listing.sellerId;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link
        to="/explorar"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* coluna esquerda: imagem + descrição */}
        <div className="space-y-6">
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white border border-border rounded-2xl p-6">
            <h2 className="font-bold text-ink mb-3">Descrição</h2>
            <p className="text-sm text-muted leading-relaxed">{listing.description}</p>
          </div>
        </div>

        {/* coluna direita: info + ações */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800">
                {listing.isDonation ? "Doação" : "Venda"}
              </span>
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-muted">
                {CATEGORY_LABELS[listing.category]}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-ink mb-2">
              {listing.title}
            </h1>

            <p className="text-2xl font-extrabold text-primary-800 mb-2">
              {formatPrice(listing)}
            </p>

            <p className="flex items-center gap-1.5 text-xs text-muted">
              <Clock className="w-3.5 h-3.5" />
              {formatRelativeDate(listing.createdAt)}
            </p>
          </div>

          {!isOwner && (
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center">
              <MessageCircleOff className="w-6 h-6 text-primary-800 mx-auto mb-3" />
              <p className="font-bold text-ink text-sm mb-1">Sem chat na plataforma</p>
              <p className="text-xs text-muted leading-relaxed">
                Combine a retirada pessoalmente no campus ou por outro canal de contato.
              </p>
            </div>
          )}

          <div className="bg-white border border-border rounded-2xl p-6">
            <p className="text-xs font-bold text-muted mb-3">Anunciado por</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {listing.seller?.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{listing.seller?.name}</p>
                <p className="text-xs text-muted">Comunidade UNIFOR</p>
              </div>
            </div>
          </div>

          {isOwner && (
            <div className="flex gap-3">
              <Button asChild variant="outline" className="gap-1.5 flex-1">
                <Link to={`/anuncios/${listing.id}/editar`}>
                  <Pencil className="w-4 h-4" />
                  Editar
                </Link>
              </Button>
              <Button variant="destructive" className="gap-1.5 flex-1">
                <Trash2 className="w-4 h-4" />
                Excluir
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
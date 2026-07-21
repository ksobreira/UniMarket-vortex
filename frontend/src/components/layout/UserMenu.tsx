import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Package,
  Settings,
  User,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const firstName = user.name.split(" ")[0];

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 transition-colors hover:bg-primary-50"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-xs font-bold text-white">
          {initials}
        </div>

        <span className="text-sm font-medium text-ink">
          {firstName}
        </span>

        <ChevronDown className="h-4 w-4 text-muted" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
          {/* Usuário */}
          <div className="border-b border-border px-4 py-3">
            <p className="font-semibold text-ink">
              {user.name}
            </p>

            <p className="truncate text-sm text-muted">
              {user.email}
            </p>
          </div>

          {/* Perfil */}
          <Link
            to="/perfil"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm text-ink transition-colors hover:bg-primary-100"
          >
            <User className="h-4 w-4" />
            Meu Perfil
          </Link>

          {/* Meus anúncios */}
          <Link
            to="/meus-anuncios"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm text-ink transition-colors hover:bg-primary-100"
          >
            <Package className="h-4 w-4" />
            Meus Anúncios
          </Link>

          {/* Configurações */}
          <Link
            to="/configuracoes"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm text-ink transition-colors hover:bg-primary-100"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 border-t border-border px-4 py-3 text-left text-sm text-ink transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Compass, Menu, Package, Plus, X } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";

import { Button } from "../ui/Button";

const navLinkClass = (isActive: boolean) => {
  return isActive
    ? "rounded-xl px-4 py-2 text-sm font-medium transition-colors bg-primary-50 text-primary-800"
    : "rounded-xl px-4 py-2 text-sm font-medium transition-colors text-muted hover:bg-primary-50 hover:text-primary-800";
};


export function Navbar() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        {/* Navegação Desktop */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/explorar"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            <span className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Explorar
            </span>
          </NavLink>


          {user && (
            <NavLink
              to="/meus-anuncios"
              className={({ isActive }) => navLinkClass(isActive)}
            >
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Meus Anúncios
              </span>
            </NavLink>
          )}
        </nav>

        {/* Ações Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/anuncios/novo">
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Publicar
                </Button>
              </Link>

              <UserMenu />
            </>
          ) : (
            <>
              <Link to="/cadastro">
                <Button variant="outline" size="sm">
                  Criar conta
                </Button>
              </Link>

              <Link to="/entrar">
                <Button size="sm">
                  Entrar
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Menu Mobile */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-primary-50 md:hidden"
          aria-label="Abrir menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
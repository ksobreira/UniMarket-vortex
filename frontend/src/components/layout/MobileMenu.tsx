import { Link, NavLink } from "react-router-dom";
import { Compass, Info, LogOut, Package, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinkClass = (isActive: boolean) => {
  return isActive
    ? "rounded-xl px-4 py-2 text-sm font-medium transition-colors bg-primary-50 text-primary-800"
    : "rounded-xl px-4 py-2 text-sm font-medium transition-colors text-muted hover:bg-primary-50 hover:text-primary-800";
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden border-t border-border bg-white md:hidden"
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            {user && (
              <div className="mb-2 rounded-2xl bg-primary-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-sm font-bold text-white">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{user.name}</p>
                    <p className="text-sm text-muted">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <NavLink to="/explorar" className={({ isActive }) => navLinkClass(isActive)} onClick={onClose}>
              <span className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                Explorar
              </span>
            </NavLink>

            {!user && (
              <a href="/#como-funciona" className={navLinkClass(false)} onClick={onClose}>
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Como Funciona
                </span>
              </a>
            )}

            {user && (
              <NavLink to="/meus-anuncios" className={({ isActive }) => navLinkClass(isActive)} onClick={onClose}>
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Meus Anúncios
                </span>
              </NavLink>
            )}

            <div className="mt-2 border-t border-border pt-3">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/anuncios/novo" onClick={onClose}>
                    <Button className="w-full">
                      <Plus className="h-4 w-4" />
                      Publicar Anúncio
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/entrar" onClick={onClose}>
                    <Button variant="outline" className="w-full">Entrar</Button>
                  </Link>
                  <Link to="/cadastro" onClick={onClose}>
                    <Button className="w-full">Criar Conta</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
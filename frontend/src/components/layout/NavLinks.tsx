import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface NavLinksProps {
  onNavigate?: () => void;
  className?: string;
}

export function NavLinks({ onNavigate, className = "" }: NavLinksProps) {
  const { user } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3.5 py-2 text-sm rounded-lg font-medium transition-colors ${
      isActive ? "text-primary-800 bg-primary-50 font-bold" : "text-muted hover:text-primary-800"
    }`;

  return (
    <div className={className}>
      <NavLink to="/explorar" className={linkClass} onClick={onNavigate}>
        Explorar
      </NavLink>
      {user && (
        <NavLink to="/meus-anuncios" className={linkClass} onClick={onNavigate}>
          Meus Anúncios
        </NavLink>
      )}
    </div>
  );
}
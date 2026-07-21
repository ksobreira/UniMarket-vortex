import { Link } from "react-router-dom";
import { Recycle } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const socialLinks = [
  { id: 1, icon: FiGithub, url: "https://github.com/ksobreira" },
  {
    id: 2,
    icon: FiLinkedin,
    url: "https://www.linkedin.com/in/kauam-sobreira-1b82a2365",
  },
];

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Recycle className="h-4 w-4 text-primary-900" />
              </div>
              <span className="text-lg font-extrabold">EcoCicle</span>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-primary-100">
              Marketplace de economia circular para UNIFOR. Doe, venda e
              encontre o que precisa dentro do campus.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-primary-200">
              Plataforma
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/explorar"
                  className="text-primary-100 transition-colors hover:text-white"
                >
                  Explorar anúncios
                </Link>
              </li>

              <li>
                <Link
                  to="/anuncios/novo"
                  className="text-primary-100 transition-colors hover:text-white"
                >
                  Publicar anúncio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold text-primary-200">
              Sobre o projeto
            </h3>

            <p className="text-sm leading-relaxed text-primary-100">
              Desenvolvido como desafio técnico do Laboratório Vortex da
              Universidade de Fortaleza para o processo seletivo de
              desenvolvimento Full Stack.
            </p>

            <ul className="mt-2 flex gap-4 ">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg bg-white/10 p-4 text-primary-100 shadow-sm transition-colors duration-300 hover:bg-white/20 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>

          </div>
        </div>


        <div className="mt-5 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-primary-200">
            © {new Date().getFullYear()} EcoCicle — Desafio Técnico da
            Universidade de Fortaleza
          </p>
        </div>
      </div>
    </footer>
  );
}
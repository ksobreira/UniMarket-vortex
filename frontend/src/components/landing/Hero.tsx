// components/landing/Hero.tsx
import { Link } from "react-router-dom";
import { HeartHandshake, ListPlus, Search, ArrowRight } from "lucide-react";
import { HeroSearch } from "./HeroSearch";
import { useAuth } from "../../hooks/useAuth";

const HIGHLIGHTS = [
  {
    icon: ListPlus,
    title: "Publique",
    description: "Crie um anúncio em poucos minutos com título, descrição e imagem.",
  },
  {
    icon: Search,
    title: "Encontre",
    description: "Pesquise itens por categoria e encontre o que precisa rapidamente.",
  },
  {
    icon: HeartHandshake,
    title: "Negocie ou Doe",
    description: "Venda por um preço justo ou ajude outro estudante através da doação.",
  },
];

export function Hero() {
  const { user } = useAuth();

  return (
    <section className="bg-primary-900 text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
          UniMarket: O marketplace da comunidade UNIFOR
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-primary-100">
          Compre, venda ou doe livros, eletrônicos, jalecos e materiais
          acadêmicos entre estudantes de forma simples e segura.
        </p>

        <div className="mx-auto mb-4 max-w-3xl">
          <HeroSearch />
        </div>

        <div className="mb-16">
          <Link
            to={user ? "/anuncios/novo" : "/entrar"}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-100 transition-colors hover:text-white"
          >
            {user ? "Publicar anúncio gratuitamente" : "Começar agora"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div id="como-funciona" className="grid gap-8 scroll-mt-20 sm:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-14 w-14 rotate-45 items-center justify-center border-2 border-white/30 transition-all duration-300 hover:scale-100 hover:h-4/5">
                <Icon className="h-5 w-5 -rotate-45 text-white" />
              </div>
              <h3 className="mb-2 font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-primary-100">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// pages/AuthPage.tsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Recycle, ListPlus, Filter, HeartHandshake } from "lucide-react";
import { AuthService } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import campusPhoto from "../assets/campus-unifor-fundo.jpg";

const FEATURES = [
  { icon: ListPlus, text: "Anuncie um item em poucos minutos" },
  { icon: Filter, text: "Encontre por categoria, sem complicação" },
  { icon: HeartHandshake, text: "Venda por um preço justo ou doe" },
];

export function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">(
    location.pathname === "/cadastro" ? "register" : "login"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  function switchMode(newMode: "login" | "register") {
    setMode(newMode);
    setError("");
    navigate(newMode === "register" ? "/cadastro" : "/entrar", { replace: true });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "register") {
      const result = await AuthService.register({ name, email, password });
      setLoading(false);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setPassword("");
      switchMode("login");
      return;
    }

    const result = await AuthService.login({ email, password });
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    login(result.data.user, result.data.token);
    navigate("/");
  }

  return (
    <div className="grid h-screen md:grid-cols-2">
      {/* painel esquerdo — só desktop */}
      <div className="hidden md:flex relative overflow-hidden flex-col justify-center text-white px-12 py-20">
        <img
          src={campusPhoto}
          alt="Campus da Universidade de Fortaleza"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/90 to-primary-900/60" />

        <div className="relative">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Recycle className="w-4 h-4 text-primary-900" />
            </div>
            <span className="font-extrabold text-lg">UniMarket</span>
          </Link>

          <h1 className="text-4xl font-extrabold leading-tight mb-4 max-w-md">
            Dê uma segunda vida aos materiais acadêmicos.
          </h1>
          <p className="text-primary-100 mb-12 max-w-sm">
            Compre, venda ou doe dentro da comunidade UNIFOR. Sustentabilidade começa no campus.
          </p>

          <ul className="space-y-5">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-sm text-primary-100">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-primary-200 mt-16">
          © {new Date().getFullYear()} UniMarket — Universidade de Fortaleza
        </p>
      </div>

      {/* painel direito — formulário */}
      <div className="flex items-center justify-center px-6 py-20 bg-surface">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex md:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
              <Recycle className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-ink text-lg">UniMarket</span>
          </Link>

          <div className="bg-white border border-border rounded-2xl shadow-sm p-7">
            <div className="flex bg-surface rounded-full p-1 mb-7">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`flex-1 rounded-full py-2 text-sm font-bold transition-colors ${
                  mode === "login" ? "bg-primary-800 text-white shadow-sm" : "text-muted"
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`flex-1 rounded-full py-2 text-sm font-bold transition-colors ${
                  mode === "register" ? "bg-primary-800 text-white shadow-sm" : "text-muted"
                }`}
              >
                Cadastrar-se
              </button>
            </div>

            <h2 className="text-xl font-extrabold text-ink mb-1">
              {mode === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
            </h2>
            <p className="text-sm text-muted mb-6">
              {mode === "login" ? "Entre com sua conta." : "Leva menos de um minuto."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-ink">Nome</label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu.nome@edu.unifor.br"
                    className="w-full rounded-lg border border-border pl-9 pr-3 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-ink">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border pl-9 pr-3 py-2.5 text-sm outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full gap-1.5" disabled={loading}>
                {loading ? "Aguarde..." : mode === "login" ? "Entrar na plataforma" : "Criar conta"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
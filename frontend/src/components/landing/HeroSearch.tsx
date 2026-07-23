import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "../ui/Button";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = query.trim() ? `?search=${encodeURIComponent(query.trim())}` : "";
    navigate(`/explorar${params}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto flex items-center gap-2 bg-white rounded-full p-1.5 pl-5 shadow-lg"
    >
      <Search className="w-4 h-4 text-muted shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por calculadora, livro, jaleco..."
        className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-muted py-2"
      />
      <Button type="submit" className="rounded-full shrink-0">
        Buscar
      </Button>
    </form>
  );
}
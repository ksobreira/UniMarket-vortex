import type { Listing, CreateListingInput, UpdateListingInput, Category } from "../types/listing";
import type { ApiResult } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const ListingsService = {
  async getAll(category?: Category): Promise<ApiResult<Listing[]>> {
    try {
      const query = category ? `?category=${category}` : "";
      const res = await fetch(`${API_URL}/anuncios${query}`);
      const data = await res.json();
      if (!res.ok) return { success: false, data: null, error: data.message || "Erro ao buscar anúncios" };
      return { success: true, data, error: null };
    } catch {
      return { success: false, data: null, error: "Erro de conexão com o servidor" };
    }
  },

  async getById(id: string): Promise<ApiResult<Listing>> {
    try {
      const res = await fetch(`${API_URL}/anuncios/${id}`);
      const data = await res.json();
      if (!res.ok) return { success: false, data: null, error: data.message || "Anúncio não encontrado" };
      return { success: true, data, error: null };
    } catch {
      return { success: false, data: null, error: "Erro de conexão com o servidor" };
    }
  },

  async create(input: CreateListingInput): Promise<ApiResult<Listing>> {
    try {
      const res = await fetch(`${API_URL}/anuncios`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, data: null, error: data.message || "Erro ao criar anúncio" };
      return { success: true, data, error: null };
    } catch {
      return { success: false, data: null, error: "Erro de conexão com o servidor" };
    }
  },

  async update(id: string, input: UpdateListingInput): Promise<ApiResult<Listing>> {
    try {
      const res = await fetch(`${API_URL}/anuncios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, data: null, error: data.message || "Erro ao atualizar anúncio" };
      return { success: true, data, error: null };
    } catch {
      return { success: false, data: null, error: "Erro de conexão com o servidor" };
    }
  },

  async delete(id: string): Promise<ApiResult<{ message: string }>> {
    try {
      const res = await fetch(`${API_URL}/anuncios/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, data: null, error: data.message || "Erro ao deletar anúncio" };
      return { success: true, data, error: null };
    } catch {
      return { success: false, data: null, error: "Erro de conexão com o servidor" };
    }
  },
};
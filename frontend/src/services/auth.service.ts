// services/auth.service.ts
import type { LoginInput, LoginResponse, RegisterInput } from "../types/auth";
import type { ApiResult } from "../types/api";
import type { User } from "../types/user";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthService = {
    async register(input: RegisterInput): Promise<ApiResult<User>> {
        try {
            const res = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            const data = await res.json();
            if (!res.ok) return { success: false, data: null, error: data.error || "Erro ao cadastrar" };
            return { success: true, data, error: null };
        } catch {
            return { success: false, data: null, error: "Erro de conexão com o servidor" };
        }
    },

    async login(input: LoginInput): Promise<ApiResult<LoginResponse>> {
        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            const data = await res.json();
            if (!res.ok) return { success: false, data: null, error: data.error || "Email ou senha inválidos" };
            return { success: true, data, error: null };
        } catch {
            return { success: false, data: null, error: "Erro de conexão com o servidor" };
        }
    },
};
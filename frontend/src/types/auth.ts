import type {User} from './user'

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: Pick<User, "id" | "name" | "email">
}
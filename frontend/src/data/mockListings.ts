// data/mockListings.ts
import type { Listing } from "../types/listing";

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Calculadora Científica HP 12C",
    description: "Usada, funcionando perfeitamente.",
    price: "120",
    isDonation: false,
    imageUrl: "https://placehold.co/400x400/0282EA/white?text=Calculadora",
    category: "ELECTRONICS",
    sellerId: "u1",
    seller: { id: "u1", name: "Pedro Alves", avatar: null },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Livro de Cálculo I - James Stewart",
    description: "Edição antiga, com anotações a lápis. Doação.",
    price: null,
    isDonation: true,
    imageUrl: "https://placehold.co/400x400/016630/white?text=Livro",
    category: "BOOKS",
    sellerId: "u2",
    seller: { id: "u2", name: "Ana Souza", avatar: null },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Jaleco de Laboratório Tam. M",
    description: "Pouco uso, sem manchas.",
    price: "40",
    isDonation: false,
    imageUrl: "https://placehold.co/400x400/64748B/white?text=Jaleco",
    category: "CLOTHING",
    sellerId: "u3",
    seller: { id: "u3", name: "João Lima", avatar: null },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
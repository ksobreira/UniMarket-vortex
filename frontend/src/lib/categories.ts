import type { Category } from "../types/listing";

export const CATEGORY_LABELS: Record<Category, string> = {
  BOOKS: "Livros",
  STUDY_MATERIALS: "Material de Estudo",
  ELECTRONICS: "Eletrônicos",
  EQUIPMENT: "Equipamentos",
  FURNITURE: "Móveis",
  CLOTHING: "Roupas",
  ACCESSORIES: "Acessórios",
  OTHER: "Outros",
};

export const CATEGORY_FILTERS: { value: Category | "ALL"; label: string }[] = [
  { value: "ALL", label: "Todos" },
  ...(Object.entries(CATEGORY_LABELS) as [Category, string][]).map(([value, label]) => ({
    value,
    label,
  })),
];
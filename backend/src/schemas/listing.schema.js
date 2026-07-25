import { z } from "zod";

export const createListingSchema = z.object({
    title: z.string().min(3, "Título precisa ter pelo menos 3 caracteres"),
    description: z.string().min(10, "Descrição precisa ter pelo menos 10 caracteres"),
    price: z.number().positive("Preço precisa ser maior que zero").optional(),
    isDonation: z.boolean(),
    imageUrl: z.string().url("URL de imagem inválida"),
    category: z.enum([
        "BOOKS", "STUDY_MATERIALS", "ELECTRONICS", "EQUIPMENT",
        "FURNITURE", "CLOTHING", "ACCESSORIES", "OTHER",
  ]),
});

export const updateListingSchema = createListingSchema.partial();
import { prisma } from "../lib/prisma.js";
import { createListingSchema, updateListingSchema } from "../schemas/listing.schema.js";

export const getAllListing = async (req, res) => {
    try {
        const { category } = req.query;

        const listings = await prisma.listing.findMany({
            where: category ? { category } : undefined,
            orderBy: { createdAt: "desc" },
            include: { seller: { select: { id: true, name: true } } },
        });

        return res.status(200).json(listings);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar anúncios", error: error.message });
    }
};

export const getListingById = async (req, res) => {
    try {
        const { id } = req.params;

        const listing = await prisma.listing.findUnique({
            where: { id },
            include: { seller: { select: { id: true, name: true, avatar: true } } },
        });

        if (!listing) {
            return res.status(404).json({ message: "Anúncio não encontrado" });
        }

        return res.status(200).json(listing);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar anúncio", error: error.message });
    }
};

export const createListing = async (req, res) => {
    try {
        const parsed = createListingSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                issues: parsed.error.issues.map((i) => ({ campo: i.path[0], erro: i.message })),
            });
        }

        const sellerId = req.user.id;
        const listing = await prisma.listing.create({
            data: { ...parsed.data, sellerId },
        });

        return res.status(201).json(listing);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar anúncio", error: error.message });
    }
};

export const updateListing = async (req, res) => {
    try {
        const { id } = req.params;

        const parsed = updateListingSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                issues: parsed.error.issues.map((i) => ({ campo: i.path[0], erro: i.message })),
            });
        }

        const listingExists = await prisma.listing.findUnique({ where: { id } });

        if (!listingExists) {
            return res.status(404).json({ message: "Anúncio não encontrado" });
        }

        if (listingExists.sellerId !== req.user.id) {
            return res.status(403).json({ message: "Você não tem permissão para editar este anúncio" });
        }

        const listingUpdated = await prisma.listing.update({
            where: { id },
            data: parsed.data,
        });

        return res.status(200).json(listingUpdated);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar anúncio", error: error.message });
    }
};

export const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;

        const listing = await prisma.listing.findUnique({ where: { id } });

        if (!listing) {
            return res.status(404).json({ message: "Anúncio não encontrado" });
        }

        if (listing.sellerId !== req.user.id) {
            return res.status(403).json({ message: "Você não tem permissão para deletar este anúncio" });
        }

        await prisma.listing.delete({ where: { id } });
        return res.json({ message: "Anúncio deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar o anúncio", error: error.message });
    }
};
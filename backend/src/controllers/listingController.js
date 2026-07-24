import {prisma} from "../lib/prisma.js";

export const getAllListing = async (req, res) => {
    try {
        const { category } = req.query;

        const listings = await prisma.listing.findMany({
            where: category ? { category } : undefined,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return res.status(200).json(listings);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar anúncios",
            error: error.message,
        });
    }
};


export const getListingById = async (req, res) => {
    try {
        const { id } = req.params;

        const listing = await prisma.listing.findUnique({
            where: {
                id,
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
        });

        if (!listing) {
            return res.status(404).json({
                message: "Anúncio não encontrado",
            });
        }

        return res.status(200).json(listing);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar anúncio",
            error: error.message,
        });
    }
};


export const createListing = async (req, res) => {
    try {
        const { title, description, price, isDonation, imageUrl, category } = req.body;
        const sellerId = req.user.id; 

        const listing = await prisma.listing.create({
            data: { title, description, price, isDonation, imageUrl, category, sellerId },
        });

        return res.status(201).json(listing);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar anúncio",
            error: error.message,
        });
    }
};


export const updateListing = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, price, isDonation, imageUrl, category, sellerId } = req.body;

        const listingExists = await prisma.listing.findUnique({
            where: { id },
        });

        if(listingExists.sellerId !== req.user.id){
            return res.status(403).json({message: "Você não tem permissão para editar esse anúncio "})
        }

        if (!listingExists) {
            return res.status(404).json({
                message: "Anúncio não encontrado",
            });
        }

        const listingUpdated = await prisma.listing.update({
            where: { id },
            data: { title, description, price, isDonation, imageUrl, category },
        });

        return res.status(200).json(listingUpdated);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar anúncio",
            error: error.message,
        });
    }
};

export const deleteListing = async (req, res) => {
    try {
        const { id } = req.params

        const listing = await prisma.listing.findUnique({
            where: { id },
        });

        if(listing.sellerId !== req.user.id) {
            return res.status(403).json({message: "Você não tem permissão para deletar esse anúncio"})        
        }

        if (!listing) {
            return res.status(404).json({
                message: "Anúncio não encontrado",
            });
        }

        await prisma.listing.delete({where: {id}})
        return res.json({message: "Anúncio deletado com sucesso"})

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao deletar o anúncio",
            error: error.message
        })
    }
}
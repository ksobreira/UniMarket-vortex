// backend/prisma/seed.ts
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("demo1234", 10);

  const pedro = await prisma.user.upsert({
    where: { email: "pedro@demo.com" },
    update: {},
    create: { name: "Pedro Alves", email: "pedro@demo.com", password },
  });

  const ana = await prisma.user.upsert({
    where: { email: "ana@demo.com" },
    update: {},
    create: { name: "Ana Souza", email: "ana@demo.com", password },
  });

  await prisma.listing.createMany({
    data: [
      {
        title: "Calculadora Científica HP 12C",
        description: "Usada, funcionando perfeitamente.",
        price: 120,
        isDonation: false,
        imageUrl: "https://placehold.co/400x400/0282EA/white?text=Calculadora",
        category: "ELECTRONICS",
        sellerId: pedro.id,
      },
      {
        title: "Livro de Cálculo I - James Stewart",
        description: "Edição antiga, com anotações a lápis. Doação.",
        isDonation: true,
        imageUrl: "https://placehold.co/400x400/016630/white?text=Livro",
        category: "BOOKS",
        sellerId: ana.id,
      },
      {
        title: "Jaleco de Laboratório Tam. M",
        description: "Pouco uso, sem manchas.",
        price: 40,
        isDonation: false,
        imageUrl: "https://placehold.co/400x400/64748B/white?text=Jaleco",
        category: "CLOTHING",
        sellerId: pedro.id,
      },
    ],
  });

  console.log("Seed concluído:", { pedro: pedro.email, ana: ana.email });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
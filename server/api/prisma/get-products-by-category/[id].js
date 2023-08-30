// GET /api/prisma/get-products-by-category/[category]
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // get all products from a given category
  let products = await prisma.products.findMany({
    where: { category: event.context.params.id },
  });

  return products;
});

// GET /api/prisma/get-products-by-seller/[userID]
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // get all products from a given category
  let products = await prisma.product.findMany({
    where: { sellerId: event.context.params.id, isDeleted: false },
  });

  return products;
});

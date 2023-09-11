// GET /api/prisma/get-product-by-id/[id]
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // get product with given id
  let product = await prisma.product.findFirst({
    where: { id: Number(event.context.params.id) },
  });

  return product;
});

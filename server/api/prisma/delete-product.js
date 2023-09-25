// PUT api/prisma/delete-product
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const sellerId = body.sellerId;
  const productId = body.productId;

  const productObject = prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  //check if product with id provided exists
  if (!productObject) {
    return false;
  }

  return await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      isDeleted: true,
    },
  });
});

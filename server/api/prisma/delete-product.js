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
    return (false, "No product with given id found");
  }

  if (productObject.userSellerId == sellerId) {
    //check if the product does indeed belong to the seller
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return (true, "Deleted product successfuly");
  } else {
    return (false, "You do not have permission to delete this product");
  }
});

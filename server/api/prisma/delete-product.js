// PUT api/prisma/delete-product
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


//TODO

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

  productObject.seller().then(async (seller) => {
     //check if the product does indeed belong to the seller

    if (seller.userId === sellerId){
      await prisma.product.delete({
        where: {
          id: productId,
        },
      });
  
      return (true, "Deleted product successfuly");
    } else {
      return (false, "You do not have permission to delete this product");

    }
  })
});

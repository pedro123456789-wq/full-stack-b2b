//POST api/prisma/create-product
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//allow sellers to create new products
export default eventHandler(async (event) => {
  const body = readBody(event);

  return await prisma.product.create({
    data: {
      category: body.category,
      description: body.description,
      price: body.price,
      title: body.title,
      url: body.url,
      created_at: body.created_at,
      sellerId: body.seller_id,
    },
  });
});

//allow sellers to add multiple images to the product

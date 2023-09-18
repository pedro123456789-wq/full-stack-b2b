//POST api/prisma/create-product
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const body = await readBody(event);

  // add new entry to the order table
  const product = await prisma.product.create({
    data: {
        title: body.title, 
        description: body.description, 
        price: body.price, 
        category: body.category,
        deliveryTimeDays: body.deliveryTimeDays, 
        sellerId: body.sellerId, 
        image1: body.image1, 
        image2: body.image2, 
        image3: body.image3, 
        image4: body.image4, 
        image5: body.image5
    },
  });

  return product; //return the order created as a confirmation
});

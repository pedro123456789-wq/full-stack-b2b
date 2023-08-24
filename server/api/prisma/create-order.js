//POST api/prisma/create-order
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const body = await readBody(event);

  // add new entry to the order table
  const order = await prisma.orders.create({
    data: {
      userId: body.userId,
      stripeId: body.stripeId,
      name: body.name,
      address: body.address,
      zipcode: body.zipcode,
      city: body.city,
      country: body.country,
    },
  });

  // add order items to orderItem table
  // and link them to the order created using foreign key
  body.products.forEach(async (prod) => {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: Number(prod.id),
      },
    });
  });

  return order; //return the order created as a confirmation
});

//POST api/prisma/create-order
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const body = await readBody(event);

  // add new entry to the order table
  const order = await prisma.order.create({
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

  // VERY IMPORTANT: the 'forEach method is not compatible with async / await
  //hence the order is getting returned before the loop finishes
  //hence the program moves on to the next line which involves clearing the cart
  //so not all items get registered in the order, which is a big problem

  //Code that gave error:
  // body.products.forEach(async (prod) => {
  //   await prisma.orderItem.create({
  //     data: {
  //       orderId: order.id,
  //       productId: Number(prod.id),
  //     },
  //   });
  // });

  //Correct alternative (using for loop)
  const addProd = (order, prod) => {
    return new Promise((resolve) => {
      prisma.orderItem
        .create({
          data: {
            orderId: order.id,
            productId: Number(prod.id),
          },
        })
        .then(() => {
          resolve(""); //signals that promise has finished
        });
    });
  };

  for (const prod of body.products) {
    await addProd(order, prod);
  }

  return order; //return the order created as a confirmation
});

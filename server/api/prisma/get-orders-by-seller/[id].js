// GET /api/prisma/get-orders-by-seller/[userID]
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//get a list of all products from this seller that were ordered

export default defineEventHandler(async (event) => {
  //get the list of all of the items ever ordered
  let orederedItems = await prisma.orderItem.findMany();
  const output = [];

  for (const item of orederedItems) {
    //for each order item find the product associated with the order
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    //check if the item is produced by the seller in question
    if (product.sellerId == event.context.params.id) {
      //if it is return the order information, along with the product
      const order = await prisma.order.findFirst({
        where: { id: item.orderId },
      });

      output.push({
        id: item.id, 
        product: product,
        date: order.created_at,
        address: order.address,
        zipCode: order.zipcode,
        isCompleted: item.completed
      });
    }
  }

  return output;
});

//TODO:
//add ability to edit seller products
//add option to mark order as completed for seller
//allow seller to see their earnings
//add delivery time field to the orders

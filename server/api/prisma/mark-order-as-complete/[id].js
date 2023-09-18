//PUT /api/prisma/mark-order-as-complete/[orderItemId]
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  //mark order as complete
  const completeOrder = await prisma.orderItem.update({
    where: {
        id: event.context.params.id
    }, 
    data: {
        completed: true
    }
  });

  return completeOrder;
});
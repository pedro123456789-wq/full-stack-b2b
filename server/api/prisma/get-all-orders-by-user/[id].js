// GET /api/prisma/get-all-orders-by-user/[userId]
// Gets all of the orders placed by a user (buyer)
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let orders = await prisma.order.findMany({
    where: { userId: event.context.params.id },
    orderBy: { id: "desc" }, //get newest order first
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
});

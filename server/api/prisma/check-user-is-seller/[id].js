//GET /api/prisma/check-user-is-seller/[userId]

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const res = await prisma.seller.findFirst({
    where: { userId: event.context.params.id },
  });

  return res != null;
});

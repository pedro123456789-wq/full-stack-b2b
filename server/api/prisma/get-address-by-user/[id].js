//GET /api/prisma/get-address-by-user/[userId]

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const res = await prisma.address.findFirst({
    where: { userId: event.context.params.id },
  });

  return res;
});

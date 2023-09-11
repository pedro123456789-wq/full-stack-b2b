// GET /api/prisma/search-by-name/[name]
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // get all products where the search string ([name]) is contained in the title
  let items = await prisma.product.findMany({
    take: 10, //only return a maximum of 10 products
    where: {
      title: {
        contains: event.context.params.id,
        mode: "insensitive",
      },
    },
  });

  return items;
});

// GET api/prisma/get-all-products
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  return prisma.product.findMany({
    where: {isDeleted: false}
  }); //returns all of the entries from the products database table
});

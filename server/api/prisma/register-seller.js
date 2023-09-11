//POST /api/prisma/register-seller
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  //add new entry to the Seller database to register seller
  const seller = await prisma.seller.create({
    data: {
      userId: body.userId,
      email: body.email,
      zipcode: body.zipcode,
      city: body.city,
      country: body.country,
      businessName: body.businessName,
      is_verified: false,
    },
  });

  return seller;
});

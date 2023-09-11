//POST api/prisma/add-address
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const body = await readBody(event);

  // add new entry to the order table
  const address = await prisma.address.create({
    data: {
      userId: body.userId,
      name: body.name,
      address: body.address,
      zipcode: body.zipCode,
      city: body.city,
      country: body.country,
    },
  });

  return address;
});

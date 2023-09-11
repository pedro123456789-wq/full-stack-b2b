//PUT /api/prisma/update-address/[id]
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  //update rows in the address table that match the 'where' clause
  const res = await prisma.address.update({
    where: { id: Number(event.context.params.id) }, //extract the id from the url dynamically
    data: {
      name: body.name,
      address: body.address,
      zipcode: body.zipcode,
      city: body.city,
      country: body.country,
    },
  });

  return res;
});

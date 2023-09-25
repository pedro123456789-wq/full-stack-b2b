//POST api/prisma/create-product
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const body = await readBody(event);

  //connect to cloudinary asset hosting
  cloudinary.config({
    cloud_name: "dp6ggctps",
    api_key: "454253267442744",
    api_secret: "zdwf_oAucGSH7XnJOFkyBP-zufA",
    secure: true,
  });

  var urls = ["none", "none", "none", "none", "none"];

  //make async
  for (let i = 0; i < body.images.length; i++) {
    var image = body.images[i];

    if (image) {
      await cloudinary.uploader
        .upload(image, { resource_type: "image" })
        .then((response) => {
          urls[i] = response.url;
        });
    }
  }

  // add new entry to the order table
  const product = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      deliveryTimeDays: Number(body.deliveryTimeDays),
      sellerId: body.sellerId,
      image1: urls[0],
      image2: urls[1],
      image3: urls[2],
      image4: urls[3],
      image5: urls[4],
    },
  });

  return product; //return the order created as a confirmation
});

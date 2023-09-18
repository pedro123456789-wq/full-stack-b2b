// PUT api/prisma/edit-product
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const sellerId = body.sellerId;
  const productId = body.productId;

  const productObject = prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  //check if product with id provided exists
  if (!productObject) {
    return (false, "No product with given id found");
  }

  if (productObject.userSellerId == sellerId) {
    const newTitle = body.title;
    const newDescription = body.description;
    const newPrice = body.price;
    const newCategory = body.category;
    const newDeliveryTime = body.deliveryTimeDays;
    const newImage1 = body.image1;
    const newImage2 = body.image2;
    const newImage3 = body.image3;
    const newImage4 = body.image4;
    const newImage5 = body.image5;
    
    //check if the product does indeed belong to the seller
    const updatedProduct = await prisma.product.update({
        where: {
            id: productId
        }, 
        data: {
            title: newTitle, 
            description: newDescription, 
            price: newPrice, 
            category: newCategory, 
            deliveryTimeDays: newDeliveryTime, 
            image1: newImage1, 
            image2: newImage2, 
            image3: newImage3, 
            image4: newImage4, 
            image5: newImage5
        }
    });

    return (true, updatedProduct);
  } else {
    return (false, "You do not have permission to delete this product");
  }
});

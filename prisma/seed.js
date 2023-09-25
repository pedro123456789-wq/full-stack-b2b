const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create the data to be put into the database initially (admin account)

async function seedProducts() {
  try {
    await prisma.seller.create({
      data: {
        userId: "5eca9350-03f3-43c8-bf88-c3a438f0afe5",
        email: "pedro@gmail.com",
        zipcode: "123",
        city: "Town",
        country: "Land",
        businessName: "test",
        is_verified: true,
      },
    });

    await prisma.product.create({
      data: {
        title: "Luxury wooden flooring",
        description:
          "High quality wooden floor, made by traditional Italian carpenteers.",
        price: 250000, // e.g.: 2500.00
        category: "flooring",
        sellerId: "5eca9350-03f3-43c8-bf88-c3a438f0afe5",
        deliveryTimeDays: 2, 
        image1: 'https://res.cloudinary.com/dp6ggctps/image/upload/v1695669178/yzydxgkhgjwoxrklrkt0.jpg', 
        image2: 'https://res.cloudinary.com/dp6ggctps/image/upload/v1695669178/wfiauzyg7ggzwmxux1ls.webp', 
        image3: 'https://res.cloudinary.com/dp6ggctps/image/upload/v1695669177/vfla6mrgcstfbrkvtiux.webp'
      },
    });

    await prisma.product.create({
      data: {
        title: "Luxury sliding glass door",
        description:
          "This outstandingly well crafted product will take your home to the next level, giving it a touch of class and a modern feel.",
        price: 1999,
        category: "insulation",
        sellerId: "5eca9350-03f3-43c8-bf88-c3a438f0afe5",
        deliveryTimeDays: 10, 
        image1: 'https://res.cloudinary.com/dp6ggctps/image/upload/v1695669177/witvecawd9w49nnnptzw.jpg', 
        image2: 'https://res.cloudinary.com/dp6ggctps/image/upload/v1695669177/gn4kppic50c5sqw1qi1q.webp', 
        image3: 'https://res.cloudinary.com/dp6ggctps/image/upload/v1695669177/rrykid0fnz530tx1boq3.jpg', 
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();

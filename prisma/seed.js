const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create the data to be put into the database initially (admin account)

async function seedProducts() {
  try {
    await prisma.seller.create({
      data: {
        userId: "1234",
        email: "test@gmail.com",
        address: "test",
        zipcode: "123",
        city: "Town",
        country: "Land",
        businessName: "test",
        is_verified: true,
      },
    });

    await prisma.product.create({
      data: {
        title: "Flooring Dummy",
        description:
          "standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://ibb.co/XYn7dYC",
        price: 2500, // EG: 25.00
        category: "flooring",
        sellerId: "1234",
      },
    });

    await prisma.product.create({
      data: {
        title: "Insulation Dummy",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://ibb.co/wd2rVMb",
        price: 1999,
        category: "insulation",
        sellerId: "1234",
      },
    });

    await prisma.product.create({
      data: {
        title: "Lumber Dummy",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://ibb.co/gPFtXCz",
        price: 9999,
        category: "lumber",
        sellerId: "1234",
      },
    });

    await prisma.product.create({
      data: {
        title: "Piping Dummy",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://ibb.co/JQg4cx5",
        price: 5999,
        category: "piping",
        sellerId: "1234",
      },
    });

    await prisma.product.create({
      data: {
        title: "Roofing Dummy",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://ibb.co/z8vDK3W",
        price: 1299,
        category: "roofing",
        sellerId: "1234",
      },
    });

    await prisma.product.create({
      data: {
        title: "Sliding Dummy",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        url: "https://ibb.co/9gVnjjD",
        price: 6589,
        category: "sliding",
        sellerId: "1234",
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();

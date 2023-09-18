/*
  Warnings:

  - Added the required column `deliveryTimeDays` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deliveryTimeDays" INTEGER NOT NULL,
ADD COLUMN     "image1" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "image2" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "image3" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "image4" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "image5" TEXT NOT NULL DEFAULT 'null';

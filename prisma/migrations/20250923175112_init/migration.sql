/*
  Warnings:

  - Added the required column `rating` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Made the column `pricePerNight` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "pricePerNight" SET NOT NULL,
ALTER COLUMN "pricePerNight" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."PropertyAmenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyAmenity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PropertyAmenity" ADD CONSTRAINT "PropertyAmenity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

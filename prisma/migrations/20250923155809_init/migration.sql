-- CreateEnum
CREATE TYPE "public"."ChannelType" AS ENUM ('HOSTAWAY', 'GOOGLE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ReviewStatus" AS ENUM ('PENDING', 'HIDDEN', 'SHOWN');

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReviewChannel" (
    "id" TEXT NOT NULL,
    "type" "public"."ChannelType" NOT NULL,
    "propertyId" TEXT NOT NULL,
    "hostawayId" TEXT,
    "googleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HostawayConfig" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "propertyExternalId" TEXT NOT NULL,

    CONSTRAINT "HostawayConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GoogleConfig" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "GoogleConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "reviewerName" TEXT,
    "rating" DOUBLE PRECISION,
    "status" "public"."ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "text" TEXT,
    "propertyId" TEXT NOT NULL,
    "reviewChannelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReviewCategory" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewChannel_hostawayId_key" ON "public"."ReviewChannel"("hostawayId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewChannel_googleId_key" ON "public"."ReviewChannel"("googleId");

-- AddForeignKey
ALTER TABLE "public"."ReviewChannel" ADD CONSTRAINT "ReviewChannel_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReviewChannel" ADD CONSTRAINT "ReviewChannel_hostawayId_fkey" FOREIGN KEY ("hostawayId") REFERENCES "public"."HostawayConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReviewChannel" ADD CONSTRAINT "ReviewChannel_googleId_fkey" FOREIGN KEY ("googleId") REFERENCES "public"."GoogleConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_reviewChannelId_fkey" FOREIGN KEY ("reviewChannelId") REFERENCES "public"."ReviewChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReviewCategory" ADD CONSTRAINT "ReviewCategory_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "public"."Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

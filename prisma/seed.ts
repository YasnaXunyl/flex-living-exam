import { PrismaClient, ChannelType, ReviewStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Properties
  const property1 = await prisma.property.create({
    data: {
      name: "The Flex London Apartment",
      description:
        "A modern serviced apartment in the heart of London. Features include a fully equipped kitchen, high-speed WiFi, and stunning city views.",
      mainImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      pricePerNight: 259.99,
      city: "London",
      country: "United Kingdom",
    },
  });

  const property2 = await prisma.property.create({
    data: {
      name: "The Flex Paris Apartment",
      description:
        "A stylish flat in the heart of Paris, walking distance to major attractions. Featuring a balcony with Eiffel Tower views.",
      mainImage: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3",
      pricePerNight: 299.99,
      city: "Paris",
      country: "France",
    },
  });

  const property3 = await prisma.property.create({
    data: {
      name: "The Flex Barcelona Loft",
      description:
        "Modern loft in the Gothic Quarter. High ceilings, exposed brick, and modern amenities combine for a perfect stay.",
      mainImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      pricePerNight: 199.99,
      city: "Barcelona",
      country: "Spain",
    },
  });

  const property4 = await prisma.property.create({
    data: {
      name: "The Flex Amsterdam Canal House",
      description:
        "Traditional canal house with modern updates. Enjoy authentic Dutch living with all the comforts of home.",
      mainImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      pricePerNight: 279.99,
      city: "Amsterdam",
      country: "Netherlands",
    },
  });

  const property5 = await prisma.property.create({
    data: {
      name: "The Flex Berlin Penthouse",
      description:
        "Spacious penthouse in trendy Kreuzberg. Perfect for digital nomads with a dedicated workspace and fast internet.",
      mainImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      pricePerNight: 229.99,
      city: "Berlin",
      country: "Germany",
    },
  });

  // 2. Create Hostaway and Google configs first
  const hostawayConfig = await prisma.hostawayConfig.create({
    data: {
      apiKey: "hostaway_api_key_123",
      propertyExternalId: "HA123456",
    },
  });

  const googleConfig = await prisma.googleConfig.create({
    data: {
      placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    },
  });

  // 3. Create Review Channels for property1 using the config IDs
  const hostawayChannel = await prisma.reviewChannel.create({
    data: {
      type: ChannelType.HOSTAWAY,
      propertyId: property1.id,
      hostawayId: hostawayConfig.id,
    },
  });

  const googleChannel = await prisma.reviewChannel.create({
    data: {
      type: ChannelType.GOOGLE,
      propertyId: property1.id,
      googleId: googleConfig.id,
    },
  });

  // 4. Create Reviews individually to ensure relations
  const review1 = await prisma.review.create({
    data: {
      externalId: "HA_R1",
      propertyId: property1.id,
      reviewChannelId: hostawayChannel.id,
      reviewerName: "Alice",
      rating: 4.5,
      status: ReviewStatus.SHOWN,
      text: "Great stay! Clean and cozy.",
    },
  });

  const review2 = await prisma.review.create({
    data: {
      externalId: "G_R1",
      propertyId: property1.id,
      reviewChannelId: googleChannel.id,
      reviewerName: "Bob",
      rating: 3.8,
      status: ReviewStatus.SHOWN,
      text: "Nice location but a bit noisy.",
    },
  });

  // Additional reviews for other properties
  const otherReviews = [
    {
      externalId: "G_R2",
      propertyId: property2.id,
      reviewChannelId: googleChannel.id,
      reviewerName: "Marie",
      rating: 4.9,
      status: ReviewStatus.SHOWN,
      text: "Magnifique! The view of the Eiffel Tower was incredible.",
    },
    {
      externalId: "HA_R2",
      propertyId: property2.id,
      reviewChannelId: hostawayChannel.id,
      reviewerName: "John",
      rating: 4.7,
      status: ReviewStatus.SHOWN,
      text: "Perfect location in Paris, would stay again!",
    },
    {
      externalId: "G_R3",
      propertyId: property3.id,
      reviewChannelId: googleChannel.id,
      reviewerName: "Carlos",
      rating: 4.5,
      status: ReviewStatus.PENDING,
      text: "Great atmosphere in the Gothic Quarter.",
    },
  ];

  for (const reviewData of otherReviews) {
    const review = await prisma.review.create({
      data: reviewData,
    });

    // Add categories for each review
    await prisma.reviewCategory.createMany({
      data: [
        {
          reviewId: review.id,
          category: "Cleanliness",
          rating: reviewData.rating,
        },
        {
          reviewId: review.id,
          category: "Location",
          rating: reviewData.rating,
        },
        {
          reviewId: review.id,
          category: "Value",
          rating: Math.max((reviewData.rating ?? 0) - 0.2, 0),
        },
      ],
    });
  }

  // 5. Add Categories for Reviews
  const reviewCategoriesData = [
    { reviewId: review1.id, category: "Cleanliness", rating: review1.rating },
    {
      reviewId: review1.id,
      category: "Communication",
      rating: (review1.rating ?? 0) - 0.5,
    },
    { reviewId: review2.id, category: "Cleanliness", rating: review2.rating },
    {
      reviewId: review2.id,
      category: "Communication",
      rating: (review2.rating ?? 0) - 0.5,
    },
  ];

  await prisma.reviewCategory.createMany({
    data: reviewCategoriesData,
  });

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { ReviewStatus } from "@prisma/client";

// Types for the Hostaway API responses
export interface HostawayReview {
  id: number;
  listingMapId: number;
  channelId: number;
  reservationId: number | null;
  rating: number;
  guestName: string;
  message: string;
  response: string | null;
  messageCreatedAt: string;
  categories: {
    cleanliness?: number;
    communication?: number;
    observanceOfHouseRules?: number;
    location?: number;
    checkIn?: number;
    value?: number;
  };
  status: "active" | "inactive";
}

export interface HostawayReviewsResponse {
  status: "success";
  result: {
    total: number;
    limit: number;
    offset: number;
    reviews: HostawayReview[];
  };
}

export interface HostawayReviewResponse {
  status: "success";
  result: HostawayReview;
}

// Mock data
const mockReviews: HostawayReview[] = [
  {
    id: 1,
    listingMapId: 101,
    channelId: 1,
    reservationId: 1001,
    rating: 5,
    guestName: "John Doe",
    message: "Great place to stay! Very clean and comfortable.",
    response: "Thank you for your kind review!",
    messageCreatedAt: "2025-09-20T10:00:00Z",
    categories: {
      cleanliness: 5,
      communication: 5,
      observanceOfHouseRules: 5,
      location: 4,
      checkIn: 5,
      value: 4,
    },
    status: "active",
  },
  {
    id: 2,
    listingMapId: 102,
    channelId: 1,
    reservationId: 1002,
    rating: 4,
    guestName: "Jane Smith",
    message: "Nice location, but a bit noisy at night.",
    response: null,
    messageCreatedAt: "2025-09-19T15:30:00Z",
    categories: {
      cleanliness: 4,
      communication: 5,
      observanceOfHouseRules: 4,
      location: 3,
      checkIn: 5,
      value: 4,
    },
    status: "active",
  },
  {
    id: 3,
    listingMapId: 101,
    channelId: 2,
    reservationId: 1003,
    rating: 3,
    guestName: "Mike Johnson",
    message: "Average stay. Could use some improvements.",
    response: "We appreciate your feedback and will work on improvements.",
    messageCreatedAt: "2025-09-18T08:45:00Z",
    categories: {
      cleanliness: 3,
      communication: 4,
      observanceOfHouseRules: 4,
      location: 4,
      checkIn: 3,
      value: 3,
    },
    status: "inactive",
  },
];

/**
 * Mock implementation of the Hostaway getReviews endpoint
 * GET https://api.hostaway.com/v1/reviews
 */
export async function getReviews(options: {
  limit?: number;
  offset?: number;
  listingMapId?: number;
  channelId?: number;
  reservationId?: number;
  status?: "active" | "inactive";
}): Promise<HostawayReviewsResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredReviews = [...mockReviews];

  // Apply filters
  if (options.listingMapId) {
    filteredReviews = filteredReviews.filter(
      (review) => review.listingMapId === options.listingMapId
    );
  }

  if (options.channelId) {
    filteredReviews = filteredReviews.filter(
      (review) => review.channelId === options.channelId
    );
  }

  if (options.reservationId) {
    filteredReviews = filteredReviews.filter(
      (review) => review.reservationId === options.reservationId
    );
  }

  if (options.status) {
    filteredReviews = filteredReviews.filter(
      (review) => review.status === options.status
    );
  }

  // Apply pagination
  const offset = options.offset || 0;
  const limit = options.limit || 10;
  const paginatedReviews = filteredReviews.slice(offset, offset + limit);

  return {
    status: "success",
    result: {
      total: filteredReviews.length,
      limit,
      offset,
      reviews: paginatedReviews,
    },
  };
}

/**
 * Mock implementation of the Hostaway getReview endpoint
 * GET https://api.hostaway.com/v1/reviews/{reviewId}
 */
export async function getReview(
  reviewId: number
): Promise<HostawayReviewResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const review = mockReviews.find((r) => r.id === reviewId);

  if (!review) {
    throw new Error(`Review with ID ${reviewId} not found`);
  }

  return {
    status: "success",
    result: review,
  };
}

export function convertHostawayReview(hostawayReview: HostawayReview) {
  return {
    externalId: hostawayReview.id.toString(),
    reviewChannelId: hostawayReview.channelId.toString(),
    propertyId: hostawayReview.listingMapId.toString(),
    reviewerName: hostawayReview.guestName,
    rating: hostawayReview.rating,
    text: hostawayReview.message,
    status: ReviewStatus.PENDING,
    categories: [
      {
        category: "Cleanliness",
        rating: hostawayReview.categories.cleanliness,
      },
      {
        category: "Communication",
        rating: hostawayReview.categories.communication,
      },
      {
        category: "Check-in",
        rating: hostawayReview.categories.checkIn,
      },
      {
        category: "Accuracy",
        rating: hostawayReview.categories.observanceOfHouseRules,
      },
      {
        category: "Location",
        rating: hostawayReview.categories.location,
      },
      {
        category: "Value",
        rating: hostawayReview.categories.value,
      },
    ].filter((cat) => cat.rating !== undefined),
  };
}

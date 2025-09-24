// mock-google-api.ts

import { ReviewStatus } from "@prisma/client";

export interface NormalizedReview {
  externalId: string;
  reviewerName: string | null;
  rating: number | null;
  status: ReviewStatus;
  text: string | null;
  categories: {
    id: string;
    category: string;
    rating: number | null;
  }[];
}

export interface PlaceOptions {
  placeId: string;
  apiKey: string;
}

export class MockGooglePlaces {
  placeId: string;
  apiKey: string;

  constructor({ placeId, apiKey }: PlaceOptions) {
    this.placeId = placeId;
    this.apiKey = apiKey;
  }

  // Simulates fetching Google reviews and normalizes them
  async fetchReviews(): Promise<NormalizedReview[]> {
    // Simulate different data based on placeId
    const mockData: Record<string, NormalizedReview[]> = {
      ChIJpyiwa4Zw44kRBQSGWKv4wgA: [
        {
          externalId: "google-1",
          reviewerName: "John Doe",
          rating: 5,
          status: ReviewStatus.SHOWN,
          text: "Amazing place! Loved the atmosphere.",
          categories: [
            { id: "1", category: "Cleanliness", rating: 5 },
            { id: "2", category: "Service", rating: 4 },
          ],
        },
        {
          externalId: "google-2",
          reviewerName: "Jane Smith",
          rating: 4,
          status: ReviewStatus.SHOWN,
          text: "Great food and shops.",
          categories: [
            { id: "3", category: "Location", rating: 4 },
            { id: "4", category: "Value", rating: 4 },
          ],
        },
      ],
      default: [],
    };

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return mockData[this.placeId] ?? mockData.default;
  }
}

"use server";

import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";

export async function updateReviewStatus(formData: FormData) {
  const reviewId = formData.get("reviewId") as string;
  const status = formData.get("status") as ReviewStatus;

  await prisma.review.update({
    where: { id: reviewId },
    data: { status },
  });
}

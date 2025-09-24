import { Review } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface ReviewWithCategories extends Review {
  categories: {
    id: string;
    category: string;
    rating: number | null;
  }[];
}

interface ReviewsListProps {
  reviews: ReviewWithCategories[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <p className="text-muted-foreground">No reviews yet.</p>
      </div>
    );
  }

  const averageRating =
    reviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
    reviews.length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="text-lg">★</span>
          <span className="font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">
            {reviews.length} reviews
          </span>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="min-w-[320px] max-w-sm flex-shrink-0 border rounded-2xl shadow-sm"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {review.reviewerName || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(review.createdAt), "MMMM yyyy")}
                  </p>
                </div>
                {review.rating && (
                  <div className="flex items-center gap-1 text-primary font-medium">
                    <span>★</span>
                    <span>{review.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {review.text && (
                <p className="text-sm leading-relaxed">{review.text}</p>
              )}

              {review.categories.length > 0 && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {review.categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex justify-between items-center rounded-md border px-2 py-1 text-xs"
                      >
                        <span className="text-muted-foreground">
                          {category.category}
                        </span>
                        <span className="font-medium">
                          {category.rating?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

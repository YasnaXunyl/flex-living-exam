import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { ReviewStatus } from "@prisma/client";

async function getManagerMetrics() {
  const [propertyCount, totalReviews, pendingReviews] = await Promise.all([
    prisma.property.count(),
    prisma.review.count(),
    prisma.review.count({
      where: {
        status: ReviewStatus.PENDING,
      },
    }),
  ]);

  return {
    propertyCount,
    totalReviews,
    pendingReviews,
  };
}

export async function ManagerSummary() {
  const metrics = await getManagerMetrics();

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <Card className="col-span-full p-6">
        <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Total Properties
            </p>
            <p className="text-2xl font-bold">{metrics.propertyCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </p>
            <p className="text-2xl font-bold">{metrics.totalReviews}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Pending Reviews
            </p>
            <p className="text-2xl font-bold">{metrics.pendingReviews}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

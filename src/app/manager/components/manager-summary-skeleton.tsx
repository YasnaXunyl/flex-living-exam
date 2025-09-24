import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ManagerSummarySkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <Card className="col-span-full p-6">
        <Skeleton className="h-6 w-32 mb-4" /> {/* Title skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Metric blocks */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" /> {/* Metric label */}
              <Skeleton className="h-8 w-16" /> {/* Metric value */}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

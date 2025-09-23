import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Image gallery skeleton */}
      <div className="grid gap-4">
        <Skeleton className="aspect-[16/9] w-full" />
        <div className="grid grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
        </div>
      </div>

      {/* Property info skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Amenities skeleton */}
      <div className="border-t pt-8 space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
        </div>
      </div>

      {/* Location skeleton */}
      <div className="border-t pt-8 space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="aspect-video w-full" />
      </div>
    </div>
  );
}

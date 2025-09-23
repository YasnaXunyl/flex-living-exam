import { Property, Review } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { ReserveCard } from "./reserve-card";
import { ReviewsList } from "./reviews-list";

interface PropertyInfoProps {
  property: Property & {
    reviews: (Review & {
      categories: {
        id: string;
        category: string;
        rating: number | null;
      }[];
    })[];
  };
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About this space</h2>
          <p className="text-muted-foreground leading-relaxed">
            {property.description}
          </p>
        </div>
        <Separator />

        <ReviewsList reviews={property.reviews} />
      </div>

      <div className="md:col-span-1">
        <div className="sticky top-8">
          <ReserveCard property={property} />
        </div>
      </div>
    </div>
  );
}

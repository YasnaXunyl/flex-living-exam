import { Property } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Heart, Share } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PropertyHeaderProps {
  property: Property;
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-foreground">{property.name}</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-sm">
              {property.rating ? `★ ${property.rating}` : "No ratings"}
            </span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm text-muted-foreground">
            {property.city}, {property.country}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="rounded-full">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="secondary" size="sm" className="rounded-full">
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

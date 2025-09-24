import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Property } from "@prisma/client";

interface LocationProps {
  property: Property;
}

export function Location({ property }: LocationProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Where you&apos;ll be</h2>
      <Card className="aspect-[16/9] w-full">
        {/* Note: In a real app, you would integrate Google Maps here */}
        <div className="h-full w-full flex items-center justify-center bg-secondary/50">
          <div className="text-center space-y-2">
            <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              #12 Main st
              <br />
              {property.city}, {property.country}
            </div>
          </div>
        </div>
      </Card>
      <div className="space-y-2">
        <h3 className="font-medium">{property.city}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This property is located in the heart of {property.city}. You&apos;ll
          be close to public transportation, restaurants, and major attractions.
        </p>
      </div>
    </div>
  );
}

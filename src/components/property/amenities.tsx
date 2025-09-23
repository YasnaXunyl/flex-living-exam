import { Property } from "@/types/property";
import {
  LucideIcon,
  Wifi,
  Tv,
  Car,
  DumbbellIcon,
  Fan,
  Utensils,
  WashingMachine,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AmenitiesProps {
  property: Property;
}

const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  tv: Tv,
  parking: Car,
  dumbbell: DumbbellIcon,
  fan: Fan,
  utensils: Utensils,
  "washing-machine": WashingMachine,
  dryer: Wind,
};

export function Amenities({ property }: AmenitiesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">What this place offers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {property.amenities.map((amenity) => {
          const Icon = iconMap[amenity.icon] || Wifi;
          return (
            <Card key={amenity.id} className="flex items-center gap-4 p-4">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{amenity.name}</span>
            </Card>
          );
        })}
      </div>
      <Button variant="outline" className="md:w-auto">
        Show all amenities
      </Button>
    </div>
  );
}

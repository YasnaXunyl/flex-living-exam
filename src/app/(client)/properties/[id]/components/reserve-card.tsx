import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Property } from "@prisma/client";

interface ReserveCardProps {
  property: Property;
}

export function ReserveCard({ property }: ReserveCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold">
              USD {property.pricePerNight}{" "}
              <span className="text-sm font-normal">night</span>
            </span>
            {property.rating && (
              <span className="text-sm text-muted-foreground">
                ★ {property.rating.toFixed(1)}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="check-in">Check in</Label>
              <Input type="date" id="check-in" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-out">Check out</Label>
              <Input type="date" id="check-out" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests">Guests</Label>
            <Input type="number" id="guests" placeholder="1" min={1} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button className="w-full">Reserve</Button>
      </CardFooter>
    </Card>
  );
}

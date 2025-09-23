import { Property } from "@/types/property";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface PropertyInfoProps {
  property: Property;
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="text-xl font-semibold">
              Entire apartment hosted by Flex Living
            </h2>
            <div className="text-muted-foreground">
              {property.details.guests} guests • {property.details.bedrooms}{" "}
              bedrooms • {property.details.beds} beds •{" "}
              {property.details.bathrooms} bathrooms
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-secondary" />
        </div>
        <Separator />
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About this space</h2>
          <p className="text-muted-foreground leading-relaxed">
            {property.description}
          </p>
        </div>
      </div>

      <div className="md:col-span-1">
        <Card className="sticky top-8">
          <div className="p-6 space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold">
                  {property.price.currency} {property.price.perNight}
                </span>
                <span className="text-muted-foreground"> /night</span>
              </div>
              <div className="text-sm">
                <span className="text-foreground">★ {property.rating}</span>
                <span className="text-muted-foreground">
                  {" "}
                  • {property.reviews} reviews
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="check-in">Check-in</Label>
                <Input id="check-in" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="check-out">Check-out</Label>
                <Input id="check-out" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guests">Guests</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 guest</SelectItem>
                    <SelectItem value="2">2 guests</SelectItem>
                    <SelectItem value="3">3 guests</SelectItem>
                    <SelectItem value="4">4 guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Reserve
            </Button>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service fee</span>
                <span>{property.price.currency} 50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>{property.price.currency} 30</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>
                  {property.price.currency} {property.price.perNight + 50 + 30}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/generated/prisma/client";

export type PropertyCardProps = Pick<
  Property,
  "id" | "name" | "mainImage" | "pricePerNight" | "city" | "country"
>;

const PropertyCard = ({
  id,
  name,
  mainImage,
  pricePerNight,
  city,
  country,
}: PropertyCardProps) => {
  return (
    <Link href={`/properties/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-[16/9] relative">
          <Image
            src={mainImage || "/placeholder-property.jpg"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">{name}</h2>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {city && country
                ? `${city}, ${country}`
                : "Location available soon"}
            </span>
            <span className="font-medium">
              {pricePerNight
                ? `USD ${pricePerNight}/night`
                : "Price on request"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;

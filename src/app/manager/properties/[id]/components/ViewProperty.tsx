import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Property } from "@prisma/client";
import Image from "next/image";
import { MapPin, Star, DollarSign, Calendar } from "lucide-react";
import {
  columns,
  ReviewWithCategories,
} from "@/components/property/reviews/columns";

interface ViewPropertyProps {
  property: Property & {
    reviews: ReviewWithCategories[];
  };
}

export async function ViewProperty({ property }: ViewPropertyProps) {
  return (
    <div className="space-y-6">
      {/* Property Info */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                {property.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>
                  {property.city}, {property.country}
                </span>
                {property.rating && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{property.rating.toFixed(1)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-lg font-semibold">
                <DollarSign className="w-5 h-5" />
                {property.pricePerNight}
              </div>
              <span className="text-sm text-muted-foreground">per night</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold">About this property</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {property.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Reviews</Label>
              <p className="font-semibold text-lg flex items-center gap-1">
                <Star className="w-4 h-4" />
                {property.reviews.length}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Location</Label>
              <p className="font-semibold text-lg flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {property.city}, {property.country}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Added</Label>
              <p className="font-semibold text-lg flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(property.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="p-6" id="reviews">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Property Reviews</h2>
            <p className="text-sm text-muted-foreground">
              {property.reviews.length} reviews in total
            </p>
          </div>
          <DataTable columns={columns} data={property.reviews} />
        </div>
      </Card>

      {/* Main Image */}
      {property.mainImage && (
        <Card className="p-6" id="main-image">
          <div className="space-y-2">
            <h3 className="font-semibold">Property Image</h3>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={property.mainImage}
                alt={property.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

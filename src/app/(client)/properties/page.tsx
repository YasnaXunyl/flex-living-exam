import { mockProperty } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function PropertiesPage() {
  // In a real app, we would fetch properties from an API
  const properties = Array(6)
    .fill(mockProperty)
    .map((p, i) => ({
      ...p,
      id: `${i + 1}`,
    }));

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link key={property.id} href={`/properties/${property.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[16/9] relative">
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">{property.name}</h2>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {property.location.city}, {property.location.country}
                  </span>
                  <span className="font-medium">
                    {property.price.currency} {property.price.perNight}/night
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

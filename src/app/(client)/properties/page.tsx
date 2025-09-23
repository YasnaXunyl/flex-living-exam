import { prisma } from "@/lib/db";
import PropertyCard, {
  PropertyCardProps,
} from "@/components/property/property-card";

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      mainImage: true,
      pricePerNight: true,
      city: true,
      country: true,
    },
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property: PropertyCardProps) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";
import { ReviewStatus } from "@/generated/prisma/wasm";

import { PropertyHeader } from "./components/property-header";
import { ImageGallery } from "./components/image-gallery";
import { PropertyInfo } from "./components/property-info";
import { Amenities } from "./components/amenities";
import { Location } from "./components/location";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      reviews: {
        where: {
          status: ReviewStatus.SHOWN,
        },
        include: {
          categories: true,
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PropertyHeader property={property} />
      <ImageGallery property={property} />
      <PropertyInfo property={property} />
      <div className="border-t pt-8">
        <Amenities />
      </div>
      <div className="border-t pt-8">
        <Location property={property} />
      </div>
    </div>
  );
}

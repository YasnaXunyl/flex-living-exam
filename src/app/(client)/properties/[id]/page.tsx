import { mockProperty } from "@/lib/mock-data";
import { PropertyHeader } from "./components/property-header";
import { ImageGallery } from "./components/image-gallery";
import { PropertyInfo } from "./components/property-info";
import { Amenities } from "./components/amenities";
import { Location } from "./components/location";

interface PropertyPageProps {
  params: {
    id: string;
  };
  searchParams: {
    guests?: string;
  };
}

export default function PropertyPage({
  params,
  searchParams,
}: PropertyPageProps) {
  // In a real app, we would fetch the property data here based on the ID
  const property = mockProperty;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PropertyHeader property={property} />
      <ImageGallery property={property} />
      <PropertyInfo property={property} />
      <div className="border-t pt-8">
        <Amenities property={property} />
      </div>
      <div className="border-t pt-8">
        <Location property={property} />
      </div>
    </div>
  );
}

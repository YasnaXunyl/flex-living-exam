import { Property } from "@/types/property";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  property: Property;
}

export function ImageGallery({ property }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-4 gap-4 rounded-xl overflow-hidden h-[480px]">
      <div className="col-span-2 row-span-2 relative">
        <Image
          src={property.images[0]}
          alt={property.name}
          className="object-cover"
          fill
        />
      </div>
      {property.images.slice(1, 5).map((image, index) => (
        <div
          key={image}
          className={cn("relative", {
            "hidden md:block": index >= 2,
          })}
        >
          <Image
            src={image}
            alt={`${property.name} - Image ${index + 2}`}
            className="object-cover"
            fill
          />
        </div>
      ))}
      <Button
        variant="secondary"
        size="sm"
        className="absolute bottom-4 right-4 rounded-full"
      >
        Show all photos
      </Button>
    </div>
  );
}

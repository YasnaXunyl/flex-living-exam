import Image from "next/image";
import { cn } from "@/lib/utils";
import { Property } from "@/generated/prisma/wasm";

interface ImageGalleryProps {
  property: Property;
}

export function ImageGallery({ property }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-4 gap-4 rounded-xl overflow-hidden h-[480px]">
      <div className="col-span-2 row-span-2 relative">
        <Image
          src={property.mainImage ?? "/placeholder.png"}
          alt={property.name}
          className="object-cover"
          fill
        />
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn("relative", {
            "col-span-2 row-span-2": index === 0,
            "hidden md:block": index > 1,
          })}
        >
          <Image
            src={property.mainImage ?? "/placeholder.png"}
            alt={`${property.name} - Image ${index + 1}`}
            className="object-cover"
            fill
          />
        </div>
      ))}
    </div>
  );
}

export interface Property {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: {
    perNight: number;
    currency: string;
  };
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  amenities: {
    id: string;
    name: string;
    category: string;
    icon: string;
  }[];
  details: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  rating: number;
  reviews: number;
}

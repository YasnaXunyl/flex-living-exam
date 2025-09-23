import { Property } from "@/types/property";

export const mockProperty: Property = {
  id: "98674",
  name: "Luxury Apartment in Downtown",
  description:
    "Experience urban living at its finest in this meticulously designed apartment. Featuring modern amenities and stunning city views, this space offers the perfect blend of comfort and sophistication.",
  images: [
    "/properties/98674/main.jpg",
    "/properties/98674/living.jpg",
    "/properties/98674/bedroom.jpg",
    "/properties/98674/kitchen.jpg",
    "/properties/98674/bathroom.jpg",
  ],
  price: {
    perNight: 250,
    currency: "USD",
  },
  location: {
    address: "123 Downtown Street",
    city: "New York",
    country: "United States",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  amenities: [
    { id: "wifi", name: "High-speed WiFi", category: "Basic", icon: "wifi" },
    { id: "ac", name: "Air conditioning", category: "Climate", icon: "fan" },
    {
      id: "kitchen",
      name: "Full kitchen",
      category: "Kitchen",
      icon: "utensils",
    },
    { id: "tv", name: "Smart TV", category: "Entertainment", icon: "tv" },
    {
      id: "washer",
      name: "Washer",
      category: "Laundry",
      icon: "washing-machine",
    },
    { id: "dryer", name: "Dryer", category: "Laundry", icon: "dryer" },
    {
      id: "parking",
      name: "Free parking",
      category: "Outdoor",
      icon: "parking",
    },
    { id: "gym", name: "Gym access", category: "Fitness", icon: "dumbbell" },
  ],
  details: {
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
  },
  rating: 4.8,
  reviews: 156,
};

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ManagerPropertiesPage() {
  // In a real app, we would fetch properties from an API
  const properties = Array(6)
    .fill({})
    .map((p, i) => ({
      ...p,
      id: `${i + 1}`,
    }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.name}</TableCell>
              <TableCell>
                {property.location.city}, {property.location.country}
              </TableCell>
              <TableCell>USD {property.pricePerNight}/night</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" asChild>
                  <Link href={`/manager/properties/${property.id}`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

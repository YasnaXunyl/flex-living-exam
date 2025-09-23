import { mockProperty } from "@/lib/mock-data";
import { EditPropertyForm } from "./components/EditPropertyForm";
import { ReservationTable } from "./components/ReservationTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface ManagerPropertyPageProps {
  params: {
    id: string;
  };
}

export default function ManagerPropertyPage({
  params,
}: ManagerPropertyPageProps) {
  // In a real app, we would fetch property data based on the ID
  const property = mockProperty;

  const handleSave = (updatedProperty: typeof property) => {
    // In a real app, we would save the updated property data
    console.log("Saving property:", updatedProperty);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Property</h1>
        <p className="text-muted-foreground">
          Update property information and manage reservations
        </p>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Property Details</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <EditPropertyForm property={property} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="reservations">
          <Card>
            <ReservationTable propertyId={params.id} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

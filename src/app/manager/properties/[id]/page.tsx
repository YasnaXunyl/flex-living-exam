import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ViewProperty } from "./components/ViewProperty";
import { ReservationTable } from "./components/ReservationTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface ManagerPropertyPageProps {
  params: { id: string };
  searchParams?: {
    page?: string;
    rows?: string;
    sort?: string;
    order?: "asc" | "desc";
  };
}

export default async function ManagerPropertyPage({
  params,
  searchParams,
}: ManagerPropertyPageProps) {
  const { id } = params;
  const {
    page: pageParam,
    rows: rowsParam,
    sort: sortParam,
    order: orderParam,
  } = (await searchParams) ?? {};

  const page = Number(pageParam ?? 1);
  const pageSize = Number(rowsParam ?? 10);
  const sortField = sortParam ?? "createdAt";
  const sortOrder = (orderParam as "asc" | "desc") ?? "desc";

  const allowedSortFields = [
    "createdAt",
    "rating",
    "reviewerName",
    "text",
    "status",
  ];

  const safeSortField = allowedSortFields.includes(sortField)
    ? sortField
    : "createdAt";

  const safeSortOrder = sortOrder === "asc" ? "asc" : "desc";

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: { [safeSortField]: safeSortOrder },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          categories: true,
          property: {
            select: {
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Property information</h1>
        <p className="text-muted-foreground">
          View property information and manage reservations
        </p>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Property Details</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <ViewProperty property={property} />
        </TabsContent>

        <TabsContent value="reservations">
          <Card>
            <ReservationTable propertyId={id} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

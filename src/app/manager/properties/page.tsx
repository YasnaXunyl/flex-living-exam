import { columns } from "@/components/property/columns";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/data-table";

interface ManagerPropertiesPageProps {
  searchParams?: {
    page?: string;
    q?: string;
    sort?: string;
    rows?: string;
    order?: "asc" | "desc";
  };
}

export default async function ManagerPropertiesPage({
  searchParams,
}: ManagerPropertiesPageProps) {
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
    "name",
    "pricePerNight",
    "city",
    "country",
    "rating",
  ];

  const safeSortField = allowedSortFields.includes(sortField)
    ? sortField
    : "createdAt";

  const safeSortOrder = sortOrder === "asc" ? "asc" : "desc";

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      orderBy: { [safeSortField]: safeSortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    }),
    prisma.property.count(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Button disabled={true} className="cursor-not-allowed">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={properties}
        pageCount={Math.ceil(total / pageSize)}
      />
    </div>
  );
}

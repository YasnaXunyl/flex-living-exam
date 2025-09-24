import { columns, ReviewWithProperty } from "@/components/review/columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { prisma } from "@/lib/db";

interface ManagerReviewsPageProps {
  searchParams?: {
    page?: string;
    q?: string;
    sort?: string;
    rows?: string;
    order?: "asc" | "desc";
  };
}

export default async function ManagerReviewsPage({
  searchParams,
}: ManagerReviewsPageProps) {
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

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      orderBy: { [safeSortField]: safeSortOrder },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        externalId: true,
        reviewerName: true,
        rating: true,
        status: true,
        text: true,
        propertyId: true,
        reviewChannelId: true,
        createdAt: true,
        updatedAt: true,
        property: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            id: true,
            category: true,
            rating: true,
          },
        },
      },
    }),
    prisma.review.count(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reviews</h1>
      </div>
      <DataTable<ReviewWithProperty, unknown>
        columns={columns}
        data={reviews}
        pageCount={Math.ceil(total / pageSize)}
      />
    </div>
  );
}

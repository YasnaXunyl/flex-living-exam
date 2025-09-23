"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Review, ReviewStatus } from "@/generated/prisma";

type ReviewWithProperty = Review & {
  property: {
    name: string;
  };
};

const columns: ColumnDef<ReviewWithProperty>[] = [
  {
    accessorKey: "reviewerName",
    header: "Reviewer",
  },
  {
    accessorKey: "property.name",
    header: "Property",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as ReviewStatus;
      return (
        <Badge variant={status === "SHOWN" ? "default" : "secondary"}>
          {status.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "PPP");
    },
  },
];

export default function ReviewsPage() {
  const [data, setData] = useState<ReviewWithProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchReviews();
  }, [currentPage, pageSize]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `/api/reviews?page=${currentPage}&pageSize=${pageSize}`
      );
      const result = await response.json();
      setData(result.reviews);
      setPageCount(Math.ceil(result.total / pageSize));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Reviews</h1>
      <DataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

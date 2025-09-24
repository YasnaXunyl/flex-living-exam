"use client";

import Link from "next/link";
import { ReviewStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateReviewStatus } from "@/app/actions/review-action";

export type ReviewWithCategories = {
  id: string;
  externalId: string;
  reviewerName: string | null;
  rating: number | null;
  status: ReviewStatus;
  text: string | null;
  propertyId: string;
  reviewChannelId: string;
  createdAt: Date;
  updatedAt: Date;
  property: {
    name: string;
  };
  categories: {
    id: string;
    category: string;
    rating: number | null;
  }[];
};

export const columns: ColumnDef<ReviewWithCategories>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const review = row.original;
      const formId = `review-${review.id}-form`;
      return (
        <form action={updateReviewStatus}>
          <input type="hidden" name="reviewId" value={review.id} id={formId} />
          <Select
            name="status"
            defaultValue={review.status}
            onValueChange={(value) => {
              const form = document.getElementById(
                formId
              ) as HTMLFormElement | null;
              if (form) {
                const selectInput = document.createElement("input");
                selectInput.type = "hidden";
                selectInput.name = "status";
                selectInput.value = value;
                form.appendChild(selectInput);
                form.requestSubmit();
              }
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ReviewStatus.SHOWN}>Shown</SelectItem>
              <SelectItem value={ReviewStatus.HIDDEN}>Hidden</SelectItem>
            </SelectContent>
          </Select>
        </form>
      );
    },
  },
  {
    id: "propertyName",
    header: "Property",
    cell: ({ row }) => <div>{row.original.property.name}</div>,
  },
  {
    accessorKey: "reviewerName",
    header: "Reviewer",
    cell: ({ row }) => row.original.reviewerName || "Anonymous",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) =>
      row.original.rating ? `${row.original.rating.toFixed(1)} ★` : "No rating",
  },
  {
    accessorKey: "text",
    header: "Review",
    cell: ({ row }) => row.original.text ?? "No description",
  },
  {
    id: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const review = row.original;
      return review.categories.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {review.categories.map((cat) => (
            <div
              key={cat.id}
              className="flex justify-between items-center rounded-md border px-2 py-1 text-xs"
            >
              <span className="text-muted-foreground">{cat.category}</span>
              <span className="font-medium">
                {cat.rating?.toFixed(1) ?? "N/A"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-muted-foreground">No categories</span>
      );
    },
  },
  {
    id: "actions",
    header: "View As",
    cell: ({ row }) => {
      const review = row.original;
      return (
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/properties/${review.propertyId}`}>Customer</Link>
          </Button>
        </div>
      );
    },
  },
];

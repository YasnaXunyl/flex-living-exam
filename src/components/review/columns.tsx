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

export type ReviewWithProperty = {
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

export const columns: ColumnDef<ReviewWithProperty>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        className="inline-flex items-center hover:text-accent-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        {column.getIsSorted() === "asc"
          ? " ↑"
          : column.getIsSorted() === "desc"
          ? " ↓"
          : ""}
      </button>
    ),
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
    enableSorting: true,
  },
  {
    id: "propertyName",
    header: ({ column }) => (
      <button
        className="inline-flex items-center hover:text-accent-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Property
        {column.getIsSorted() === "asc"
          ? " ↑"
          : column.getIsSorted() === "desc"
          ? " ↓"
          : ""}
      </button>
    ),
    cell: ({ row }) => <div>{row.original.property.name}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <button
        className="inline-flex items-center hover:text-accent-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rating
        {column.getIsSorted() === "asc"
          ? " ↑"
          : column.getIsSorted() === "desc"
          ? " ↓"
          : ""}
      </button>
    ),
    cell: ({ row }) => {
      const rating = row.original.rating;
      return (
        <div className="font-medium">
          {rating ? (
            <div className="flex items-center gap-1">
              <span className="text-xl">{rating}</span>
              <span className="text-yellow-500">★</span>
            </div>
          ) : (
            "No rating"
          )}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "text",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[400px] truncate">
        {row.original.text ?? "No description"}
      </div>
    ),
  },
  {
    id: "categories",
    header: "Tags",
    cell: ({ row }) => {
      const review = row.original;
      return review.categories.length > 0 ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {review.categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center rounded-md border px-2 py-1 text-xs"
              >
                <span className="text-muted-foreground">
                  {category.category}
                </span>
                <span className="font-medium">
                  {category.rating?.toFixed(1) ?? "N/A"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground">No categories</span>
      );
    },
  },
  {
    id: "actions",
    header: "View as",
    cell: ({ row }) => {
      const review = row.original;
      return (
        <div className="flex flex-col gap-2 px-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/properties/${review.propertyId}`}>Customer</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/manager/properties/${review.propertyId}`}>
              Property Manager
            </Link>
          </Button>
        </div>
      );
    },
  },
];

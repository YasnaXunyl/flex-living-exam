"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Property } from "@prisma/client";
import Link from "next/link";

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="inline-flex items-center hover:text-accent-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        {column.getIsSorted() === "asc"
          ? " ↑"
          : column.getIsSorted() === "desc"
          ? " ↓"
          : ""}
      </button>
    ),
    cell: ({ row }) => row.original.name ?? "Unnamed Property",
    enableSorting: true,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <button
        className="inline-flex items-center hover:text-accent-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        City
        {column.getIsSorted() === "asc"
          ? " ↑"
          : column.getIsSorted() === "desc"
          ? " ↓"
          : ""}
      </button>
    ),
    cell: ({ row }) => row.original.city ?? "Not set",
    enableSorting: true,
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <button
        className="inline-flex items-center hover:text-accent-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Country
        {column.getIsSorted() === "asc"
          ? " ↑"
          : column.getIsSorted() === "desc"
          ? " ↓"
          : ""}
      </button>
    ),
    cell: ({ row }) => row.original.country ?? "Not set",
    enableSorting: true,
  },
  {
    accessorKey: "pricePerNight",
    header: ({ column }) => (
      <button
        className="inline-flex items-center hover:text-accent-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        {column.getIsSorted() === "asc"
          ? " ↑"
          : column.getIsSorted() === "desc"
          ? " ↓"
          : ""}
      </button>
    ),
    cell: ({ row }) => `USD ${row.original.pricePerNight}/night`,
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
      return rating ? `${rating.toFixed(1)} ⭐` : "No ratings";
    },
    enableSorting: true,
  },
  {
    id: "link",
    cell: ({ row }) => {
      return (
        <Link
          href={`/manager/properties/${row.original.id}`}
          className="block hover:bg-accent hover:text-accent-foreground p-2 -m-2 rounded"
        >
          View Details →
        </Link>
      );
    },
  },
];

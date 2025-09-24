"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter, useSearchParams } from "next/navigation";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount = 1,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current values from URL
  const page = searchParams?.get("page") ?? "1";
  const sort = searchParams?.get("sort");
  const order = searchParams?.get("order") as "asc" | "desc" | undefined;
  const size = searchParams?.get("size") ?? "10";

  // Create URL update function
  const createQueryString = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });

    return newSearchParams.toString();
  };

  // Initial sorting state from URL
  const initialSorting: SortingState =
    sort && order ? [{ id: sort, desc: order === "desc" }] : [];

  const table = useReactTable({
    data,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (updater) => {
      let newSorting: SortingState = [];

      if (typeof updater === "function") {
        newSorting = updater(initialSorting);
      } else {
        newSorting = updater;
      }

      if (newSorting.length > 0) {
        router.push(
          "?" +
            createQueryString({
              sort: newSorting[0].id,
              order: newSorting[0].desc ? "desc" : "asc",
            })
        );
      } else {
        router.push(
          "?" +
            createQueryString({
              sort: null,
              order: null,
            })
        );
      }
    },
    onPaginationChange: (updater) => {
      let newPagination = table.getState().pagination;

      if (typeof updater === "function") {
        newPagination = updater(newPagination);
      } else {
        newPagination = updater;
      }

      router.push(
        "?" +
          createQueryString({
            page: (newPagination.pageIndex + 1).toString(),
            size: newPagination.pageSize.toString(),
          })
      );
    },
    state: {
      sorting: initialSorting,
      pagination: {
        pageSize: Number(size),
        pageIndex: Number(page) - 1,
      },
    },
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

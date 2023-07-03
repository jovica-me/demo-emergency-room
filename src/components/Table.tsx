import { RouterInputs, RouterOutputs, api } from "@/utils/api";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowData,
  TableOptions,
} from "@tanstack/react-table";
import { ProcedureUseQuery } from "@trpc/react-query/dist/createTRPCReact";
import { Procedure, inferProcedureOutput } from "@trpc/server";
import { NextRouter, useRouter } from "next/router";

export default function Table<TData extends RowData>({
  options,
  back,
  forward,
  goTo,
  tableRowClick,
}: {
  options: TableOptions<TData>;
  back?: () => void;
  forward?: () => void;
  goTo?: (n: number) => void;
  tableRowClick?: (row: TData, router: NextRouter) => void;
}) {
  const table = useReactTable(options);
  const router = useRouter();

  const usePagination = forward && back && goTo;
  return (
    <>
      <section className="container mx-auto">
        <div className="flex flex-col">
          <div className=" overflow-x-auto ">
            <div className="inline-block min-w-full  align-middle">
              <div className="overflow-hidden border border-gray-200   md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50  ">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            scope="col"
                            className=" py-3.5 text-center text-sm font-normal text-gray-500 rtl:text-right  "
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white ">
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className={
                          tableRowClick &&
                          `pointer-events-auto cursor-pointer hover:bg-gray-100`
                        }
                        onClick={() => {
                          if (tableRowClick)
                            tableRowClick(row.original, router);
                        }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="whitespace-nowrap px-4 py-4 text-sm"
                          >
                            <div>
                              <span className="flex justify-center text-gray-700 ">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </span>
                              {/* <p className="text-gray-500  ">
                                Web-based sales doc management
                              </p> */}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {usePagination && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => {
                back();
              }}
              className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </button>

            <div className="hidden items-center gap-x-3 md:flex">
              <button
                className="rounded-md bg-blue-100/60 px-2 py-1 text-sm   text-blue-500"
                onClick={() => {
                  goTo(0);
                }}
              >
                1
              </button>
            </div>

            <button
              onClick={() => {
                forward();
              }}
              className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        )}
      </section>
    </>
  );
}

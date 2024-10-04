import { Button } from "../base";
import { SearchInput } from "../forms";
import { TableBody } from "./TableBody";
import { TableCard } from "./TableCard";
import { TableCell } from "./TableCell";
import { TableHead } from "./TableHead";
import { TableHeading } from "./TableHeading";
import { TableRow } from "./TableRow";
import { TableWrapper } from "./TableWrapper";

export function Table() {
  return (
    <TableCard>
      <div className="pb-3 flex gap-3 items-center justify-between">
        <SearchInput />
        <div className="flex gap-3">
          <Button type="button" Variant="outline">
            Import
          </Button>
          <Button type="button">Create</Button>
        </div>
      </div>
      <TableWrapper>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <TableHead>
            <TableRow>
              <TableHeading>
                <div className="flex items-center h-5">
                  <input
                    id="hs-table-pagination-checkbox-all"
                    type="checkbox"
                    className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="hs-table-pagination-checkbox-all"
                    className="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </TableHeading>
              <TableHeading>Name</TableHeading>
              <TableHeading>Age</TableHeading>
              <TableHeading>Address</TableHeading>
              <TableHeading>Action</TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center h-5">
                  <input
                    id="hs-table-pagination-checkbox-1"
                    type="checkbox"
                    className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="hs-table-pagination-checkbox-1"
                    className="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </TableCell>
              <TableCell>John Brown</TableCell>
              <TableCell>45</TableCell>
              <TableCell>New York No. 1 Lake Park</TableCell>
              <TableCell>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="flex items-center h-5">
                  <input
                    id="hs-table-pagination-checkbox-2"
                    type="checkbox"
                    className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="hs-table-pagination-checkbox-2"
                    className="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </TableCell>
              <TableCell>Jim Green</TableCell>
              <TableCell>27</TableCell>
              <TableCell>London No. 1 Lake Park</TableCell>
              <TableCell>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="flex items-center h-5">
                  <input
                    id="hs-table-pagination-checkbox-3"
                    type="checkbox"
                    className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="hs-table-pagination-checkbox-3"
                    className="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </TableCell>
              <TableCell>Joe Black</TableCell>
              <TableCell>31</TableCell>
              <TableCell>Sidney No. 1 Lake Park</TableCell>
              <TableCell>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="flex items-center h-5">
                  <input
                    id="hs-table-pagination-checkbox-4"
                    type="checkbox"
                    className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="hs-table-pagination-checkbox-4"
                    className="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </TableCell>
              <TableCell>Edward King</TableCell>
              <TableCell>16</TableCell>
              <TableCell>LA No. 1 Lake Park</TableCell>
              <TableCell>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <div className="flex items-center h-5">
                  <input
                    id="hs-table-pagination-checkbox-5"
                    type="checkbox"
                    className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="hs-table-pagination-checkbox-5"
                    className="sr-only"
                  >
                    Checkbox
                  </label>
                </div>
              </TableCell>
              <TableCell>Jim Red</TableCell>
              <TableCell>45</TableCell>
              <TableCell>Melbourne No. 1 Lake Park</TableCell>
              <TableCell>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </table>
      </TableWrapper>
      <div className="py-1 px-4">
        <nav className="flex items-center space-x-1" aria-label="Pagination">
          <button
            type="button"
            className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            aria-label="Previous"
          >
            <span aria-hidden="true">«</span>
            <span className="sr-only">Previous</span>
          </button>
          <button
            type="button"
            className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
            aria-current="page"
          >
            1
          </button>
          <button
            type="button"
            className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
          >
            2
          </button>
          <button
            type="button"
            className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
          >
            3
          </button>
          <button
            type="button"
            className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            aria-label="Next"
          >
            <span className="sr-only">Next</span>
            <span aria-hidden="true">»</span>
          </button>
        </nav>
      </div>
    </TableCard>
  );
}

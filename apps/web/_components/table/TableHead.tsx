import { forwardRef } from "react";

export type TableHeadProps = {
  headers: string[];
};

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ headers }, ref) => {
    return (
      <thead ref={ref} className="font-medium border-b">
        <tr>
          {headers.map((header) => (
            <th className="p-2" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  },
);

TableHead.displayName = "TableHead";

export default TableHead;

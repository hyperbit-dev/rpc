import { ReactNode, forwardRef } from "react";

export type TableRowProps = {
  children?: ReactNode;
};

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children }, ref) => {
    return (
      <tr ref={ref} className="border-b last:border-0">
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

export default TableRow;

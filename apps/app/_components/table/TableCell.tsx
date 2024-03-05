import { ReactNode, forwardRef } from "react";

export type TableCellProps = {
  children: ReactNode;
};

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children }, ref) => {
    return (
      <td ref={ref} className="p-2">
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

export default TableCell;

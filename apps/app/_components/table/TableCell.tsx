import clsx from "clsx";
import { ReactNode, forwardRef } from "react";

export type TableCellProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <td ref={ref} className={clsx("p-2", className)} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

export default TableCell;

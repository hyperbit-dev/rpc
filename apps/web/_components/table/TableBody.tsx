import { ReactNode, forwardRef } from "react";

export type TableBodyProps = {
  children: ReactNode;
};

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children }, ref) => {
    return <tbody ref={ref}>{children}</tbody>;
  },
);

TableBody.displayName = "TableBody";

export default TableBody;

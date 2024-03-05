import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  forwardRef,
} from "react";
import TableCard, { TableCardProps } from "./TableCard";
import TableBody, { TableBodyProps } from "./TableBody";
import TableHead, { TableHeadProps } from "./TableHead";
import TableCell, { TableCellProps } from "./TableCell";
import TableRow, { TableRowProps } from "./TableRow";

type TableProps = {
  children?: ReactNode;
};

type TableComponent = ForwardRefExoticComponent<
  TableProps & RefAttributes<HTMLTableElement>
> & {
  Body: React.ForwardRefExoticComponent<
    TableBodyProps & React.RefAttributes<HTMLTableSectionElement>
  >;
  Card: React.ForwardRefExoticComponent<
    TableCardProps & React.RefAttributes<HTMLDivElement>
  >;
  Cell: React.ForwardRefExoticComponent<
    TableCellProps & React.RefAttributes<HTMLTableCellElement>
  >;
  Head: React.ForwardRefExoticComponent<
    TableHeadProps & React.RefAttributes<HTMLTableSectionElement>
  >;
  Row: React.ForwardRefExoticComponent<
    TableRowProps & React.RefAttributes<HTMLTableRowElement>
  >;
};

const Table = forwardRef<HTMLTableElement, TableProps>(({ children }, ref) => {
  return (
    <table
      ref={ref}
      className="min-w-full text-sm font-normal text-left table-auto"
    >
      {children}
    </table>
  );
}) as TableComponent;

Table.Body = TableBody;
Table.Card = TableCard;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;

Table.displayName = "Table";

export default Table;

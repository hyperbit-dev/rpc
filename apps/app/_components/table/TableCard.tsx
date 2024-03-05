import { ReactNode, forwardRef } from "react";

export type TableCardProps = {
  children: ReactNode;
};

const TableCard = forwardRef<HTMLDivElement, TableCardProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="border border-gray-200 rounded-lg">
        {children}
      </div>
    );
  }
);

TableCard.displayName = "TableCard";

export default TableCard;

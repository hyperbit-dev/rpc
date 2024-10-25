export function ListCard({
  SlotRight,
  children,
}: {
  SlotRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-3 leading-tight">
      {children}
      {SlotRight ? <>{SlotRight}</> : undefined}
    </div>
  );
}

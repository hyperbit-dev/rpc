export function PageHeader({
  Title,
  SlotRight,
}: {
  Title: string;
  SlotRight?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center pl-6 pr-4 mt-2 mb-4">
      <h1 className="text-xl font-semibold">{Title}</h1>
      {SlotRight}
    </div>
  );
}

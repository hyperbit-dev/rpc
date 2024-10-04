type TableEmptyStateProps = {
  Title: string;
  Description?: string;
  Actions?: React.ReactNode;
};

export function TableEmptyState({
  Title,
  Description,
  Actions,
}: TableEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-xl text-center text-gray-900">{Title}</div>
      {Description ? (
        <div className="text-sm text-center text-gray-500">
          {Description}
        </div>
      ) : undefined}
      {Actions ? <div className="mt-4">{Actions}</div> : undefined}
    </div>
  );
}

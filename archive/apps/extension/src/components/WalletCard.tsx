export function WalletCard({
  label,
  blockchain,
  network,
}: {
  label: string;
  blockchain: string;
  network: string;
}) {
  return (
    <div className="flex flex-col justify-start gap-[1px] select-none">
      <div>{label}</div>
      <div className="flex flex-row gap-1">
        <span className="text-xs">{blockchain}</span>
        <span>&middot;</span>
        <span className="text-xs capitalize">{network}</span>
      </div>
    </div>
  );
}

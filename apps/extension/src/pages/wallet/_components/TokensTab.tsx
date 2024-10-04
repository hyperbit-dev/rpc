export function TokensTab({
  wallet,
}: {
  wallet: (PouchDB.Core.IdMeta & PouchDB.Core.GetMeta) | undefined;
}) {
  console.log("wallet", wallet);
  return <div className="flex-1"></div>;
}

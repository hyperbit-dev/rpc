import WalletPageClient from "./_components/Client";

export default function WalletPage({
  params: { walletId },
}: {
  params: { walletId: string };
}) {
  return <WalletPageClient walletId={walletId} />;
}

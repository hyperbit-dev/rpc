import { TabsTrigger } from "@radix-ui/react-tabs";

export function Tab({
  children,
  value,
  ...props
}: {
  children: React.ReactNode;
  value: any;
}) {
  return (
    <TabsTrigger
      className="p-2 hover:text-brand-500 active:text-brand-500 focus:text-brand-500 aria-selected:text-brand-500"
      value={value}
      {...props}
    >
      {children}
    </TabsTrigger>
  );
}

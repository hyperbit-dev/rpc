import * as Tabs from "@radix-ui/react-tabs";
import { Tab } from "./Tab";
import { ExportButton } from "./ExportButton";
import clsx from "clsx";

export function TabsHeader({
  tabs,
  data,
  fileName,
  className,
}: {
  tabs: ({ name: string; value: string } | undefined)[];
  data: any;
  fileName: string;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center justify-between", className)}>
      <Tabs.List aria-label="Block Details">
        {tabs
          .filter((x) => x !== undefined)
          .map((tab) => (
            <Tab key={tab?.name} value={tab?.value}>
              {tab?.name}
            </Tab>
          ))}
      </Tabs.List>
      <div>
        <ExportButton
          fileName={`${fileName}.json`}
          data={JSON.stringify(data, null, 2)}
        />
      </div>
    </div>
  );
}

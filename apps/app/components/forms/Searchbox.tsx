import { HSComboBox } from "preline/preline";
import { useEffect, useState } from "react";
import { SearchboxOption } from "./SearchboxOption";
import { SearchInput } from "./SearchInput";

type SearchboxProps = {
  data: {
    label: string;
    value: string;
    group?: string;
  }[];
  onChange: (data: { label: string; value: string }) => void;
};

export function Searchbox({ data = [], onChange }: SearchboxProps) {
  const [selected, setSelected] = useState<
    | undefined
    | {
        label: string;
        value: string;
      }
  >(undefined);

  useEffect(() => {
    HSComboBox.autoInit();
  }, []);

  function handleOption(data: { label: string; value: string }) {
    setSelected(data);
    onChange(data);
  }

  return (
    <div
      className="relative"
      data-hs-combo-box='{
    "groupingType": "default",
    "preventSelection": true,
    "isOpenOnFocus": true,
    "groupingTitleTemplate": "<div class=\"block text-xs text-gray-500 m-3 mb-1 dark:text-neutral-500 dark:border-neutral-700\"></div>"
  }'
    >
      <SearchInput
        InputProps={{
          type: "text",
          role: "combobox",
          "aria-expanded": "false",
          "aria-controls": "combobox-results",
          placeholder: selected?.label ?? "Search...",
          "data-hs-combo-box-input": "",
        }}
      />

      <div
        className="absolute z-50 w-full bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800"
        style={{ display: "none" }}
        data-hs-combo-box-output=""
      >
        <div
          className="max-h-[500px] p-2 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          data-hs-combo-box-output-items-wrapper=""
        >
          {data.map((item) => (
            <SearchboxOption
              key={item.value}
              data={item}
              selected={item.value === selected?.value}
              onClick={handleOption}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

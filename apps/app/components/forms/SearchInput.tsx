import { useId } from "react";
import { Input, InputProps } from "./Input";
import { Label, LabelProps } from "./Label";

type SearchInputProps = {
  LabelProps?: LabelProps;
  InputProps?: InputProps;
};

export function SearchInput({ LabelProps, InputProps }: SearchInputProps) {
  const id = useId();

  return (
    <div className="relative">
      <Label {...LabelProps} className="sr-only" htmlFor={id}>
        Search
      </Label>
      <Input {...InputProps} className="ps-9" id={id} />
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
        <svg
          className="size-4 text-gray-400 dark:text-neutral-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </div>
    </div>
  );
}

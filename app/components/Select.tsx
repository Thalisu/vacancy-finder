import { ReactNode } from "react";

export default function Select({
  id,
  label,
  index,
  children,
  selectConfig = {},
}: {
  id: string;
  label: string;
  index: number;
  children: ReactNode;
  selectConfig?: Record<string, unknown>;
}) {
  return (
    <div>
      <label htmlFor={`${id}-${index}`}>{label}</label>
      <select
        id={`${id}-${index}`}
        {...selectConfig}
        className={`max-w-fit rounded-md ${selectConfig.disabled ? "bg-gray-800/50" : "bg-gray-800"} px-2 py-1`}
      >
        {children}
      </select>
    </div>
  );
}

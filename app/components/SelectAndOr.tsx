import { ReactNode, useContext } from "react";
import { inter } from "../lib/fonts";
import keywordContext from "../context/keyword.context";

export default function SelectAndOr({
  handleChange,
  value,
}: {
  value: string;
  handleChange: (
    newValue: string,
    keywordInputs: {
      node: ReactNode;
      value: string | string[];
    }[],
  ) => void;
}) {
  const { keywordInputs } = useContext(keywordContext);
  return (
    <select
      name="andOr"
      className={`${inter.className} h-8 rounded-md bg-gray-800 p-1 text-center`}
      value={value}
      onChange={({ currentTarget }) =>
        handleChange(currentTarget.value, keywordInputs)
      }
    >
      <option value="AND" defaultChecked>
        AND
      </option>
      <option value="OR">OR</option>
    </select>
  );
}

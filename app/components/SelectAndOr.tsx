import { inter } from "../lib/fonts";

export default function SelectAndOr({
  handleChange,
  value,
}: {
  value: string;
  handleChange: (newValue: string) => void;
}) {
  return (
    <select
      name="andOr"
      className={`${inter.className} h-8 rounded-md bg-gray-800 p-1 text-center`}
      value={value}
      onChange={({ currentTarget }) => handleChange(currentTarget.value)}
    >
      <option value="AND" defaultChecked>
        AND
      </option>
      <option value="OR">OR</option>
    </select>
  );
}

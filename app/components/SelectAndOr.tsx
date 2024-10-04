import { inter } from "../lib/fonts";

export default function SelectAndOr() {
  return (
    <select
      name="andOr"
      className={`${inter.className} h-8 rounded-md bg-gray-800 p-1 text-center`}
    >
      <option value="AND">AND</option>
      <option value="OR">OR</option>
    </select>
  );
}

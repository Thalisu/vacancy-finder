import { inter } from "../lib/fonts";

export default function SavedKeywordField({ value }: { value: string }) {
  return (
    <input
      type="text"
      disabled
      value={value}
      name="keyword"
      className={`${inter.className} w-full rounded-md bg-gray-800 p-1 text-center`}
    />
  );
}

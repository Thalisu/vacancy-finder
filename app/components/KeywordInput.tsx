import { inter } from "../lib/fonts";

export default function KeywordInput({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (newValue: string) => void;
}) {
  const resize = (input: EventTarget & HTMLInputElement) => {
    if (input.scrollWidth > input.clientWidth) {
      input.style.width = `${input.scrollWidth}px`;
    }
  };

  return (
    <input
      type="text"
      maxLength={15}
      required
      value={value}
      placeholder="keyword"
      onChange={({ currentTarget }) => {
        handleChange(currentTarget.value);
        resize(currentTarget);
      }}
      className={`${inter.className} h-full w-28 rounded-md bg-gray-800 p-1 text-center`}
    />
  );
}

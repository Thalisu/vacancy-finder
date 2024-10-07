import { inter } from "../lib/fonts";

export default function SavedKeywordField({
  values,
  handler,
  index,
}: {
  index: number;
  values: string[];
  handler: (value: string, index: number) => void;
}) {
  const isKeyword = values.map((v) => {
    const is = v === "AND" || v === "OR" || v === "(" || v === ")";
    return !is;
  });
  return (
    <div className="flex flex-wrap">
      {values.map((v, i) => (
        <input
          type="text"
          readOnly
          value={v}
          name={`keyword-${index}`}
          className={`${inter.className} ${i === 0 && "rounded-s-md"} ${i === values.length - 1 && "rounded-e-md"} cursor-default bg-gray-800/50 py-1 text-center outline-none transition-colors ${isKeyword[i] && "!cursor-pointer hover:bg-gray-800"}`}
          onClick={() => isKeyword[i] && handler(v, i)}
          style={{ width: `${v.length * 12}px` }}
          key={i}
        />
      ))}
    </div>
  );
}

import { useLayoutEffect, useRef } from "react";
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
  const inputRef = useRef<HTMLDivElement>(null);
  const isKeyword = values.map((v) => {
    const is =
      v === "AND" || v === "NOT" || v === "OR" || v === "(" || v === ")";
    return !is;
  });
  useLayoutEffect(() => {
    if (!inputRef.current) return;
    const childs = Array.from(
      inputRef.current.childNodes as NodeListOf<HTMLInputElement>,
    );
    childs.map((c) => {
      const input = c.childNodes[0] as HTMLInputElement;
      const span = c.childNodes[1] as HTMLSpanElement;
      input.style.width = `${span.offsetWidth + 4}px`;
    });
  });
  return (
    <div className="flex flex-wrap" ref={inputRef}>
      {values.map((v, i) => (
        <div key={i}>
          <input
            type="text"
            readOnly
            value={v}
            id="input"
            name={`keyword-${index}`}
            className={`${inter.className} ${i === 0 && "rounded-s-md"} ${i === values.length - 1 && "rounded-e-md"} cursor-default bg-gray-800/50 py-1 text-center outline-none transition-colors ${isKeyword[i] && "!cursor-pointer hover:bg-gray-800"}`}
            onClick={() => {
              if (isKeyword[i]) {
                handler(v, i);
              }
            }}
          />
          <span className="invisible absolute left-0 whitespace-pre">{v}</span>
        </div>
      ))}
    </div>
  );
}

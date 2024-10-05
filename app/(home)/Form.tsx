"use client";
import { useState, ReactNode } from "react";
import KeywordField from "../components/KeywordField";
import KeywordProvider from "../provider/KeywordProvider";

export default function KeywordForm() {
  const [searchs, setSearchs] = useState<ReactNode[]>([
    <KeywordField key={0} index={1} />,
  ]);
  return (
    <KeywordProvider>
      <form className="flex w-fit min-w-[50%] max-w-[80%] flex-col gap-2 rounded-md bg-gray-900 p-4">
        <div className="flex w-full flex-col gap-4">
          {searchs.map((search) => search)}
        </div>
        <button
          type="button"
          className="flex w-fit max-w-fit items-center justify-center gap-2 rounded-xl bg-gray-950 p-3"
          onClick={() =>
            setSearchs((prev) => [
              ...prev,
              <KeywordField key={prev.length} index={prev.length + 1} />,
            ])
          }
        >
          Mais pesquisas
        </button>
      </form>
    </KeywordProvider>
  );
}

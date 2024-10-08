"use client";
import { useState, ReactNode } from "react";
import KeywordField from "../components/KeywordField";
import useKeywordForm from "../hooks/useKeywordForm";

export default function KeywordForm() {
  const [isSearchAvailable, setIsSearchAvailable] = useState(false);
  const [searchs, setSearchs] = useState<ReactNode[]>([
    <KeywordField
      key={0}
      index={1}
      setIsSearchAvailable={setIsSearchAvailable}
    />,
  ]);
  const { action } = useKeywordForm(searchs.length);

  return (
    <form
      className="flex w-fit min-w-[50%] max-w-[80%] flex-col gap-2 rounded-md bg-gray-900 p-4"
      action={action}
    >
      <div className="flex w-full flex-col gap-4">
        {searchs.map((search) => search)}
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          disabled={!isSearchAvailable}
          className="flex w-fit max-w-fit items-center justify-center gap-2 rounded-xl bg-gray-950 p-3"
          style={{ opacity: isSearchAvailable ? 1 : 0.5 }}
          onClick={() => {
            setIsSearchAvailable(() => false);
            setSearchs((prev) => [
              ...prev,
              <KeywordField
                key={prev.length}
                index={prev.length + 1}
                setIsSearchAvailable={setIsSearchAvailable}
              />,
            ]);
          }}
        >
          Mais pesquisas
        </button>
        <button
          type="submit"
          disabled={!isSearchAvailable}
          className={`flex w-fit max-w-fit items-center justify-center gap-2 rounded-xl bg-gray-950 p-3`}
          style={{ opacity: isSearchAvailable ? 1 : 0.5 }}
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}

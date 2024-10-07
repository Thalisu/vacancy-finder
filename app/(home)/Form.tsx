"use client";
import { useState, ReactNode } from "react";
import KeywordField from "../components/KeywordField";
import { useFormState } from "react-dom";
import { search } from "./action";

export default function KeywordForm() {
  const [searchs, setSearchs] = useState<ReactNode[]>([
    <KeywordField key={0} index={1} />,
  ]);
  const [state, action] = useFormState(search, { length: searchs.length });
  return (
    <form
      className="flex w-fit min-w-[50%] max-w-[80%] flex-col gap-2 rounded-md bg-gray-900 p-4"
      action={action}
    >
      <div className="flex w-full flex-col gap-4">
        {searchs.map((search) => search)}
      </div>
      {state?.errors && (
        <p className="text-sm text-red-500">{state.errors.toString()}</p>
      )}
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
      <button type="submit">Pesquisar</button>
    </form>
  );
}

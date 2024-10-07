"use client";
import { inter } from "../lib/fonts";
import useKeywordInputs from "../hooks/useKeywordInputs";

export default function KeywordField({ index }: { index: number }) {
  const { keywordInputs, showButton, addKeyword, removeKeyword, saveSearch } =
    useKeywordInputs();

  const isLengthOne = keywordInputs.length === 1;

  return (
    <div className="relative flex min-h-32 flex-col bg-gray-950/30 p-4">
      <p className="absolute -left-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-black">
        {index}
      </p>
      <div
        className={`${inter.className} mb-auto flex flex-wrap items-center gap-2`}
      >
        {keywordInputs.map((input) => input.node)}
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          className={`max-w-fit rounded-xl bg-gray-950 p-2`}
          style={{ opacity: showButton ? "1" : ".5" }}
          disabled={!showButton}
          onClick={addKeyword}
        >
          Adicionar
        </button>
        <button
          type="button"
          className={`max-w-fit rounded-xl bg-gray-950 p-2`}
          style={{ opacity: isLengthOne ? ".5" : "1" }}
          disabled={isLengthOne}
          onClick={removeKeyword}
        >
          Remover
        </button>
        <button
          type="button"
          className={`max-w-fit rounded-xl bg-gray-950 p-2`}
          style={{ opacity: showButton ? "1" : ".5" }}
          disabled={!showButton}
          onClick={saveSearch}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

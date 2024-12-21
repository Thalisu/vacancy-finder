"use client";
import useKeywordForm from "@/app/hooks/useKeywordForm";

export default function KeywordForm() {
  const { action, searchs, handleExtraSearch, isSearchAvailable } =
    useKeywordForm();

  return (
    <form
      className="bg-primaryForm flex min-h-96 w-fit min-w-[50%] max-w-[80%] flex-col gap-2 rounded-xl p-4"
      action={action}
    >
      <div className="mb-auto flex w-full flex-col gap-4">
        {searchs.map((search) => search)}
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          className="bg-accent flex w-fit max-w-fit items-center justify-center gap-2 rounded-xl p-3"
          disabled={!isSearchAvailable}
          style={{ opacity: isSearchAvailable ? 1 : 0.5 }}
          onClick={handleExtraSearch}
        >
          Mais pesquisas
        </button>
        <button
          type="submit"
          disabled={!isSearchAvailable}
          className={`bg-accent flex w-fit max-w-fit items-center justify-center gap-2 rounded-xl p-3`}
          style={{ opacity: isSearchAvailable ? 1 : 0.5 }}
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}

"use client";
import useKeywordForm from "@/app/hooks/useKeywordForm";

export default function KeywordForm() {
  const { action, searchs, handleExtraSearch, errors } = useKeywordForm();

  const isSearchAvailable = searchs.every((search) => search.isSaved);

  return (
    <form
      className="flex min-h-96 w-fit min-w-[50%] max-w-[80%] flex-col gap-2 rounded-xl bg-primaryForm p-4"
      action={action}
    >
      <div className="mb-auto flex w-full flex-col gap-4">
        {searchs.map((search) => search.field)}
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!isSearchAvailable}
          className={`flex w-fit max-w-fit items-center justify-center gap-2 rounded-xl bg-accent p-3`}
          style={{ opacity: isSearchAvailable ? 1 : 0.5 }}
        >
          Pesquisar
        </button>
        <button
          type="button"
          className="flex w-fit max-w-fit items-center justify-center gap-2 rounded-xl bg-accent p-3"
          disabled={!isSearchAvailable}
          style={{ opacity: isSearchAvailable ? 1 : 0.5 }}
          onClick={handleExtraSearch}
        >
          Mais pesquisas
        </button>
        {errors.state && (
          <p className="flex items-center text-error">{errors.msg}</p>
        )}
      </div>
    </form>
  );
}

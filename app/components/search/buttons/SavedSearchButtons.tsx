import { CopySVG, EditSVG } from "../../svgs";

export default function SavedSearchButtons({
  keywords,
  editSearch,
}: {
  keywords: string[];
  editSearch: () => void;
}) {
  return (
    <div className="flex flex-col items-end justify-end gap-1">
      <button
        type="button"
        className={`flex h-fit max-w-fit items-center justify-center gap-2 rounded-xl p-2 text-sm hover:bg-gray-800/10`}
        onClick={() => navigator.clipboard.writeText(keywords.join(" "))}
      >
        Copiar Keywords
        <CopySVG className="aspect-square h-4 w-4" />
      </button>
      <button
        type="button"
        className={`flex h-fit max-w-fit items-center justify-center gap-2 rounded-xl p-2 text-sm hover:bg-gray-800/10`}
        onClick={editSearch}
      >
        Editar <EditSVG className="aspect-square h-4 w-4" />
      </button>
    </div>
  );
}

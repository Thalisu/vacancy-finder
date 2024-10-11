import { CopySVG, EditSVG } from "./svgs";

export default function SavedSearchButtons({ values }: { values: string[] }) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        className={`flex h-fit max-w-fit items-center justify-center gap-2 rounded-xl bg-gray-950 p-2`}
      >
        Editar <EditSVG className="aspect-square h-4 w-4" />
      </button>
      <button
        type="button"
        className={`flex h-fit max-w-fit items-center justify-center gap-2 rounded-xl bg-gray-950 p-2`}
        onClick={() => navigator.clipboard.writeText(values.join(" "))}
      >
        Copiar Keywords
        <CopySVG className="aspect-square h-4 w-4" />
      </button>
    </div>
  );
}

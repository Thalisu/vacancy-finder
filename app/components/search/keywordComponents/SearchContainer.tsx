import { TrashSVG } from "../../svgs";

export default function SearchContainer({
  removeSearch,
  index,
  children,
}: {
  removeSearch: (index: number) => void;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <div
        className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondaryForm"
        style={{ fontSize: "0.715rem" }}
      >
        <span>{index + 1}</span>
      </div>
      <button
        type="button"
        onClick={() => removeSearch(index)}
        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondaryForm"
      >
        <TrashSVG className="h-4 w-4" />
      </button>
    </div>
  );
}

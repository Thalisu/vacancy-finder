import { ChangeEvent, useRef } from "react";
import { Close, Filter as FilterSVG } from "../svgs";
import { IJobResponse } from "@/app/lib/types";
import { poppins } from "@/app/lib/fonts";
import Filter from "./Filter";

export default function JobContainerBar({
  searchs,
  updateJobs,
}: {
  searchs: IJobResponse[];
  updateJobs: (keywords: string[], promoted: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const keywords = useRef(searchs.map((search) => search.keywords));

  const handleFilter = (e: ChangeEvent<HTMLInputElement>, promoted = false) => {
    const isChecked = e.target.checked;
    if (e.target.id !== "promoted") {
      keywords.current = isChecked
        ? keywords.current.concat(e.target.id)
        : keywords.current.filter((keyword) => keyword !== e.target.id);
    }

    updateJobs(keywords.current, promoted);
  };

  const toggleFilter = () => {
    if (!ref.current) {
      return;
    }

    if (ref.current.style.width === "0px") {
      ref.current.style.width = "100%";
      return;
    }

    ref.current.style.width = "0px";
  };

  return (
    <div className="flex w-full items-center justify-between bg-accent p-2 text-neutral shadow-sm shadow-accent">
      <h2 className={`${poppins.className} text-lg font-bold`}>Resultados:</h2>
      <div className="cursor-pointer p-1" onClick={toggleFilter}>
        <FilterSVG className="h-6" />
      </div>
      <div
        id="filter"
        className="absolute bottom-0 right-0 top-0 z-40 flex max-w-full flex-col overflow-hidden bg-complementary transition-all"
        style={{ width: "0px" }}
        ref={ref}
      >
        <div className="flex w-full content-center items-center justify-between gap-4 p-2">
          <h3 className={`${poppins.className} w-max font-bold`}>
            Mostrar quais pesquisas?
          </h3>
          <div className="cursor-pointer p-1" onClick={toggleFilter}>
            <Close className="h-6" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {searchs.map((search) => (
            <Filter
              key={search.keywords}
              id={search.keywords}
              handler={handleFilter}
            />
          ))}
          <div className="mx-4 flex w-fit gap-2 overflow-hidden border-b pb-1 transition-all">
            <input
              id="promoted"
              type="checkbox"
              onChange={(e) => handleFilter(e, e.target.checked)}
              className="cursor-pointer border-complementary bg-complementary"
            />
            <label
              htmlFor="promoted"
              className="w-fit cursor-pointer select-none"
            >
              Empregos promovidos
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

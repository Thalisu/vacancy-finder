"use client";
import { inter } from "../../lib/fonts";
import NewKeywordSearch from "./NewKeywordSearch";
import NotSavedSearchButtons from "./buttons/NotSavedSearchButtons";
import SavedKeywordField from "./SavedKeywordField";
import JobDataSelects from "./keywordComponents/JobDataSelects";
import EditSavedKeyword from "./EditSavedKeyword";
import { IJobsData } from "../../lib/types";
import useKeywordFields from "@/app/hooks/useKeywordFields";

export default function KeywordField({
  searchIndex,
  handlers,
  savedSearch,
}: {
  searchIndex: number;
  handlers: {
    handleErrors: (msg: string, timeout?: number) => void;
    saveHandler: (i: number, state: boolean) => void;
  };
  savedSearch?: { jobsData: IJobsData; keywords: string[] };
}) {
  const { ref, situation, extraFields, values, fieldHandlers } =
    useKeywordFields(handlers, searchIndex, savedSearch);

  if (situation === "saved") {
    return (
      <SavedKeywordField
        jobsData={values.jobsData}
        keywords={values.keywords}
        index={searchIndex}
        handlers={fieldHandlers}
      />
    );
  }

  return (
    <div className="relative flex min-h-32 flex-col gap-2 rounded-xl bg-secondaryForm p-4">
      <div className={`mb-auto flex flex-col gap-2`} ref={ref}>
        <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
          {situation === "unsaved" ? (
            <NewKeywordSearch label />
          ) : (
            <EditSavedKeyword values={values.keywords} />
          )}
          {extraFields.length > 0 &&
            extraFields.map((ef: React.ReactNode) => ef)}
        </div>
        <JobDataSelects jobsData={values.jobsData} />
      </div>
      <NotSavedSearchButtons
        addExtraFields={fieldHandlers.addExtraField}
        removeExtraField={fieldHandlers.removeExtraField}
        handleSave={fieldHandlers.handleSave}
      />
    </div>
  );
}

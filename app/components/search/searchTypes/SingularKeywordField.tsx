"use client";

import SelectAndKeyField from "../keywordComponents/SelectAndKeyField";

export default function SingularKeywordField({ label }: { label: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-2`}>
      <SelectAndKeyField label={label} />
    </div>
  );
}

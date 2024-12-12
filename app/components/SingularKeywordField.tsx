"use client";
import { inter } from "../lib/fonts";
import SelectAndKeyField from "./SelectAndKeyField";

export default function SingularKeywordField({ label }: { label: boolean }) {
  return (
    <div className={`${inter.className} flex flex-wrap items-center gap-2`}>
      <SelectAndKeyField label={label} />
    </div>
  );
}

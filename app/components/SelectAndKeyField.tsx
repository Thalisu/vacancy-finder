import KeywordInput from "./KeywordInput";
import SelectAndOr from "./SelectAndOr";

export default function ExtraField({
  label,
  dValue,
}: {
  label: boolean;
  dValue?: string[];
}) {
  return (
    <>
      {!label && <SelectAndOr dValue={dValue?.[0] as "AND" | "OR" | "NOT"} />}
      <KeywordInput dValue={dValue?.[1]} />
    </>
  );
}

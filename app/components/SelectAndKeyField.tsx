import KeywordInput from "./KeywordInput";
import SelectAndOr from "./SelectAndOr";

export default function ExtraField({ label }: { label: boolean }) {
  return (
    <>
      {!label && <SelectAndOr />}
      <KeywordInput />
    </>
  );
}

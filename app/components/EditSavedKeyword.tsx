import GroupKeywordField from "./GroupKeywordField";
import KeywordInput from "./KeywordInput";
import SelectAndOr from "./SelectAndOr";

export default function EditSavedKeyword({ values }: { values: string[] }) {
  let isGroup = false;
  const keywords: string[][] & string[] = [];

  for (let index = 0; index < values.length; index++) {
    const value = values[index];

    if (value === ")") {
      isGroup = false;
      continue;
    }
    if (isGroup) {
      keywords[keywords.length - 1].push(value);
      continue;
    }
    if (value === "(") {
      isGroup = true;
      keywords.push([]);
      continue;
    }

    keywords.push(value);
  }

  return keywords.map((v, i) => {
    if (Array.isArray(v)) {
      return <GroupKeywordField key={i} values={v} />;
    }
    if (v === "AND" || v === "OR" || v === "NOT") {
      return <SelectAndOr key={i} dValue={v} />;
    }
    return <KeywordInput key={i} dValue={v} />;
  });
}

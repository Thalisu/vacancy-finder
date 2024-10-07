import { useState } from "react";
import { inter } from "../lib/fonts";
import GroupKeywordField from "./GroupKeywordField";
import SingularKeywordField from "./SingularKeywordField";

export default function NewKeywordSearch({
  setShowButton,
  value,
  handleValueChange,
  label,
}: {
  setShowButton: (show: boolean) => void;
  value: string | string[];
  handleValueChange: (newValue: string | string[]) => void;
  label?: boolean;
}) {
  const [selected, setSelected] = useState("");

  if (selected === "group" || selected === "singular") {
    return selected === "group" ? (
      <GroupKeywordField
        value={Array.isArray(value) ? value : ["", "AND", ""]}
        handleValueChange={handleValueChange}
      />
    ) : (
      <SingularKeywordField
        value={typeof value === "string" ? value : ""}
        handleValueChange={handleValueChange}
      />
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${inter.className}`}>
      {label && <label htmlFor="#search">Selecione o tipo da pesquisa:</label>}
      <select
        name="search"
        id="search"
        onChange={(e) => {
          setShowButton(true);
          setSelected(e.currentTarget.value);
        }}
        className="max-w-fit rounded-md bg-gray-800 p-2"
      >
        <option defaultChecked>Selecione</option>
        <option value="group">Grupo = (keyword AND/OR keyword)</option>
        <option value="singular">Singular = keyword AND/OR keyword</option>
      </select>
    </div>
  );
}

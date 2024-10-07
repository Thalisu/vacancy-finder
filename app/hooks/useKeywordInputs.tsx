import { useCallback, useEffect, useState } from "react";
import NewKeywordSearch from "../components/NewKeywordSearch";
import SelectAndOr from "../components/SelectAndOr";
import { IKeywordInput } from "../lib/types";
import SavedKeywordField from "../components/SavedKeywordField";

const useKeywordInputs = () => {
  const [keywordInputs, setKeywordInputs] = useState<IKeywordInput[]>([]);
  const [showButton, setShowButton] = useState(false);

  const handleValueChange = useCallback(
    (index: number, newValue: string | string[]) => {
      setKeywordInputs((prev) => {
        const toUpdate = [...prev];
        toUpdate[index].value = newValue;
        return [...toUpdate];
      });
    },
    [setKeywordInputs],
  );

  useEffect(() => {
    setKeywordInputs(() => [
      {
        value: "",
        get node() {
          const value = this.value;
          return (
            <NewKeywordSearch
              key={0}
              setShowButton={setShowButton}
              label={true}
              value={value}
              handleValueChange={(newValue: string | string[]) =>
                handleValueChange(0, newValue)
              }
            />
          );
        },
      },
    ]);
  }, [setKeywordInputs, handleValueChange]);

  const addKeyword = () => {
    setShowButton(false);
    setKeywordInputs((prev) => [
      ...prev,
      {
        value: "AND",
        get node() {
          const value = this.value;
          return (
            <SelectAndOr
              key={prev.length}
              value={typeof value === "string" ? value : "AND"}
              handleChange={(newValue: string) =>
                handleValueChange(prev.length, newValue)
              }
            />
          );
        },
      },
      {
        value: "",
        get node() {
          const value = this.value;
          return (
            <NewKeywordSearch
              key={prev.length + 1}
              setShowButton={setShowButton}
              value={value}
              handleValueChange={(newValue: string | string[]) =>
                handleValueChange(prev.length + 1, newValue)
              }
            />
          );
        },
      },
    ]);
  };

  const removeKeyword = () => {
    setShowButton(true);
    setKeywordInputs((prev) => prev.slice(0, -2));
  };

  const saveSearch = () => {
    setShowButton(false);
    setKeywordInputs((prev) => {
      const values = prev.map((p) => {
        return Array.isArray(p.value) ? `(${p.value.join(" ")})` : p.value;
      });
      return [
        {
          node: <SavedKeywordField value={values.join(" ")} />,
          value: prev.map((p) => p.value) as string[],
        },
      ];
    });
  };

  return {
    keywordInputs,
    addKeyword,
    removeKeyword,
    handleValueChange,
    showButton,
    saveSearch,
  };
};

export default useKeywordInputs;

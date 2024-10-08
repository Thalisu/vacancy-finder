import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import NewKeywordSearch from "../components/NewKeywordSearch";
import SelectAndOr from "../components/SelectAndOr";
import { IKeywordInput } from "../lib/types";
import SavedKeywordField from "../components/SavedKeywordField";
import { addToLocalStorage } from "../lib/utils";

const useKeywordInputs = (
  setIsSearchAvailable: Dispatch<SetStateAction<boolean>>,
) => {
  const [keywordInputs, setKeywordInputs] = useState<IKeywordInput[]>([]);
  const isAllInputsWithValue = keywordInputs.every((i) => {
    if (i.saved) return false;
    return Array.isArray(i.value) ? i.value.every((v) => v) : i.value;
  });

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
    setKeywordInputs((prev) => prev.slice(0, -2));
  };

  const handleExactSearch = (value: string, index: number) => {
    setKeywordInputs((prev) => {
      const toUpdate = [...prev];
      if (Array.isArray(toUpdate[0].value)) {
        toUpdate[0].value[index] = value.startsWith(`"`)
          ? value.replaceAll(`"`, ``)
          : `"${value}"`;
      }
      return [...toUpdate];
    });
  };

  const saveSearch = (index: number) => {
    setKeywordInputs((prev) => {
      const values = prev.map((p) => {
        return Array.isArray(p.value) ? ["(", ...p.value, ")"] : [p.value];
      });

      setIsSearchAvailable(() => true);

      addToLocalStorage(`@Search ${index}`, values.flat());

      return [
        {
          value: values.flat(),
          get node() {
            const value = this.value;
            return (
              <SavedKeywordField
                handler={handleExactSearch}
                values={value as string[]}
                index={index - 1}
                key={0}
              />
            );
          },
          saved: true,
        },
      ];
    });
  };

  return {
    keywordInputs,
    addKeyword,
    removeKeyword,
    handleValueChange,
    isAllInputsWithValue,
    saveSearch,
  };
};

export default useKeywordInputs;

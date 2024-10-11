import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import NewKeywordSearch from "../components/NewKeywordSearch";
import SelectAndOr from "../components/SelectAndOr";
import { IJobsData, IKeywordInput } from "../lib/types";
import SavedKeywordField from "../components/SavedKeywordField";
import {
  addToLocalStorage,
  getFromLocalStorage,
  updateLocalStorage,
} from "../lib/utils";

const useKeywordInputs = (
  setIsSearchAvailable: Dispatch<SetStateAction<boolean>>,
  searchIndex: number,
) => {
  const [keywordInputs, setKeywordInputs] = useState<IKeywordInput[]>([]);
  const [jobSearchData, setJobSearchData] = useState({
    time: "r86400",
    remote: "1%2C2%2C3",
    location: "Brazil",
  });

  const isAllInputsWithValue = keywordInputs.every((i) => {
    if (i.saved) return false;
    return Array.isArray(i.value) ? i.value.every((v) => v) : i.value;
  });
  const isSaved = keywordInputs.every((i) => i.saved);

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

  const handleExactSearch = useCallback(
    (value: string, index: number) => {
      setKeywordInputs((prev) => {
        const toUpdate = [...prev];
        if (Array.isArray(toUpdate[0].value)) {
          toUpdate[0].value[index] = value.startsWith(`"`)
            ? value.replaceAll(`"`, ``)
            : `"${value}"`;
        }
        updateLocalStorage(`@Search ${searchIndex - 1}`, toUpdate[0].value);
        return [...toUpdate];
      });
    },
    [searchIndex],
  );

  useEffect(() => {
    const savedKeywords = getFromLocalStorage(`@Search ${searchIndex - 1}`);
    if (savedKeywords?.length) setIsSearchAvailable(() => true);
    setKeywordInputs(() => {
      if (savedKeywords?.length) {
        return [
          {
            value: savedKeywords,
            get node() {
              const value = this.value;
              return (
                <SavedKeywordField
                  handler={handleExactSearch}
                  values={value as string[]}
                  index={searchIndex - 1}
                  jobSearchData={jobSearchData}
                  key={0}
                />
              );
            },
            saved: true,
          },
        ];
      }
      return [
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
      ];
    });
  }, [
    setKeywordInputs,
    handleValueChange,
    searchIndex,
    setIsSearchAvailable,
    handleExactSearch,
  ]);

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

  const handleSetJobSearchData = (value: Partial<IJobsData>) => {
    setJobSearchData((prev) => {
      updateLocalStorage(`@jobData ${searchIndex - 1}`, { ...prev, ...value });
      return { ...prev, ...value };
    });
  };

  const removeKeyword = () => {
    setKeywordInputs((prev) => prev.slice(0, -2));
  };

  const saveSearch = () => {
    setIsSearchAvailable(() => true);
    setKeywordInputs((prev) => {
      const values = prev.map((p) => {
        return Array.isArray(p.value) ? ["(", ...p.value, ")"] : [p.value];
      });

      addToLocalStorage(`@Search ${searchIndex - 1}`, values.flat());

      return [
        {
          value: values.flat(),
          get node() {
            const value = this.value;
            return (
              <SavedKeywordField
                handler={handleExactSearch}
                values={value as string[]}
                jobSearchData={jobSearchData}
                index={searchIndex - 1}
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
    isSaved,
    jobSearchData,
    handleSetJobSearchData,
  };
};

export default useKeywordInputs;

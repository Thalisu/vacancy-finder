import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import NewKeywordSearch from "../components/NewKeywordSearch";
import SelectAndOr from "../components/SelectAndOr";
import keywordContext from "../context/keyword.context";

const useKeywordInputs = () => {
  const [showButton, setShowButton] = useState(false);
  const { keywordInputs, setKeywordInputs } = useContext(keywordContext);

  const handleValueChange = useCallback(
    (
      index: number,
      newValue: string | string[],
      keywordInputs: {
        node: ReactNode;
        value: string | string[];
      }[],
    ) => {
      const toUpdate = [...keywordInputs];
      toUpdate[index].value = newValue;
      setKeywordInputs(() => [...toUpdate]);
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
              handleValueChange={(
                newValue: string | string[],
                keywordInputs: {
                  node: ReactNode;
                  value: string | string[];
                }[],
              ) => handleValueChange(0, newValue, keywordInputs)}
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
              handleChange={(
                newValue: string,
                keywordInputs: {
                  node: ReactNode;
                  value: string | string[];
                }[],
              ) => handleValueChange(prev.length, newValue, keywordInputs)}
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
              handleValueChange={(
                newValue: string | string[],
                keywordInputs: {
                  node: ReactNode;
                  value: string | string[];
                }[],
              ) => handleValueChange(prev.length + 1, newValue, keywordInputs)}
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

  return {
    keywordInputs,
    addKeyword,
    removeKeyword,
    handleValueChange,
    showButton,
  };
};

export default useKeywordInputs;

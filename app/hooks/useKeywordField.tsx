import { useCallback, useEffect, useState } from "react";
import SearchContainer from "../components/search/keywordComponents/SearchContainer";
import KeywordField from "../components/search/KeywordField";
import {
  deleteFromLocalStorage,
  getAllSearchsFromLocalStorage,
} from "../lib/utils";
import { TSearchField } from "../lib/types";

const useKeywordField = () => {
  const [searchs, setSearchs] = useState<TSearchField[]>([]);
  const [errors, setErrors] = useState({ state: false, msg: "" });

  const handleErrors = useCallback((msg: string, timeout = 5000) => {
    setTimeout(() => {
      setErrors(() => ({ state: false, msg: "" }));
    }, timeout);
    setErrors(() => ({ state: true, msg }));
  }, []);

  const saveHandler = useCallback((i: number, state: boolean) => {
    setSearchs((prev) => {
      const toUpdate = [...prev];
      toUpdate[i].isSaved = state;
      return [...toUpdate];
    });
  }, []);

  const getKeywordField = useCallback(
    (
      i: number,
      removeSearch: (index: number) => void,
      search = undefined,
      key?: string,
    ) => {
      return {
        index: i,
        get field() {
          return (
            <SearchContainer
              index={this.index}
              removeSearch={removeSearch}
              key={key || this.index}
            >
              <KeywordField
                index={this.index}
                handlers={{ handleErrors, saveHandler }}
                savedSearch={search}
              />
            </SearchContainer>
          );
        },
        isSaved: search ? true : false,
      };
    },
    [handleErrors, saveHandler],
  );

  const removeSearch = useCallback(
    (i: number) => {
      const savedSearchs = getAllSearchsFromLocalStorage();
      if (!savedSearchs[0]) return;

      deleteFromLocalStorage(`@SEARCH${i}`);

      if (savedSearchs.length === 1) {
        setSearchs([
          getKeywordField(0, removeSearch, undefined, crypto.randomUUID()),
        ]);
        return;
      }

      if (savedSearchs.length > i + 1) {
        for (let j = i + 1; j < savedSearchs.length; j++) {
          const toUpdateStorageValue = localStorage.getItem(`@SEARCH${j}`);
          if (!toUpdateStorageValue) break;
          deleteFromLocalStorage(`@SEARCH${j}`);
          localStorage.setItem(`@SEARCH${j - 1}`, toUpdateStorageValue);
        }
      }

      savedSearchs.splice(i, 1);

      const toUpdate: TSearchField[] = savedSearchs.map((search, i) => {
        return getKeywordField(i, removeSearch, search, crypto.randomUUID());
      });
      setSearchs(() => toUpdate);
    },
    [getKeywordField],
  );

  useEffect(() => {
    const savedSearchs = getAllSearchsFromLocalStorage();
    const searchs = savedSearchs.map((search, i) => {
      return getKeywordField(i, removeSearch, search);
    });

    setSearchs(() => searchs);
  }, [getKeywordField, removeSearch]);

  const handleExtraSearch = useCallback(() => {
    setSearchs((prev) => [...prev, getKeywordField(prev.length, removeSearch)]);
  }, [getKeywordField, removeSearch]);

  return {
    searchs,
    errors,
    handleExtraSearch,
  };
};

export default useKeywordField;

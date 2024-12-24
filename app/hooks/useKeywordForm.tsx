import { useFormState } from "react-dom";
import { search } from "@/app/(pages)/(home)/action";
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import KeywordField from "../components/KeywordField";
import { getAllSearchsFromLocalStorage } from "../lib/utils";
import jobDataContext from "../context/jobData.context";
import { redirect } from "next/navigation";

const useKeywordForm = () => {
  const [errors, setErrors] = useState({ state: false, msg: "" });

  type SearchField = { field: ReactNode; isSaved: boolean };
  const [searchs, setSearchs] = useState<SearchField[]>([]);

  const [state, action] = useFormState(search, {
    length: searchs.length,
    jobs: [],
    errors: [],
    loading: true,
  });
  const { handleSetData } = useContext(jobDataContext);

  const handleErrors = useCallback((msg: string, timeout = 5000) => {
    setTimeout(() => {
      setErrors(() => ({ state: false, msg: "" }));
    }, timeout);
    setErrors(() => ({ state: true, msg }));
  }, []);

  const markAsSaved = useCallback((i: number) => {
    setSearchs((prev) => {
      const toUpdate = [...prev];
      toUpdate[i].isSaved = true;
      return [...toUpdate];
    });
  }, []);

  useEffect(() => {
    /* const savedKeywords = getAllSearchsFromLocalStorage(); */
    setSearchs(() => [
      {
        field: (
          <KeywordField
            index={0}
            key={0}
            handleError={handleErrors}
            markAsSaved={markAsSaved}
          />
        ),
        isSaved: false,
      },
    ]);
  }, [state, handleErrors, markAsSaved]);

  const handleExtraSearch = useCallback(() => {
    setSearchs((prev) => [
      ...prev,
      {
        field: (
          <KeywordField
            key={prev.length}
            index={prev.length}
            handleError={handleErrors}
            markAsSaved={markAsSaved}
          />
        ),
        isSaved: false,
      },
    ]);
  }, [handleErrors, markAsSaved]);

  const removeSearch = (i: number) => {
    if (searchs.length <= 1) return;
    setSearchs((prev) => prev.filter((_, index) => index !== i));
  };

  useEffect(() => {
    if (state.loading) return;
    handleSetData(state);
    redirect("/jobs");
  }, [state, handleSetData]);

  return { action, handleExtraSearch, searchs, errors };
};

export default useKeywordForm;

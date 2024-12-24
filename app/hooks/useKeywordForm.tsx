import { useFormState } from "react-dom";
import { search } from "@/app/(pages)/(home)/action";
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import KeywordField from "../components/KeywordField";
import { getAllSearchsFromLocalStorage } from "../lib/utils";
import jobDataContext from "../context/jobData.context";
import { redirect } from "next/navigation";

const useKeywordForm = () => {
  const [errors, setErrors] = useState({ state: false, msg: "" });
  const [isSearchAvailable, setIsSearchAvailable] = useState(false);
  const [searchs, setSearchs] = useState<ReactNode[]>([]);
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

  useEffect(() => {
    /* const savedKeywords = getAllSearchsFromLocalStorage(); */
    setSearchs(() => [
      <KeywordField index={0} key={0} handleError={handleErrors} />,
    ]);
  }, [state, handleErrors]);

  const handleExtraSearch = () => {
    setSearchs((prev) => [
      ...prev,
      <KeywordField
        key={prev.length}
        index={prev.length}
        handleError={handleErrors}
      />,
    ]);
  };

  const removeSearch = (i: number) => {
    if (searchs.length <= 1) return;
    setSearchs((prev) => prev.filter((_, index) => index !== i));
  };

  useEffect(() => {
    if (state.loading) return;
    handleSetData(state);
    redirect("/jobs");
  }, [state, handleSetData]);

  return { action, handleExtraSearch, searchs, isSearchAvailable, errors };
};

export default useKeywordForm;

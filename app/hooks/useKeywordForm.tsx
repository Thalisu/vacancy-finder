import { useFormState } from "react-dom";
import { search } from "@/app/(pages)/(home)/action";
import { ReactNode, useContext, useEffect, useState } from "react";
import KeywordField from "../components/KeywordField";
import { getAllSearchsFromLocalStorage } from "../lib/utils";
import jobDataContext from "../context/jobData.context";
import { redirect } from "next/navigation";

const useKeywordForm = () => {
  const [isSearchAvailable, setIsSearchAvailable] = useState(false);
  const [searchs, setSearchs] = useState<ReactNode[]>([]);
  const [state, action] = useFormState(search, {
    length: searchs.length,
    jobs: [],
    errors: [],
    loading: true,
  });
  const { handleSetData } = useContext(jobDataContext);

  useEffect(() => {
    const savedKeywords = getAllSearchsFromLocalStorage();
    let initialValue: ReactNode[] = [];
    if (savedKeywords.length) {
      initialValue = savedKeywords.map((keyword, i) => {
        return (
          <KeywordField
            key={i}
            index={i + 1}
            setIsSearchAvailable={setIsSearchAvailable}
          />
        );
      });
    } else {
      initialValue = [
        <KeywordField
          key={0}
          index={1}
          setIsSearchAvailable={setIsSearchAvailable}
        />,
      ];
    }

    state.length = initialValue.length;

    setSearchs(() => initialValue);
  }, [state]);

  const handleNewSearch = () => {
    setIsSearchAvailable(() => false);
    setSearchs((prev) => [
      ...prev,
      <KeywordField
        key={prev.length}
        index={prev.length + 1}
        setIsSearchAvailable={setIsSearchAvailable}
      />,
    ]);
  };

  useEffect(() => {
    if (state.loading) return;
    handleSetData(state);
    redirect("/jobs");
  }, [state, handleSetData]);

  return { action, handleNewSearch, searchs, isSearchAvailable };
};

export default useKeywordForm;

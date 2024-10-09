import { useFormState } from "react-dom";
import { search } from "../(home)/action";
import { ReactNode, useEffect, useState } from "react";
import KeywordField from "../components/KeywordField";
import { getAllSearchsFromLocalStorage } from "../lib/utils";

const useKeywordForm = () => {
  const [isSearchAvailable, setIsSearchAvailable] = useState(false);
  const [searchs, setSearchs] = useState<ReactNode[]>([]);
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

    setSearchs(() => initialValue);
  }, []);

  const [state, action] = useFormState(search, {
    length: searchs.length,
    data: [],
    errors: [],
    loading: true,
  });

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
  }, [state]);

  return { action, handleNewSearch, searchs, isSearchAvailable };
};

export default useKeywordForm;

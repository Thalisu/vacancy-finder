import { useFormState } from "react-dom";
import { search } from "../(home)/action";
import { useEffect } from "react";

const useKeywordForm = (length: number) => {
  const [state, action] = useFormState(search, {
    length,
    data: [],
    errors: [],
    loading: true,
  });
  useEffect(() => {
    if (state.loading) return;
    
  }, [state]);

  return { action };
};

export default useKeywordForm;

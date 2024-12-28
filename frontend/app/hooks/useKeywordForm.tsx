import { useFormState } from "react-dom";
import { search } from "@/app/(pages)/(home)/action";
import { useContext, useEffect } from "react";
import jobDataContext from "../context/jobData.context";
import { redirect } from "next/navigation";
import { TSearchField } from "../lib/types";

const useFormAction = (searchs: TSearchField[]) => {
  const [state, action] = useFormState(search, {
    length: searchs.length,
    jobs: [],
    errors: [],
    loading: true,
  });
  const { handleSetData } = useContext(jobDataContext);

  useEffect(() => {
    if (state.loading) return;
    handleSetData(state);
    redirect("/jobs");
  }, [state, handleSetData]);

  return { action };
};

export default useFormAction;

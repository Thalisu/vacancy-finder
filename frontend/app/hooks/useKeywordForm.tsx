import { useFormState } from "react-dom";
import { search } from "@/app/(pages)/(home)/action";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { addToSessionStorage } from "../lib/utils";

const useFormAction = () => {
  const [state, action] = useFormState(search, {
    id_ready: false,
    data: null,
  });

  useEffect(() => {
    if (!state.id_ready) return;
    addToSessionStorage("@CURRENT_SEARCH", state.data);
    redirect("/jobs");
  }, [state]);

  return { action };
};

export default useFormAction;

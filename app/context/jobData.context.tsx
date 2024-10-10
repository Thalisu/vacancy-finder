import { createContext } from "react";
import { IFormState } from "../lib/types";

const jobDataContext = createContext<{
  data: IFormState;
  handleSetData: (data: IFormState) => void;
}>({
  data: {
    length: 0,
    jobs: [],
    errors: [],
    loading: true,
  },
  handleSetData: () => {},
});

export default jobDataContext;

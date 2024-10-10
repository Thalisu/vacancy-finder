import { createContext } from "react";
import { IFormState, IFormStateData } from "../lib/types";

const jobDataContext = createContext<{
  data: IFormState;
  handleSetData: (data: IFormStateData) => void;
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

"use client";

import { useState } from "react";
import jobDataContext from "../context/jobData.context";
import { IFormState } from "../lib/types";

export default function JobDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<IFormState>({
    length: 0,
    jobs: [],
    errors: [],
    loading: true,
  });

  const handleSetData = (data: IFormState) => {
    //Todo data type validation
    setData(() => data);
  };
  return (
    <jobDataContext.Provider value={{ data, handleSetData }}>
      {children}
    </jobDataContext.Provider>
  );
}

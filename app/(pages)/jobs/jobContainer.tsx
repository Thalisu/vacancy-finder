"use client";
import { JobCard } from "@/app/components/JobCard";
import jobDataContext from "@/app/context/jobData.context";
import { IFormStateData } from "@/app/lib/types";
import { useContext } from "react";

export default function JobContainer() {
  const { data } = useContext(jobDataContext);
  return (
    <ul className="flex flex-col gap-2">
      {data.jobs.map((searchs) =>
        searchs.map((job: IFormStateData, i: number) => (
          <JobCard key={i} job={job} />
        )),
      )}
    </ul>
  );
}

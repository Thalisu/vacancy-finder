"use client";
import { JobCard } from "@/app/components/JobCard";
import jobDataContext from "@/app/context/jobData.context";
import { IFormStateData } from "@/app/lib/types";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function JobContainer() {
  const { data } = useContext(jobDataContext);
  if (data.loading) {
    redirect("/");
  }
  return (
    <ul className="flex flex-col gap-2">
      {data.jobs.map((job: IFormStateData, i: number) => (
        <JobCard key={i} job={job} />
      ))}
    </ul>
  );
}

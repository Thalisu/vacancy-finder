import { IJob } from "@/app/lib/types";
import { JobCard } from "./JobCard";

export default function JobCardContainer({ jobs }: { jobs: IJob[] }) {
  return (
    <ul className="flex flex-col overflow-hidden transition-all">
      {jobs.map((job, i) => (
        <JobCard job={job} key={i} />
      ))}
    </ul>
  );
}

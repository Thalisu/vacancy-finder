import Image from "next/image";
import { CompanyNotFound } from "../svgs";
import { IJob } from "@/app/lib/types";

export function JobCard({ job }: { job: IJob }) {
  return (
    <li className="w-full rounded-md">
      <a href={job.url} className="m-2 flex gap-2" target="_blank">
        <div className="h-14 min-h-14 w-14 min-w-14 overflow-clip rounded-lg">
          {job.img ? (
            <Image
              src={job.img}
              alt={job.enterprise}
              width={56}
              height={56}
              className="h-14 w-14 rounded-md"
            />
          ) : (
            <CompanyNotFound className="h-14 w-14" />
          )}
        </div>
        <div className="flex w-full flex-col border-b">
          <h2 className="text-accent">{job.title}</h2>
          <span className="text-sm">{job.enterprise}</span>
          <div className="flex-between-change flex flex-wrap justify-between">
            <span className="mr-4 text-sm opacity-70">{job.location}</span>
            <span className="text-sm text-success opacity-70">
              {job.state || "Promovido"}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}

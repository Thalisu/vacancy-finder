import Image from "next/image";
import { IFormStateData } from "../../../lib/types";

export function JobCard({ job }: { job: IFormStateData }) {
  return (
    <li className="rounded-md">
      <a
        href={job.url}
        className="flex gap-2 bg-slate-900/50 p-2"
        target="_blank"
      >
        <div className="h-14 min-h-14 w-14 min-w-14">
          <Image
            src={job.img}
            alt={job.enterprise}
            width={56}
            height={56}
            className="h-14 w-14 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <h2>{job.title}</h2>
          <span className="text-sm opacity-70">{job.enterprise}</span>
        </div>
      </a>
    </li>
  );
}

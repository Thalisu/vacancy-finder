"use client";
import JobCardContainer from "@/app/components/job/JobCardContainer";
import JobContainerBar from "@/app/components/job/JobContainerBar";
import useJobs from "@/app/hooks/useJobs";
import { poppins } from "@/app/lib/fonts";

export default function JobContainer() {
  const { task, jobs, loadingPercentage, updateJobs } = useJobs();

  if (!task) {
    return (
      <div className="absolute bottom-1/2 flex flex-col items-center gap-2">
        <span className={`${poppins.className} font-bold`}>
          {`${loadingPercentage}%`}
        </span>
        <div
          id="loading"
          className="aspect-square w-8 animate-loading rounded border-4 border-primary"
        >
          <div
            id="loading"
            className="w-full animate-loadingInner bg-primary align-top"
          ></div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative flex w-full max-w-screen-xl grow flex-col gap-2 overflow-clip rounded-md border-2 border-complementary p-2 shadow-2xl shadow-complementary">
      <JobContainerBar
        searchs={task.searchs}
        updateJobs={(keywords, promoted) =>
          updateJobs(keywords, task.searchs, promoted)
        }
      />
      <JobCardContainer jobs={jobs} />
    </main>
  );
}

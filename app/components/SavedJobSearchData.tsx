import { IJobsData } from "../lib/types";
import {
  getJobDataRemoteValueMeaning,
  getJobDataTimeValueMeaning,
} from "../lib/utils";

export default function SavedJobSearchData({
  jobSearchData,
  index,
}: {
  jobSearchData: IJobsData;
  index: number;
}) {
  return (
    <div className="pointer-events-none flex w-fit cursor-default select-none flex-col gap-1 rounded-md px-2 py-1">
      <div className="relative flex w-fit rounded-md">
        <input
          type="text"
          readOnly
          value={jobSearchData.time}
          id="input"
          name={`time-${index}`}
          className="invisible absolute left-0 whitespace-pre"
        />
        <span className="text-sm">
          Período: {getJobDataTimeValueMeaning(jobSearchData.time)}
        </span>
      </div>
      <div className="relative flex w-fit rounded-md">
        <input
          type="text"
          readOnly
          value={jobSearchData.remote}
          id="input"
          name={`remote-${index}`}
          className="invisible absolute left-0 whitespace-pre"
        />
        <span className="text-sm">
          Remoto: {getJobDataRemoteValueMeaning(jobSearchData.remote)}
        </span>
      </div>
      <div className="relative flex w-fit rounded-md">
        <input
          type="text"
          readOnly
          value={jobSearchData.location}
          id="input"
          name={`local-${index}`}
          className="invisible absolute left-0 whitespace-pre"
        />
        <span className="text-sm">
          Local: {getJobDataRemoteValueMeaning(jobSearchData.location)}
        </span>
      </div>
    </div>
  );
}

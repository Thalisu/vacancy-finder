import { useCallback, useEffect, useState } from "react";
import {
  IJob,
  IJobConfig,
  IJobResponse,
  ILinkedinTaskData,
  IResponseError,
  ITask,
} from "../lib/types";
import { useRouter } from "next/navigation";
import { uniqBy } from "lodash";
import {
  getFromSessionStorage,
  isDay,
  isHour,
  isMinute,
  isMonth,
} from "../lib/utils";
import startWebSocket from "../lib/startWebsocket";

interface IResponse {
  config: IJobConfig[];
  task_id: string;
  searchs: IJobResponse[];
  error: IResponseError;
}

const useJobs = () => {
  const [task, setTask] = useState<IResponse>();
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const router = useRouter();

  const updatePercentage = useCallback(
    (current: number, target: number, duration = 1000) => {
      const steps = Math.abs(target - current);
      if (steps === 0) return;

      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const startTime = performance.now();

      function animate() {
        const now = performance.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = easeInOutQuad(progress);
        const currentStep = Math.round(
          current + (target - current) * easedProgress,
        );

        setLoadingPercentage(currentStep);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      animate();
    },
    [],
  );

  const updateJobs = useCallback(
    (keywords: string[], searchs: IJobResponse[], promoted = false) => {
      const allJobs: IJob[] = [];
      for (let i = 0; i < searchs.length; i++) {
        const search = searchs[i];
        if (keywords.includes(search.keywords)) {
          allJobs.push(...search.jobs);
        }
      }

      let jobs = uniqBy(allJobs, "title");
      if (!promoted) {
        jobs = jobs.filter((job) => job.state !== "");
      }
      jobs = jobs.sort((a, b) => {
        if (!a.state) return 1;
        if (!b.state) return -1;
        if (isMinute(a.state) && !isMinute(b.state)) return -1;
        if (!isMinute(a.state) && isMinute(b.state)) return 1;
        if (isMinute(a.state) && isMinute(b.state)) {
          const aMinutes = Number(a.state.replaceAll(/[^0-9]/g, ""));
          const bMinutes = Number(b.state.replaceAll(/[^0-9]/g, ""));
          if (aMinutes < bMinutes) return -1;
          if (aMinutes > bMinutes) return 1;
          return 0;
        }

        if (isHour(a.state) && !isHour(b.state)) return -1;
        if (!isHour(a.state) && isHour(b.state)) return 1;
        if (isHour(a.state) && isHour(b.state)) {
          const aHours = Number(a.state.replaceAll(/[^0-9]/g, ""));
          const bHours = Number(b.state.replaceAll(/[^0-9]/g, ""));
          if (aHours < bHours) return -1;
          if (aHours > bHours) return 1;
          return 0;
        }

        if (isDay(a.state) && !isDay(b.state)) return -1;
        if (!isDay(a.state) && isDay(b.state)) return 1;
        if (isDay(a.state) && isDay(b.state)) {
          const aDays = Number(a.state.replaceAll(/[^0-9]/g, ""));
          const bDays = Number(b.state.replaceAll(/[^0-9]/g, ""));
          if (aDays < bDays) return -1;
          if (aDays > bDays) return 1;
          return 0;
        }

        if (isMonth(a.state) && !isMonth(b.state)) return -1;
        if (!isMonth(a.state) && isMonth(b.state)) return 1;
        if (isMonth(a.state) && isMonth(b.state)) {
          const aMonths = Number(a.state.replaceAll(/[^0-9]/g, ""));
          const bMonths = Number(b.state.replaceAll(/[^0-9]/g, ""));
          if (aMonths < bMonths) return -1;
          if (aMonths > bMonths) return 1;
          return 0;
        }
        return 0;
      });

      setJobs(() => jobs);
    },
    [],
  );

  useEffect(() => {
    const data: ILinkedinTaskData = getFromSessionStorage("@CURRENT_SEARCH");
    if (!data) {
      return;
    }
    const duration = 10000 + (data.search.length - 1) * 10000;
    updatePercentage(0, 95, duration);
  }, [updatePercentage]);

  useEffect(() => {
    const data: ILinkedinTaskData = getFromSessionStorage("@CURRENT_SEARCH");
    if (!data) {
      router.push("/");
    }

    const config = data.search;
    const task_id = data.task_id;

    (async () => {
      try {
        const webSocketResponse: ITask = await startWebSocket(data.task_id);
        const response = {
          config,
          task_id,
          searchs: webSocketResponse.response || [],
          error: webSocketResponse.error,
        };
        updatePercentage(95, 100, 250);
        setTimeout(() => {
          updateJobs(
            response.searchs.map((search) => search.keywords),
            response.searchs,
          );
          setTask(() => response);
        }, 250);
      } catch (error) {
        console.error(error);
        router.push("/");
      }
    })();
  }, [updateJobs, updatePercentage, router]);

  return {
    jobs,
    task,
    updateJobs,
    loadingPercentage,
  };
};

export default useJobs;

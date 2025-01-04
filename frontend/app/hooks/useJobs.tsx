import { useCallback, useEffect, useState } from "react";
import {
  IGetJobResponse,
  IJob,
  IJobConfig,
  IJobResponse,
  ILinkedinTaskData,
  IResponseError,
} from "../lib/types";
import { useRouter } from "next/navigation";
import { uniqBy } from "lodash";
import { getFromSessionStorage } from "../lib/utils";
import { backendUrl } from "../lib/config";

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

        if (!a.state.includes("horas")) return 1;
        if (!b.state.includes("horas")) return -1;
        const aHours = Number(a.state.replaceAll(/[^0-9]/g, ""));
        const bHours = Number(b.state.replaceAll(/[^0-9]/g, ""));
        if (aHours < bHours) return -1;
        if (aHours > bHours) return 1;

        if (!a.state.includes("dia") || !a.state.includes("dias")) return 1;
        if (!b.state.includes("dia") || !b.state.includes("dias")) return -1;
        const aDays = Number(a.state.replaceAll(/[^0-9]/g, ""));
        const bDays = Number(b.state.replaceAll(/[^0-9]/g, ""));
        if (aDays < bDays) return -1;
        if (aDays > bDays) return 1;

        if (!a.state.includes("mês")) return 1;
        if (!b.state.includes("mês")) return -1;
        const aMonths = Number(a.state.replaceAll(/[^0-9]/g, ""));
        const bMonths = Number(b.state.replaceAll(/[^0-9]/g, ""));
        if (aMonths < bMonths) return -1;
        if (aMonths > bMonths) return 1;

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
    updatePercentage(0, 100, duration);
  }, [updatePercentage]);

  useEffect(() => {
    const data: ILinkedinTaskData = getFromSessionStorage("@CURRENT_SEARCH");
    if (!data) {
      router.push("/");
    }

    const socket = new WebSocket(
      `ws://${backendUrl}/linkedin/ws/${data.task_id}`,
    );

    socket.onmessage = (event) => {
      const eventData: IGetJobResponse = JSON.parse(event.data);
      if ("status" in eventData) {
        router.push("/");
      }
      if (eventData.task_result) {
        updatePercentage(74, 100);
        const response = {
          config: data.search,
          task_id: data.task_id,
          searchs: eventData.task_result.response || [],
          error: eventData.task_result.error,
        };
        updateJobs(
          response.searchs.map((search) => search.keywords),
          response.searchs,
        );
        setTask(() => response);
      }
    };
  }, [updateJobs, updatePercentage, router]);

  return {
    jobs,
    task,
    updateJobs,
    loadingPercentage,
  };
};

export default useJobs;

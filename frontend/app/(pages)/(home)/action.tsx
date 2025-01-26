"use server";
import { IFormState, IJobConfig } from "@/app/lib/types";
import AppError from "@/app/errors/appError";
import { backendUrl } from "@/app/lib/config";

export async function search(
  state: IFormState,
  formData: FormData,
): Promise<IFormState> {
  const jobRequest: IJobConfig[] = [];
  let i = 0;
  while (true) {
    const keywords = formData
      .getAll(`keyword-${i}`)
      .join(" ")
      .replace(/\s\(\s/g, " (")
      .replace(/\s\)\s/g, ") ");
    if (keywords === "") {
      break;
    }

    const timeframe = formData.get(`time-${i}`) as string;
    const remote = formData.get(`remote-${i}`) as string;
    const local = formData.get(`local-${i}`) as string;
    i++;
    jobRequest.push({ keywords, timeframe, remote, local });
  }

  const url = new URL(`/linkedin/`, `http://${backendUrl}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobRequest),
  });

  try {
    const task_id = await response.json();
    const data = { ...task_id, search: jobRequest };

    return {
      ...state,
      data,
      id_ready: true,
    };
  } catch (error) {
    throw new AppError("Internal error: " + error, 500);
  }
}

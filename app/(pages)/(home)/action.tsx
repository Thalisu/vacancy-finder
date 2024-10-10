"use server";
import { headers } from "next/headers";
import { IFormState } from "@/app/lib/types";
import AppError from "@/app/errors/appError";

export async function search(
  state: IFormState,
  formData: FormData,
): Promise<IFormState> {
  const currentSearchsLength = new Array(state.length).fill(0);
  const searchs = currentSearchsLength.map((x, i) => {
    const keywords = formData
      .getAll(`keyword-${i}`)
      .join(" ")
      .replace(/\s\(\s/g, " (")
      .replace(/\s\)\s/g, ") ");

    const timeframe = formData.get(`time-${i}`);
    const remote = formData.get(`remote-${i}`);
    const local = "Brazil";
    return { keywords, timeframe, remote, local };
  });

  const baseUrl = headers().get("x-url");
  if (!baseUrl) {
    throw new AppError("BaseUrl not found", 500);
  }

  const requests = searchs.map((search) => {
    const url = new URL(
      `/api/linkedin?keywords=${search.keywords}&timeframe=${search.timeframe}&remote=${search.remote}&location=${search.local}`,
      baseUrl,
    );
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  try {
    const responses = await Promise.all(requests);
    const dataPromises = responses.map((response) => {
      if (!response.ok) {
        return [];
      }
      return response.json();
    });
    const jobs = await Promise.all(dataPromises);
    return { ...state, jobs, loading: false };
  } catch (error) {
    throw new AppError("Internal error: " + error, 500);
  }
}

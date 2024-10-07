"use server";
import { headers } from "next/headers";
import { IFormState } from "../lib/types";
import AppError from "../errors/appError";

export async function search(
  state: IFormState,
  formData: FormData,
): Promise<IFormState> {
  const keywords = new Array(state.length).fill(0).map((x, i) => {
    return formData
      .getAll(`keyword-${i}`)
      .join(" ")
      .replace(/\s\(\s/g, " (")
      .replace(/\s\)\s/g, ") ");
  });

  const baseUrl = headers().get("x-url");
  if (!baseUrl) {
    throw new AppError("BaseUrl not found", 500);
  }

  const requests = keywords.map((keyword) => {
    const url = new URL(`/api/linkedin?keywords=${keyword}`, baseUrl);
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
    const data = await Promise.all(dataPromises);
    return { length: state.length, data };
  } catch (error) {
    throw new AppError("Internal error: " + error, 500);
  }
}

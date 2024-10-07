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

  const url = new URL(`/api/linkedin?keywords=${keywords[0]}`, baseUrl);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return {
      errors: [
        "Não foi possivel realizar a pesquisa, tente novamente em alguns segundos",
      ],
      length: state.length,
    };
  }
  const data = await response.json();
  return { length: state.length, data };
}

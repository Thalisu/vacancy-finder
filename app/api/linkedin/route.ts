"use server";
import apiErrorHandler from "@/app/errors/apiErrorHandler";
import AppError from "@/app/errors/appError";
import getLinkedinJobs from "@/app/services/Linkedin";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  try {
    if (!searchParams.has("keywords")) {
      throw new AppError("No keywords provided", 400);
    }
    const keywords = searchParams.get("keywords") || "";
    const location = searchParams.get("location") || "";
    const timeframe = searchParams.get("timeframe") || "";
    const remote = searchParams.get("remote") || "";
    const page = searchParams.get("page") || "";

    const res = await getLinkedinJobs(
      keywords,
      location,
      timeframe,
      remote,
      page
    );
    return Response.json(res);
  } catch (error) {
    return apiErrorHandler(error as Error);
  }
}

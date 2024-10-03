import AppError from "./appError";

export default function apiErrorHandler(error: Error): Response {
  if (error instanceof AppError) {
    return Response.json(
      { message: error.message },
      { status: error.statusCode }
    );
  } else {
    console.error(error);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

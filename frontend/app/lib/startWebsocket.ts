"use server";

import { redirect } from "next/navigation";
import { backendUrl } from "./config";
import { IGetJobResponse, ITask } from "./types";

const startWebSocket = async (task_id: string): Promise<ITask> => {
  const socket = new WebSocket(`ws://${backendUrl}/linkedin/ws/${task_id}`);
  return new Promise((resolve) => {
    socket.onmessage = (event) => {
      const eventData: IGetJobResponse = JSON.parse(event.data);
      if ("status" in eventData) {
        socket.close();
        redirect("/");
      }
      if (eventData.task_result) {
        resolve(eventData.task_result);
      }
    };
  });
};

export default startWebSocket;

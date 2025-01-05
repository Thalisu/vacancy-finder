"use server";

import { backendUrl } from "./config";
import { IGetJobResponse, ITask } from "./types";

const startWebSocket = async (task_id: string): Promise<ITask> => {
  const socket = new WebSocket(`ws://${backendUrl}/linkedin/ws/${task_id}`);
  return new Promise((resolve) => {
    socket.onmessage = (event) => {
      const eventData: IGetJobResponse = JSON.parse(event.data);
      if ("detail" in eventData) {
        socket.close();
        throw new Error(eventData.detail as string);
      }
      if (eventData.task_result) {
        resolve(eventData.task_result);
      }
    };
  });
};

export default startWebSocket;

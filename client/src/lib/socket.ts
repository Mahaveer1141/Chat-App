import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SERVER_URL || ""
    : "http://localhost:5000";

export const socket = io(URL);

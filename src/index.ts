import dotenv from "dotenv";
import http from "node:http";
import { requestListener } from "./requestListener";

dotenv.config();

const PORT = process.env.PORT || 4000;

export const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

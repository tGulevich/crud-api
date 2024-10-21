import dotenv from "dotenv";
import http, { IncomingMessage, ServerResponse } from "node:http";
import createUserHandler from "./routes/createUser";
import getUsersHandler from "./routes/getUsers";
import updateUserHandler from "./routes/updateUser";
import getUserByIdHandler from "./routes/getUserById";
import deleteUserHandler from "./routes/deleteUser";
import { parseBody } from "./utils/bodyParser";

dotenv.config();

const PORT = process.env.PORT || 4000;

export const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");

  const url = req.url || "";
  const userId = url.split("/")[3];

  if (req.method === "GET" && url === "/api/users") {
    getUsersHandler(req, res);
  } else if (req.method === "GET" && url.startsWith("/api/users/") && userId) {
    getUserByIdHandler(req, res, userId);
  } else if (req.method === "POST" && url === "/api/users") {
    const body = await parseBody(req);
    createUserHandler(req, res, body);
  } else if (req.method === "PUT" && url.startsWith("/api/users/") && userId) {
    const body = await parseBody(req);
    updateUserHandler(req, res, userId, body);
  } else if (
    req.method === "DELETE" &&
    url.startsWith("/api/users/") &&
    userId
  ) {
    deleteUserHandler(req, res, userId);
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

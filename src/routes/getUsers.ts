import { IncomingMessage, ServerResponse } from "http";
import { getUsersList } from "../usersController";

const getUsersHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end(JSON.stringify(getUsersList()));
};

export default getUsersHandler;

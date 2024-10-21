import { IncomingMessage, ServerResponse } from "http";
import { getUsersList } from "../usersController";
import { handleError } from "../utils/errorHandler";

const getUsersHandler = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = getUsersList();
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } catch (error: any) {
    handleError(res, error);
  }
};

export default getUsersHandler;

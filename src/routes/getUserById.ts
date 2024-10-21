import { IncomingMessage, ServerResponse } from "http";
import { getUserById } from "../usersController";
import { validateUserId } from "../utils/validateUUID";
import { handleError } from "../utils/errorHandler";

const getUserByIdHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string
) => {
  try {
    validateUserId(userId);
    const user = getUserById(userId);

    if (!user) {
      res.writeHead(404);
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    res.writeHead(200);
    res.end(JSON.stringify(user));
  } catch (error: any) {
    if (error.message === "Invalid UUID") {
      res.writeHead(400);
      res.end(
        JSON.stringify({ message: "Invalid userId (must be a valid UUID)" })
      );
    } else {
       handleError(res, error);
    }
  }
};

export default getUserByIdHandler;

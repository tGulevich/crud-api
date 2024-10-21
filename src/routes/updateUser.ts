import { IncomingMessage, ServerResponse } from "http";
import { updateUser } from "../usersController";
import { validateUserId } from "../utils/validateUUID";
import { handleError } from "../utils/errorHandler";

const updateUserHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
  body: any
) => {
  try {
    validateUserId(userId);

    const updatedUser = updateUser(userId, body);
    if (!updatedUser) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(updatedUser));
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

export default updateUserHandler;

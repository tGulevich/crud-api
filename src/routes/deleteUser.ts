import { IncomingMessage, ServerResponse } from "http";
import { deleteUser } from "../usersController";
import { validateUserId } from "../utils/validateUUID";

const deleteUserHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string
) => {
    try {
      validateUserId(userId);

      const deleted = deleteUser(userId);
      if (!deleted) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }

      res.writeHead(204);
      res.end();
    } catch (error: any) {
      if (error.message === "Invalid UUID") {
        res.writeHead(400);
        res.end(
          JSON.stringify({ message: "Invalid userId (must be a valid UUID)" })
        );
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    }
};

export default deleteUserHandler;

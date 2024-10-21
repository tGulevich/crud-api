import { IncomingMessage, ServerResponse } from "http";
import { createUser } from "../usersController";
import { handleError } from "../utils/errorHandler";

const createUserHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  body: any
) => {
  try {
    const { username, age, hobbies } = body;

    if (!username || !age || !Array.isArray(hobbies)) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          message: "Missing required fields: username, age, hobbies",
        })
      );
      return;
    }

    const newUser = createUser(username, age, hobbies);
    res.writeHead(201);
    res.end(JSON.stringify(newUser));
  } catch (error: any) {
    handleError(res, error);
  }
};

export default createUserHandler;

import { IncomingMessage, ServerResponse } from "http";
import { createUser } from "../usersController";

const createUserHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  body: any
) => {
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
};

export default createUserHandler;

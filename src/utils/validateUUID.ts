import { validate as isUUID } from "uuid";

export const validateUserId = (userId: string): void => {
  if (!isUUID(userId)) {
    throw new Error("Invalid UUID");
  }
};

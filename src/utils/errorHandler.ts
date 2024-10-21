import { ServerResponse } from "http";

export const handleError = (res: ServerResponse, error: any) => {
  res.writeHead(500);
  res.end(
    JSON.stringify({ message: "Internal Server Error", details: error.message })
  );
};

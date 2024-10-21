import request from "supertest";
import { createServer } from "http";
import { requestListener } from "../requestListener";

const server = createServer(requestListener);
server.listen(8000);

describe("Users API", () => {
  afterAll((done) => {
    server.close(done);
    jest.clearAllMocks();
  });

  let userId: string;

  it("should create a new user with POST /api/users", async () => {
    const newUser = {
      username: "Taylor Swift",
      age: 22,
      hobbies: ["music"],
    };

    const { statusCode, body } = await request(server)
      .post("/api/users")
      .send(newUser);

    expect(statusCode).toBe(201);
    expect(body.username).toBe("Taylor Swift");
    expect(body.age).toBe(22);
    expect(body.hobbies).toEqual(["music"]);

    userId = body.id; // Store the ID for future tests
  });

  it("should return the created user with GET /api/users/{userId}", async () => {
    const response = await request(server)
      .get(`/api/users/${userId}`)
      .expect(200);

    expect(response.body.id).toBe(userId);
    expect(response.body.username).toBe("Taylor Swift");
  });

  it("should update the user with PUT /api/users/{userId}", async () => {
    const updatedUser = {
      username: "Taylor Updated",
      age: 31,
      hobbies: ["updated hobby"],
    };

    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser)
      .expect(200);

    expect(response.body.username).toBe("Taylor Updated");
    expect(response.body.age).toBe(31);
    expect(response.body.hobbies).toEqual(["updated hobby"]);
  });

  it("should delete the user with DELETE /api/users/{userId}", async () => {
    const response = await request(server)
      .delete(`/api/users/${userId}`)
      .expect(204);

    // Check if the user is deleted
    await request(server).get(`/api/users/${userId}`).expect(404); // Expect a 404 error for the deleted user
  });
});

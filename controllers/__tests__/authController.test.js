const app = require("../../app");

const request = require("supertest");

describe("Auth login test", () => {
  it("Should be successful login ", async () => {
    const user = {
      email: "example3@example.com",
      password: "examplepassword1",
    };

    const result = await request(app).post("/api/users/login").send(user);

    expect(result.statusCode).toBe(200);

    expect(result.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );

    expect(result.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });

  it("Should be Bad request error ", () => {
    const users = [
      {},
      {
        email: "example3@example.com",
      },
      {
        password: "examplepassword1",
      },
      {
        email: "example3example.com",
        password: "examplepassword1",
      },
      {
        email: "example3@example.com",
        password: "password",
      },
    ];

    users.forEach(async (user) => {
      await request(app).post("/api/users/login").send(user).expect(400);
    });
  });

  it("Should be Conflict error ", () => {
    const users = [
      {
        email: "test@test.com",
        password: "examplepassword1",
      },
      {
        email: "example3@example.com",
        password: "examplepassword11111",
      },
    ];

    users.forEach(async (user) => {
      await request(app).post("/api/users/login").send(user).expect(409);
    });
  });
});

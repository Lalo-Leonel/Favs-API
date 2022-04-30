const req = require("supertest");
const { app } = require("../app");
const { connect, disconnect, cleanup } = require("../database");
const { createUser } = require("../utils/testHelpers");

describe("auth", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnect();
  });

  it.each([
    { email: "test3@test.com", password: "Hola123#" },
    { email: "test4@test.com", password: "Hola123#" },
    { email: "test5@test.com", password: "Hola123#" },
    { email: "test6@test.com", password: "Hola123#" },
  ])("should registrer user correctly", async ({ email, password }) => {
    const res = await req(app)
      .post("/auth/local/signup")
      .send({ email, password });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should run user validations", async () => {
    const res = await req(app)
      .post("/auth/local/signup")
      .send({ email: "invalid", password: "Password123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/email is not valid/i);
  });

  it("should run user validations", async () => {
    const res = await req(app)
      .post("/auth/local/signup")
      .send({ email: "test@test.com", password: "Password123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/password is not valid/i);
  });

  it("should login user correctly", async () => {
    const user = { email: "test@test.com", password: "Password123$" };

    await createUser(user);

    const res = await req(app).post("/auth/local/signin").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});

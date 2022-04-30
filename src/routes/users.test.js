const req = require("supertest");
const { app } = require("../app");
const { connect, disconnect, cleanup } = require("../database");
const {
  createUser,
  generateToken,
} = require("../utils/testHelpers");

describe("users", () => {
  let token;
  let user;

  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
    const userData = { email: "test@test.com", password: "Password123#" };
    user = await createUser(userData);
    token = generateToken(user);
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should list users if I am authenticated", async () => {
    const res = await req(app)
      .get("/api/users/")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("should show user if I am authenticated", async () => {
    const res = await req(app)
      .get(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});

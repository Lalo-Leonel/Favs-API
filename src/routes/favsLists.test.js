const req = require("supertest");
const { app } = require("../app");
const { connect, disconnect, cleanup } = require("../database");
const {
  createUser,
  generateToken,
  createFavList,
} = require("../utils/testHelpers");

describe("favsLists", () => {
  let token;
  let user;
  let favsLists;

  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await cleanup();
    const userData = { email: "test@test.com", password: "Password123#" };
    user = await createUser(userData);
    favsLists = await createFavList({ user: user._id });
    token = generateToken(user);
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should create favList if I am authenticated", async () => {
    const favList = {
      name: "fav 1",
      favoritos: [
        { title: "Android", description: "huawei", link: "abcd.com" },
      ],
    };

    const res = await req(app)
      .post("/api/favs/")
      .send(favList)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(201);
  });

  it("should not create FavList if user is not authenticated", async () => {
    const favList = {
      name: "fav 1",
      favoritos: [
        { title: "Android", description: "huawei", link: "abcd.com" },
      ],
    };

    const res = await req(app).post("/api/favs/").send(favList);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/your session has expired/i);
  });

  it("should allow delete if user is owner", async () => {
    const res = await req(app)
      .delete(`/api/favs/${favsLists._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});

const controller = require("../controllers/userController");
const { sql } = require("../config/sql");

jest.mock("../config/sql");

describe("User Controller Tests", () => {
  let req, res, mockPool, mockRequest;

  beforeEach(() => {
    mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn(),
    };

    mockPool = {
      request: jest.fn(() => mockRequest),
    };

    sql.connect = jest.fn(() => Promise.resolve(mockPool));

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("signup", () => {
    it("should return 400 if required fields are missing", async () => {
      req = { body: {} };
      await controller.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 if email or phone exists", async () => {
      req = {
        body: {
          name: "Asad",
          email: "asad@test.com",
          phone: "1234567890",
          password: "pass",
        },
      };
      mockRequest.query.mockResolvedValue({ recordset: [{ id: 1 }] });

      await controller.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email or phone already exists",
      });
    });

    it("should return 201 on successful signup", async () => {
      req = {
        body: {
          name: "Asad",
          email: "asad@test.com",
          phone: "1234567890",
          password: "pass",
        },
      };

      // Simulate user doesn't exist
      mockRequest.query
        .mockResolvedValueOnce({ recordset: [] }) // Check for existing user
        .mockResolvedValueOnce({}); // Insert user

      await controller.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("login", () => {
    it("should return 401 if user doesn't exist", async () => {
      req = { body: { email: "no@test.com", password: "pass" } };
      mockRequest.query.mockResolvedValue({ recordset: [] });

      await controller.login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("should return 401 for invalid password", async () => {
      req = { body: { email: "asad@test.com", password: "wrongpass" } };
      mockRequest.query.mockResolvedValue({
        recordset: [{ hashed_password: "fakehash", id: 1 }],
      });

      const argon2 = require("argon2");
      jest.spyOn(argon2, "verify").mockResolvedValue(false);

      await controller.login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("should return 200 on valid login", async () => {
      req = { body: { email: "asad@test.com", password: "pass" } };
      mockRequest.query.mockResolvedValue({
        recordset: [{ hashed_password: "hash", id: 1 }],
      });

      const argon2 = require("argon2");
      jest.spyOn(argon2, "verify").mockResolvedValue(true);

      await controller.login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      req = {};
      mockRequest.query.mockResolvedValue({
        recordset: [{ id: 1, name: "Asad" }],
      });

      await controller.getAllUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Asad" }]);
    });
  });

  describe("getUserById", () => {
    it("should return 404 if user not found", async () => {
      req = { params: { id: 1 } };
      mockRequest.query.mockResolvedValue({ recordset: [] });

      await controller.getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should return user if found", async () => {
      req = { params: { id: 1 } };
      mockRequest.query.mockResolvedValue({
        recordset: [{ id: 1, name: "Asad" }],
      });

      await controller.getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Asad" });
    });
  });

  describe("updateUser", () => {
    it("should update a user", async () => {
      req = {
        params: { id: 1 },
        body: { name: "New Name", email: "new@test.com", phone: "9876543210" },
      };

      mockRequest.query.mockResolvedValue({});

      await controller.updateUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      req = { params: { id: 1 } };
      mockRequest.query.mockResolvedValue({});

      await controller.deleteUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("deleteAllUsers", () => {
    it("should delete all users", async () => {
      req = {};
      mockRequest.query.mockResolvedValue({});

      await controller.deleteAllUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

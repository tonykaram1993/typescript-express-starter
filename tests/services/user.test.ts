jest.mock("../../src/models/User.model");
jest.mock("../../src/utils/error.util");
jest.mock("bcrypt");

import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Services
import userServices from "../../src/services/user.services";

// Models
import UserModel, { User } from "../../src/models/User.model";

describe("getUserByEmail", () => {
  test("getUserByEmail returns null if no user is found", async () => {
    (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

    const returnedUser = await userServices.getUserByEmail("john@thedoes.com");
    expect(returnedUser).toBeNull();
  });

  test("getUserByEmail returns user if user is found", async () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (UserModel.findOne as jest.Mock).mockReturnValueOnce(user);

    const returnedUser = await userServices.getUserByEmail("john@thedoes.com");
    expect(returnedUser).toEqual(user);
  });
});

describe("getUserByRefreshToken", () => {
  test("getUserByRefreshToken returns null if no user is found", async () => {
    (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

    const returnedUser = await userServices.getUserByRefreshToken(
      "john@thedoes.com"
    );
    expect(returnedUser).toBeNull();
  });

  test("getUserByRefreshToken returns user if user is found", async () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (UserModel.findOne as jest.Mock).mockReturnValueOnce(user);

    const returnedUser = await userServices.getUserByRefreshToken(
      "refreshToken"
    );
    expect(returnedUser).toEqual(user);
  });
});

describe("verifyUserByEmail", () => {
  test("verifyUserByEmail throws error if no user is found", async () => {
    (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

    await expect(
      userServices.verifyUserByEmail("john@thedoes.com")
    ).rejects.toThrowError();
  });

  test("verifyUserByEmail returns user if user is found", async () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (UserModel.findOne as jest.Mock).mockReturnValueOnce(user);

    const returnedUser = await userServices.verifyUserByEmail(
      "john@thedoes.com"
    );

    expect(returnedUser).toEqual(user);
  });
});

describe("verifyUserByRefreshToken", () => {
  test("verifyUserByRefreshToken throws error if no user is found", async () => {
    (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

    await expect(
      userServices.verifyUserByRefreshToken("john@thedoes.com")
    ).rejects.toThrowError();
  });

  test("verifyUserByRefreshToken returns user if user is found", async () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (UserModel.findOne as jest.Mock).mockReturnValueOnce(user);

    const returnedUser = await userServices.verifyUserByRefreshToken(
      "john@thedoes.com"
    );

    expect(returnedUser).toEqual(user);
  });
});

describe("checkEmailUniqueness", () => {
  test("checkEmailUniqueness throws error if user is found", async () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (UserModel.findOne as jest.Mock).mockReturnValueOnce(user);

    await expect(
      userServices.checkEmailUniqueness("john@thedoes.com")
    ).rejects.toThrowError();
  });

  test("checkEmailUniqueness returns true if no user is found", async () => {
    (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

    const returnedUser = await userServices.checkEmailUniqueness(
      "jogn@thedoes.com"
    );

    expect(returnedUser).toEqual(undefined);
  });
});

describe("addUser", () => {
  it("addUser returns added user", async () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (UserModel.create as jest.Mock).mockReturnValueOnce(user);
    (bcrypt.genSaltSync as jest.Mock).mockReturnValueOnce("salt");
    (bcrypt.hash as jest.Mock).mockReturnValueOnce("hashedPassword");

    const returnedUser = await userServices.addUser("email", "password");

    expect(returnedUser).toEqual(user);
  });
});

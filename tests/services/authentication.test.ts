jest.mock("../../src/utils/error.util");
jest.mock("../../src/models/User.model");
jest.mock("../../src/utils/getEnvVariable.util");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

import jsonwebtoken from "jsonwebtoken";
import lodashOmit from "lodash/omit";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Utils
import getEnvVariable from "../../src/utils/getEnvVariable.util";

// Services
import authenticationServices from "../../src/services/authentication.services";

// Models
import UserModel, { User } from "../../src/models/User.model";
import { userPropertiesToOmitInTokens } from "../../src/validation/types/authentication/DecodedJwtToken.type";

const envVariableReturn = "env";

describe("getTokenFromAuthorizationHeader", () => {
  it("getTokenFromAuthorizationHeader throws an error authorization header is formatted incorrectly", () => {
    expect(() =>
      authenticationServices.getTokenFromAuthorizationHeader("Bearer")
    ).toThrowError();
  });

  it("getTokenFromAuthorizationHeader returns token", () => {
    expect(
      authenticationServices.getTokenFromAuthorizationHeader("Bearer token")
    ).toEqual("token");
  });
});

describe("getSafeUserData", () => {
  it("getSafeUserData returns user with specific fields omitted", () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    const safeUser = lodashOmit(user, userPropertiesToOmitInTokens);

    expect(authenticationServices.getSafeUserData(user)).toEqual(safeUser);
  });
});

describe("generateJwtToken", () => {
  it("generateJetToken return jwtToken", () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    const token = "jwtToken";

    (getEnvVariable as jest.Mock).mockReturnValueOnce(envVariableReturn);
    (jsonwebtoken.sign as jest.Mock).mockReturnValueOnce(token);

    expect(authenticationServices.generateJwtToken(user)).toEqual(token);
  });
});

describe("generateRefreshToken", () => {
  it("generateRefreshToken return refreshToken", async () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (getEnvVariable as jest.Mock).mockReturnValueOnce(envVariableReturn);
    (jsonwebtoken.sign as jest.Mock).mockReturnValueOnce("refreshToken");
    (UserModel.findOneAndUpdate as jest.Mock).mockReturnValueOnce(null);

    const refreshToken = await authenticationServices.generateJwtToken(user);

    expect(refreshToken).toEqual("refreshToken");
  });
});

describe("deleteRefreshToken", () => {
  it("deleteRefreshToken returns nothing and does not throw an error", () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (UserModel.findOneAndUpdate as jest.Mock).mockReturnValueOnce(null);

    expect(authenticationServices.deleteRefreshToken(user)).resolves.toEqual(
      undefined
    );
  });
});

describe("decodeToken", () => {
  it("decodeToken returns decodedToken", () => {
    (getEnvVariable as jest.Mock).mockReturnValueOnce(envVariableReturn);
    (jsonwebtoken.verify as jest.Mock).mockReturnValueOnce("decodedToken");

    expect(authenticationServices.decodeToken("token")).toEqual("decodedToken");
  });
});

describe("checkUserPassword", () => {
  it("checkUserPassword throws an error when password is incorrect", async () => {
    const user: User = {
      _id: new mongoose.Types.ObjectId(),
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
      __v: 0,
    };

    (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(false);

    expect(() =>
      authenticationServices.checkUserPassword(user, "password")
    ).toThrowError();
  });
});

jest.mock("../../src/utils/error.util");
jest.mock("../../src/utils/getEnvVariable.util");
jest.mock("jsonwebtoken");

import jsonwebtoken from "jsonwebtoken";

// Utils
import makeError from "../../src/utils/error.util";
import getEnvVariable from "../../src/utils/getEnvVariable.util";

// Services
import authenticationServices from "../../src/services/authentication.services";

// Models
import { User } from "../../src/models/User.model";
import DecodedJwtToken, {
  userPropertiesToOmitInTokens,
} from "../../src/validation/types/authentication/DecodedJwtToken.type";

describe("getTokenFromAuthorizationHeader", () => {
  it("getTokenFromAuthorizationHeader throws an error authorization header is formatted incorrectly", () => {
    (makeError as jest.Mock).mockReturnValueOnce(new Error("error"));

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
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
    };

    const safeUser: DecodedJwtToken = {
      ...user,
      ...userPropertiesToOmitInTokens.reduce(
        (accumulator, property) => ({ ...accumulator, [property]: undefined }),
        {}
      ),
    };
    userPropertiesToOmitInTokens;

    expect(authenticationServices.getSafeUserData(user)).toEqual(safeUser);
  });
});

describe("generateJwtToken", () => {
  it("generateJetToken return jwtToken", () => {
    const user: User = {
      email: "john@thedoes.com",
      passwordHash: "passwordHash",
      salt: "salt",
      refreshToken: "refreshToken",
    };

    (getEnvVariable as jest.Mock).mockReturnValueOnce("env");
    (jsonwebtoken.sign as jest.Mock).mockReturnValueOnce("jwtToken");

    expect(authenticationServices.generateJwtToken(user)).toEqual("jwtToken");
  });
});

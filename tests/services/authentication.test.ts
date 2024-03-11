jest.mock("../../src/helpers/error.helper");
jest.mock("../../src/models/User.model");
jest.mock("../../src/helpers/envVariable.helper");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import lodashOmit from "lodash/omit";

// Helpers
import envVariable from "../../src/helpers/envVariable.helper";

// Services
import authenticationServices from "../../src/services/authentication.services";

// Models
import UserModel, { User } from "../../src/models/User.model";

// Types
import { userPropertiesToOmitInTokens } from "../../src/validation/types/authentication/DecodedJwtToken.type";

const envVariableReturn = "env";

const user: User = {
    _id: new mongoose.Types.ObjectId(),
    email: "john@thedoes.com",
    passwordHash: "passwordHash",
    salt: "salt",
    refreshToken: "refreshToken",
    isForcedToLogin: false,
    incorrectPasswordAttempts: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
};

describe("getTokenFromAuthorizationHeader", () => {
    test("getTokenFromAuthorizationHeader throws an error authorization header is formatted incorrectly", () => {
        expect(() =>
            authenticationServices.getTokenFromAuthorizationHeader("Bearer")
        ).toThrowError();
    });

    test("getTokenFromAuthorizationHeader returns token", () => {
        expect(
            authenticationServices.getTokenFromAuthorizationHeader(
                "Bearer token"
            )
        ).toEqual("token");
    });
});

describe("getSafeUserData", () => {
    test("getSafeUserData returns user with specific fields omitted", () => {
        const safeUser = lodashOmit(user, userPropertiesToOmitInTokens);

        expect(authenticationServices.getSafeUserData(user)).toEqual(safeUser);
    });
});

describe("generateJwtToken", () => {
    test("generateJetToken return jwtToken", () => {
        const token = "jwtToken";

        (envVariable.getSingle as jest.Mock).mockReturnValueOnce(
            envVariableReturn
        );
        (jsonwebtoken.sign as jest.Mock).mockReturnValueOnce(token);

        expect(authenticationServices.generateJwtToken(user)).toEqual(token);
    });
});

describe("generateRefreshToken", () => {
    test("generateRefreshToken return refreshToken", async () => {
        (envVariable.getSingle as jest.Mock).mockReturnValueOnce(
            envVariableReturn
        );
        (jsonwebtoken.sign as jest.Mock).mockReturnValueOnce("refreshToken");
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const refreshToken = await authenticationServices.generateRefreshToken(
            user
        );

        expect(refreshToken).toEqual("refreshToken");
    });
});

describe("generateResetPasswordToken", () => {
    test("generateResetPasswordToken return refreshToken", async () => {
        (envVariable.getSingle as jest.Mock).mockReturnValueOnce(
            envVariableReturn
        );
        (jsonwebtoken.sign as jest.Mock).mockReturnValueOnce("refreshToken");
        (UserModel.updateOne as jest.Mock).mockReturnValueOnce(null);

        const refreshToken =
            await authenticationServices.generateResetPasswordToken("email");

        expect(refreshToken).toEqual("refreshToken");
    });
});

describe("deleteRefreshToken", () => {
    test("deleteRefreshToken returns nothing and does not throw an error", () => {
        (UserModel.findOneAndUpdate as jest.Mock).mockReturnValueOnce(user);

        expect(
            authenticationServices.deleteRefreshToken(user)
        ).resolves.toEqual(user);
    });
});

describe("decodeToken", () => {
    test("decodeToken returns decodedToken", () => {
        (envVariable.getSingle as jest.Mock).mockReturnValueOnce(
            envVariableReturn
        );
        (jsonwebtoken.verify as jest.Mock).mockReturnValueOnce("decodedToken");

        expect(authenticationServices.decodeToken("token")).toEqual(
            "decodedToken"
        );
    });
});

describe("checkUserPassword", () => {
    test("checkUserPassword throws an error when password is incorrect", async () => {
        (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(false);

        expect(() =>
            authenticationServices.checkUserPassword(user, "password")
        ).toThrowError();
    });
});

describe("encryptUserPassword", () => {
    test("encryptUserPassword throws an error when password is incorrect", async () => {
        (bcrypt.genSaltSync as jest.Mock).mockReturnValueOnce("salt");
        (bcrypt.hashSync as jest.Mock).mockReturnValueOnce("hash");

        expect(authenticationServices.encryptUserPassword("password")).toEqual({
            salt: "salt",
            hash: "hash",
        });
    });
});

describe("forceUserToLogin", () => {
    test("forceUserToLogin throws an error when password is incorrect", async () => {
        (UserModel.findOneAndUpdate as jest.Mock).mockReturnValueOnce(user);

        const refreshToken = await authenticationServices.forceUserToLogin(
            "password"
        );

        expect(refreshToken).toEqual(user);
    });
});

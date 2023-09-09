jest.mock("../../src/models/User.model");
jest.mock("../../src/utils/error.util");
jest.mock("bcrypt");

import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Services
import userServices from "../../src/services/user.services";

// Models
import UserModel, { User } from "../../src/models/User.model";

// Utils
import PlatformError from "../../src/utils/error.util";

describe("getUserByEmail", () => {
    test("getUserByEmail returns null if no user is found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const returnedUser = await userServices.getUserByEmail(
            "john@thedoes.com"
        );
        expect(returnedUser).toBe(false);
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

        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const returnedUser = await userServices.getUserByEmail(
            "john@thedoes.com"
        );
        expect(returnedUser).toEqual(user);
    });
});

describe("getUserByRefreshToken", () => {
    test("getUserByRefreshToken returns null if no user is found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const returnedUser = await userServices.getUserByRefreshToken(
            "john@thedoes.com"
        );
        expect(returnedUser).toBe(false);
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

        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const returnedUser = await userServices.getUserByRefreshToken(
            "refreshToken"
        );
        expect(returnedUser).toEqual(user);
    });
});

describe("verifyUserByEmail", () => {
    test("verifyUserByEmail throws error if no user is found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const result = userServices.verifyUserByEmail("john@thedoes.com");

        expect(result).rejects.toBeInstanceOf(PlatformError);
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

        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const returnedUser = await userServices.verifyUserByEmail(
            "john@thedoes.com"
        );

        expect(returnedUser).toEqual(user);
    });
});

describe("verifyUserByRefreshToken", () => {
    test("verifyUserByRefreshToken throws error if no user is found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const result =
            userServices.verifyUserByRefreshToken("john@thedoes.com");

        expect(result).rejects.toBeInstanceOf(PlatformError);
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

        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const returnedUser = await userServices.verifyUserByRefreshToken(
            "john@thedoes.com"
        );

        expect(returnedUser).toEqual(user);
    });
});

describe("verifyEmailUniqueness", () => {
    test("verifyEmailUniqueness throws error if user is found", async () => {
        const user: User = {
            _id: new mongoose.Types.ObjectId(),
            email: "john@thedoes.com",
            passwordHash: "passwordHash",
            salt: "salt",
            refreshToken: "refreshToken",
            __v: 0,
        };

        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const result = userServices.verifyEmailUniqueness("john@thedoes.com");

        expect(result).rejects.toBeInstanceOf(PlatformError);
    });

    test("verifyEmailUniqueness returns true if no user is found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const returnedUser = await userServices.verifyEmailUniqueness(
            "jogn@thedoes.com"
        );

        expect(returnedUser).toEqual(undefined);
    });
});

describe("addUser", () => {
    test("addUser returns added user", async () => {
        const user: User = {
            _id: new mongoose.Types.ObjectId(),
            email: "john@thedoes.com",
            passwordHash: "passwordHash",
            salt: "salt",
            refreshToken: "refreshToken",
            __v: 0,
        };

        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);
        (UserModel.create as jest.Mock).mockReturnValueOnce(userMongoDocument);
        (bcrypt.genSaltSync as jest.Mock).mockReturnValueOnce("salt");
        (bcrypt.hash as jest.Mock).mockReturnValueOnce("hashedPassword");

        const returnedUser = await userServices.addUser("email", "password");

        expect(returnedUser).toEqual(user);
    });

    test("addUser returns error when user is found and email is not unique", async () => {
        const user: User = {
            _id: new mongoose.Types.ObjectId(),
            email: "john@thedoes.com",
            passwordHash: "passwordHash",
            salt: "salt",
            refreshToken: "refreshToken",
            __v: 0,
        };

        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const result = userServices.addUser("email", "password");

        expect(result).rejects.toBeInstanceOf(PlatformError);
    });
});

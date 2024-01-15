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
import globalsConfig from "../../src/configs/globals.config";

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
    permissions: [globalsConfig.PERMISSIONS.GET_SUSPEND_USER],
    __v: 0,
};

describe("getUserByEmail", () => {
    test("getUserByEmail returns null if no user is found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const returnedUser = await userServices.getUserByEmail(
            "john@thedoes.com"
        );
        expect(returnedUser).toBe(false);
    });

    test("getUserByEmail returns user if user is found", async () => {
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

describe("getUserByResetPasswordToken", () => {
    test("getUserByResetPasswordToken returns null if no user is found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const returnedUser = await userServices.getUserByResetPasswordToken(
            "resetPasswordToken"
        );
        expect(returnedUser).toBe(false);
    });

    test("getUserByResetPasswordToken returns user if user is found", async () => {
        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const returnedUser = await userServices.getUserByResetPasswordToken(
            "resetPasswordToken"
        );
        expect(returnedUser).toEqual(user);
    });
});

describe("updateUserLastLoginAt", () => {
    test("updateUserLastLoginAt throws error if no user is found", async () => {
        (UserModel.findOneAndUpdate as jest.Mock).mockReturnValueOnce(null);

        const result = userServices.updateUserLastLoginAt(user, new Date());

        expect(result).rejects.toBeInstanceOf(PlatformError);
    });

    test("updateUserLastLoginAt returns user if user is found", async () => {
        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOneAndUpdate as jest.Mock).mockReturnValueOnce(
            userMongoDocument
        );

        const returnedUser = await userServices.updateUserLastLoginAt(
            user,
            new Date()
        );
        expect(returnedUser).toEqual(user);
    });
});

describe("updateUserPasswordByResetPasswordToken", () => {
    test("updateUserPasswordByResetPasswordToken throws error if no user is found", async () => {
        (UserModel.findOneAndUpdate as jest.Mock).mockReturnValueOnce(null);
        (bcrypt.genSaltSync as jest.Mock).mockReturnValueOnce("salt");
        (bcrypt.hashSync as jest.Mock).mockReturnValueOnce("hash");

        const result = userServices.updateUserPasswordByResetPasswordToken(
            "resetPasswordToken",
            "password"
        );

        expect(result).rejects.toBeInstanceOf(PlatformError);
    });

    test("updateUserPasswordByResetPasswordToken returns user if user is found", async () => {
        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOneAndUpdate as jest.Mock).mockReturnValueOnce(
            userMongoDocument
        );
        (bcrypt.genSaltSync as jest.Mock).mockReturnValueOnce("salt");
        (bcrypt.hashSync as jest.Mock).mockReturnValueOnce("hash");

        const returnedUser =
            await userServices.updateUserPasswordByResetPasswordToken(
                "resetPasswordToken",
                "password"
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

describe("verifyUserByResetPasswordToken", () => {
    test("verifyUserByResetPasswordToken throws error if no user is found", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        const result =
            userServices.verifyUserByResetPasswordToken("resetPasswordToken");

        expect(result).rejects.toBeInstanceOf(PlatformError);
    });

    test("verifyUserByResetPasswordToken returns user if user is found", async () => {
        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const returnedUser = await userServices.verifyUserByResetPasswordToken(
            "resetPasswordToken"
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
        const userMongoDocument = {
            toObject: jest.fn().mockReturnValueOnce(user),
        };

        (UserModel.findOne as jest.Mock).mockReturnValueOnce(userMongoDocument);

        const result = userServices.addUser("email", "password");

        expect(result).rejects.toBeInstanceOf(PlatformError);
    });
});

describe("updateUserPermissionsAppend", () => {
    test("updateUserPermissionsAppend returns the merged uniquePermissions", async () => {
        (UserModel.findOne as jest.Mock).mockReturnValueOnce(null);

        expect(
            await userServices.updateUserPermissionsAdd(user, [
                globalsConfig.PERMISSIONS.SET_SUSPEND_USER,
            ])
        ).toEqual([
            globalsConfig.PERMISSIONS.GET_SUSPEND_USER,
            globalsConfig.PERMISSIONS.SET_SUSPEND_USER,
        ]);
    });
});

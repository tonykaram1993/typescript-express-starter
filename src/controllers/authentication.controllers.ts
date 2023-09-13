import { RequestHandler } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

// Schemas
import authenticationSigninSchema from "../validation/schemas/authentication/signin.schema";
import authenticationSignupSchema from "../validation/schemas/authentication/signup.schema";
import authenticationForgotPasswordRequestSchema from "../validation/schemas/authentication/forgotPasswordRequest.schema";
import authenticationForgotPasswordResetSchema from "../validation/schemas/authentication/forgotPasswordReset.schema";

// Services
import userServices from "../services/user.services";
import authenticationServices from "../services/authentication.services";

// Models
import { User } from "../models/User.model";

// Configs
import stringsConfig from "../configs/strings.config";

const signin: RequestHandler = async (request, response) => {
    const {
        body: { email, password },
    } = request as z.infer<typeof authenticationSigninSchema>;

    const user = await userServices.verifyUserByEmail(email);
    authenticationServices.checkUserPassword(user, password);

    const updatedUser = await userServices.updateUserLastLoginAt(
        user,
        new Date()
    );

    const safeUser = authenticationServices.getSafeUserData(updatedUser);
    const jwtToken = authenticationServices.generateJwtToken(updatedUser);
    const refreshToken = await authenticationServices.generateRefreshToken(
        updatedUser
    );

    response
        .status(StatusCodes.OK)
        .json({ user: safeUser, jwtToken, refreshToken });
};

const signout: RequestHandler = async (request, response) => {
    const user: User = request.user;

    authenticationServices.deleteRefreshToken(user);
    authenticationServices.forceUserToLogin(user.email);

    response.status(StatusCodes.NO_CONTENT).end();
};

const signup: RequestHandler = async (request, response) => {
    const {
        body: { email, password },
    } = request as z.infer<typeof authenticationSignupSchema>;

    const user = await userServices.addUser(email, password);

    const safeUser = authenticationServices.getSafeUserData(user);
    const jwtToken = authenticationServices.generateJwtToken(user);
    const refreshToken = await authenticationServices.generateRefreshToken(
        user
    );

    response
        .status(StatusCodes.OK)
        .json({ user: safeUser, jwtToken, refreshToken });
};

const refresh: RequestHandler = async (request, response) => {
    const user: User = request.user;

    const safeUser = authenticationServices.getSafeUserData(user);
    const jwtToken = authenticationServices.generateJwtToken(user);
    const newRefreshToken = await authenticationServices.generateRefreshToken(
        user
    );

    response
        .status(StatusCodes.OK)
        .json({ user: safeUser, jwtToken, refreshToken: newRefreshToken });
};

const forgotPasswordRequest: RequestHandler = async (request, response) => {
    const {
        body: { email },
    } = request as z.infer<typeof authenticationForgotPasswordRequestSchema>;

    await userServices.verifyUserByEmail(email);

    const resetPasswordToken =
        await authenticationServices.generateResetPasswordToken(email);

    /**
     * ! IMPORTANT
     * ! Here, instead of returning the resetPasswordToken in the response, you should send an email to the
     * ! user containing the resetPasswordToken. But since this is just a demo, I'm returning the
     * ! resetPasswordToken in the response.
     */
    response.status(StatusCodes.OK).json({ resetPasswordToken });
};

const forgotPasswordReset: RequestHandler = async (request, response) => {
    const {
        body: { resetPasswordToken, password },
    } = request as z.infer<typeof authenticationForgotPasswordResetSchema>;

    await userServices.updateUserPasswordByResetPasswordToken(
        resetPasswordToken,
        password
    );

    response
        .status(StatusCodes.OK)
        .json({ message: stringsConfig.MESSAGES.PASSWORD_RESET_SUCCESSFUL });
};

export default {
    signin,
    signup,
    signout,
    refresh,
    forgotPasswordRequest,
    forgotPasswordReset,
};

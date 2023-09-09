import { RequestHandler } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

// Schemas
import authenticationSigninSchema from "../validation/schemas/authentication/signin.schema";
import authenticationSignupSchema from "../validation/schemas/authentication/signup.schema";

// Services
import userServices from "../services/user.services";
import authenticationServices from "../services/authentication.services";

// Models
import { User } from "../models/User.model";

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

export default {
    signin,
    signup,
    signout,
    refresh,
};

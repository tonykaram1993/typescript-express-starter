import { RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

// Schemas
import { AddPermissionsRequest } from "../validation/schemas/user/addPermissions.schema";
import { RemovePermissionsRequest } from "../validation/schemas/user/removePermissions.schema";
import { GetPermissionsRequestHandler } from "../validation/schemas/user/getPermissions.schema";

// Services
import userServices from "../services/user.services";

const addPermissions: RequestHandler = async (
    request: AddPermissionsRequest,
    response: Response
) => {
    const {
        body: { permissions, email },
    } = request;

    const targetUser = await userServices.verifyUserByEmail(email);
    userServices.updateUserPermissionsAdd(targetUser, permissions);

    response.status(StatusCodes.NO_CONTENT).end();
};

const removePermissions: RequestHandler = async (
    request: RemovePermissionsRequest,
    response: Response
) => {
    const {
        body: { permissions, email },
    } = request;

    const targetUser = await userServices.verifyUserByEmail(email);
    userServices.updateUserPermissionsSubtract(targetUser, permissions);

    response.status(StatusCodes.NO_CONTENT).end();
};

const getPermissions: GetPermissionsRequestHandler = async (
    request,
    response
) => {
    const {
        query: { email },
    } = request;

    const targetUser = await userServices.verifyUserByEmail(email);

    response
        .status(StatusCodes.OK)
        .send({ permissions: targetUser.permissions });
};

export default {
    addPermissions,
    removePermissions,
    getPermissions,
};

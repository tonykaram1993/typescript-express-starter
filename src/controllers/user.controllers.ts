import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

// Schemas
import addPermissionPostSchema from "../validation/schemas/user/addPermissions.schema";

// Services
import userServices from "../services/user.services";

const addPermissions: RequestHandler = async (request, response) => {
    const {
        body: { permissions, email },
    } = request as z.infer<typeof addPermissionPostSchema>;

    const targetUser = await userServices.verifyUserByEmail(email);
    userServices.updateUserPermissionsAppend(targetUser, permissions);

    response.status(StatusCodes.NO_CONTENT).end();
};

export default {
    addPermissions,
};

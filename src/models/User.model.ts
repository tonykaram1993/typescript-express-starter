import { Schema, Types, model } from "mongoose";

// Types
import UserPermission from "../validation/types/user/UserPermission.type";

// Configs
import globalsConfig from "../configs/globals.config";

export type User = {
    // Required
    email: string;
    passwordHash: string;
    salt: string;
    isForcedToLogin: boolean;
    incorrectPasswordAttempts: number;
    permissions: UserPermission[];

    // Optional
    refreshToken?: string;
    resetPasswordToken?: string;
    lastLoginAt?: Date;

    // MongoDB properties
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};

const userSchema = new Schema<User>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        permissions: [
            {
                type: String,
                required: true,
                enum: Object.values(globalsConfig.PERMISSIONS),
                default: [],
            },
        ],
        refreshToken: String,
        resetPasswordToken: String,
        isForcedToLogin: {
            type: Boolean,
            default: false,
        },
        incorrectPasswordAttempts: {
            type: Number,
            default: 0,
        },
        lastLoginAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default model<User>("User", userSchema);

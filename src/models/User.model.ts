import { Schema, Types, model } from "mongoose";

export type User = {
    // Required
    email: string;
    passwordHash: string;
    salt: string;
    isForcedToLogin: boolean;
    incorrectPasswordAttempts: number;

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

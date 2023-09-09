import { Schema, Types, model } from "mongoose";

export type User = {
    _id: Types.ObjectId;
    email: string;
    passwordHash: string;
    salt: string;
    refreshToken?: string;
    resetPasswordToken?: string;
    lastLoginAt?: Date;
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
        lastLoginAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default model<User>("User", userSchema);

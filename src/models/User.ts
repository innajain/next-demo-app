import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

export type UserType = {
    _id: string;
    email: string;
    password: string;
    username: string;
};

const userSchema = new Schema<UserType>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcryptjs.hash(
        this.password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    next();
});

export const User =
    mongoose.models.User || mongoose.model<UserType>("User", userSchema);

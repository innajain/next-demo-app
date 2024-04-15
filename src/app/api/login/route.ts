import { NextRequest, NextResponse } from "next/server";
import { LoginResponseType } from "./_helpers/types";
import { doSanityChecks } from "./_helpers/doSanityChecks";
import { connectDb } from "@/db/db";
import { User, UserType } from "@/models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();
export async function POST(
    req: NextRequest
): Promise<NextResponse<LoginResponseType>> {
    const { email, password } = (await req.json().catch(() => ({}))) as {
        email: string;
        password: string;
    };

    const check = doSanityChecks({ email, password });
    if (check !== "success") {
        return NextResponse.json(
            {
                message: check,
            },
            { status: 400 }
        );
    }

    // check if user with email exists
    const user: UserType | null = await User.findOne({ email });
    if (!user) {
        return NextResponse.json(
            {
                message: "User with email does not exist",
            },
            { status: 404 }
        );
    }

    // check if wrong password

    if (!bcryptjs.compareSync(password, user.password)) {
        return NextResponse.json(
            {
                message: "Wrong password",
            },
            { status: 409 }
        );
    }
    const verifyToken = jwt.sign(
        {
            email: user.email,
            username: user.username,
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1m",
        }
    );

    const res: NextResponse<LoginResponseType> = NextResponse.json({
        message: "Login success",
        data: {
            user: {
                email: user.email,
                username: user.username,
                id: user._id,
            },
        },
    });
    res.cookies.set("token", verifyToken, {
        httpOnly: true,
    });
    return res;
}

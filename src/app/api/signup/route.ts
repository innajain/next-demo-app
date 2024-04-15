import { NextRequest, NextResponse } from "next/server";
import { SignupRequestType, SignupResponseType } from "./_helpers/types";
import { doSignupSanityChecks } from "./_helpers/doSignupSanityChecks";
import { User, UserType } from "@/models/User";
import jwt from "jsonwebtoken";
import { connectDb } from "@/db/db";

connectDb();

export async function POST(
    req: NextRequest
): Promise<NextResponse<SignupResponseType>> {
    const { email, password, username } = (await req
        .json()
        .catch(() => ({}))) as SignupRequestType;

    const check = doSignupSanityChecks({ email, password, username });
    if (check !== "success") {
        return NextResponse.json(
            {
                message: check,
            },
            { status: 400 }
        );
    }

    let createdUser: UserType;
    try {
        const userByEmail: UserType | null = await User.findOne({ email });
        if (userByEmail) {
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                { status: 409 }
            );
        }
        const userByUsername: UserType | null = await User.findOne({
            username,
        });
        if (userByUsername) {
            return NextResponse.json(
                {
                    message: "Username already exists",
                },
                { status: 409 }
            );
        }

        // create user
        const user = new User({ email, password, username });
        await user.save();
        createdUser = user;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Could not create user: Unknown internal server error",
            },
            { status: 500 }
        );
    }

    const verifyToken = jwt.sign(
        {
            email: createdUser.email,
            username: createdUser.username,
            id: createdUser._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1m",
        }
    );

    const res: NextResponse<SignupResponseType> = NextResponse.json({
        message: "Signup success",
        data: {
            user: {
                email,
                username,
                id: createdUser._id,
            },
        },
    });

    res.cookies.set("token", verifyToken, { httpOnly: true });

    return res;
}

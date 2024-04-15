import { NextRequest, NextResponse } from "next/server";
import { UserResponseType } from "./_helpers/types";

export async function GET(
  req: NextRequest
): Promise<NextResponse<UserResponseType>> {
  const verifyToken = req.cookies.get("verifyToken")?.value;

  if (!verifyToken) {
    return NextResponse.json({
      message: "Invalid verify token",
    });
  }

  // find user by verifyToken
  if (false) {
    return NextResponse.json({
      message: "User not found",
    });
  }

  return NextResponse.json({
    message: "User info fetched",
    data: {
      user: {
        email: "sdfsdf",
        password: "sdfsdf",
        username: "sdfsdf",
      },
    },
  });
}

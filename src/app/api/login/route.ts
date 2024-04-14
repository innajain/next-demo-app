import { NextRequest, NextResponse } from "next/server";
import { LoginResponseType } from "./_helpers/types";
import { doSanityChecks } from "./_helpers/doSanityChecks";

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
  if (false) {
    return NextResponse.json(
      {
        message: "User with email does not exist",
      },
      { status: 404 }
    );
  }

  // check if wrong password
  if (false) {
    return NextResponse.json(
      {
        message: "Wrong password",
      },
      { status: 409 }
    );
  }

  return NextResponse.json({
    message: "Login success",
    data: {
      verifyToken: "some-verify token",
    },
  });
}

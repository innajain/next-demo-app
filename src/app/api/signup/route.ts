import { NextRequest, NextResponse } from "next/server";
import { SignupRequestType, SignupResponseType } from "./_helpers/types";
import { doSignupSanityChecks } from "./_helpers/doSignupSanityChecks";

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

  // check if email NOT already exists
  if (false) {
    return NextResponse.json(
      {
        message: "Email already exists",
      },
      { status: 409 }
    );
  }

  // check if username NOT already exists
  if (false) {
    return NextResponse.json(
      {
        message: "Username already exists",
      },
      { status: 409 }
    );
  }

  // create user
  if (false) {
    return NextResponse.json(
      {
        message: "Could not create user: Unknown internal server error",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Signup success",
    data: {
      verifyToken: "some-verify token",
      user: {
        email,
        password,
        username,
      },
    },
  });
}

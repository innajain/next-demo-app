import { LoginErrorMessage, LoginRequestType } from "./types";

export function doSanityChecks({
  email,
  password,
}: LoginRequestType): LoginErrorMessage | "success" {
  if (!email || !password) {
    return "Email and password are required";
  }
  if (!email.includes("@")) {
    return "Invalid email: must contain @ symbol";
  }

  return "success";
}

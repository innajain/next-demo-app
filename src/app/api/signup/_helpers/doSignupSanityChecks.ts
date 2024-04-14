import {
  SignupErrorMessage,
  SignupRequestType,
  SignupResponseType,
  SignupSanityErrorMessage,
} from "./types";

export function doSignupSanityChecks({
  email,
  password,
  username,
}: SignupRequestType): SignupSanityErrorMessage | "success" {
  if (!email || !password || !username) {
    return "Email, password, and username are required";
  }
  if (!email.includes("@")) {
    return "Invalid email: must contain @ symbol";
  }
  if (password.length < 6) {
    return "Invalid password: Password must be at least 6 characters long";
  }
  if (username.length < 3) {
    return "Invalid username: Username must be at least 3 characters long";
  }

  return "success";
}

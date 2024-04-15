import { UserType } from "@/models/User";

export type UserResponseType = UserSuccessResponse | UserErrorResponse;

type UserSuccessResponse = {
  message: "User info fetched";
  data: {
    user: UserType;
  };
};

type UserErrorResponse = {
  message: UserErrorMessage;
  data?: undefined;
};

export type UserErrorMessage =
  | "User not found"
  | "Invalid verify token"
  | "Unknown internal server error";

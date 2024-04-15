import { UserType } from "@/models/User";

export type SignupRequestType = {
    email: string;
    password: string;
    username: string;
};

export type SignupResponseType = SignupSuccessResponse | SignupErrorResponse;

type SignupSuccessResponse = {
    message: "Signup success";
    data: {
        user: {
            email: string;
            username: string;
            id: string;
        };
    };
};

type SignupErrorResponse = {
    message: SignupErrorMessage;
    data?: undefined;
};

export type SignupErrorMessage =
    | SignupSanityErrorMessage
    | SignupBadRequestErrorMessage
    | SignupDbErrorMessage;

export type SignupSanityErrorMessage =
    | "Email, password, and username are required"
    | "Invalid email: must contain @ symbol"
    | "Invalid password: Password must be at least 6 characters long"
    | "Invalid username: Username must be at least 3 characters long";

export type SignupBadRequestErrorMessage =
    | "Email already exists"
    | "Username already exists";

type SignupDbErrorMessage =
    "Could not create user: Unknown internal server error";

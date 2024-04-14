export type LoginRequestType = {
  email: string;
  password: string;
};

export type LoginResponseType = LoginSuccessResponse | LoginErrorResponse;

type LoginSuccessResponse = {
  message: "Login success";
  data: {
    verifyToken: string;
  };
};

type LoginErrorResponse = {
  message: LoginErrorMessage;
  data?: undefined;
};

export type LoginErrorMessage =
  | "Email and password are required"
  | "Invalid email: must contain @ symbol"
  | "User with email does not exist"
  | "Wrong password";

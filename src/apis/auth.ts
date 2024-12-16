import fetchCall from "./fetchCall";
import { ApiResponse, LoginData } from "../type/types";
import { SignInInputs } from "../components/SignInForm";
import { UserEmailValues } from "../components/FindForm";
import { DuplicateResponse, SignUpInputs } from "../components/SignUpForm";

// singIn
interface LoginResponse {
  result: "SUCCESS" | "FAIL";
  errors: null | string;
  data: LoginData;
}

interface LoginResponseHeaders {
  headers: {
    access: string;
  };
  data: LoginResponse;
}

// signUp
interface AxiosResponse {
  data: DuplicateResponse;
}

// 인증 관련
export const authApi = {
  login: (data: SignInInputs): Promise<LoginResponseHeaders> => {
    return fetchCall("/login", "post", {
      email: data.email,
      password: data.password,
    });
  },

  signUp: (data: SignUpInputs): Promise<AxiosResponse> => {
    return fetchCall("/api/v1/users", "post", {
      email: data.email,
      password: data.password,
      username: data.username,
      phone: data.phone,
      nickname: data.nickname,
    });
  },

  resetPassword: (data: UserEmailValues): Promise<ApiResponse<void>> => {
    return fetchCall("/api/v1/users/reset-password", "post", data);
  },
};

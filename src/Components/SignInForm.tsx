import { useState } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { STORAGE_KEYS } from "../constants/STORAGE_KEYS";
import { useAuthStore } from "../store/authStore";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { ERROR, VALIDATION } from "../constants/MESSAGE";
import { ApiErrorResponse } from "../type/types";
import { authApi } from "../apis/auth";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: VALIDATION.EMPTY_EMAIL })
    .email({ message: VALIDATION.INVALID_EMAIL }),
  password: z
    .string()
    .min(1, { message: VALIDATION.EMPTY_PASSWORD })
    .min(8, { message: VALIDATION.INVALID_PASSWORD }),
});

export type SignInInputs = z.infer<typeof schema>;

const SignIn = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputs>({
    resolver: zodResolver(schema),
    mode: "onSubmit", // 제출 시에만 유효성 검사
    reValidateMode: "onSubmit", // 재검증도 제출 시에만
  });

  useAuthStore(state => state.setAccessToken);

  const onSubmit: SubmitHandler<SignInInputs> = async data => {
    try {
      const response = await authApi.login(data);

      // 응답 데이터 처리
      // header 정보 불러오기 여기를 response 찍어보고 수정하기
      const { result, data: responseData } = response.data;
      const accessToken = response.headers.access;
      console.log(result, accessToken);
      if (result === "SUCCESS" && accessToken) {
        console.log("로그인 성공:", response.data);

        // LocalStorage에 정보 저장
        localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
        // setAccessToken(accessToken);
        localStorage.setItem(STORAGE_KEYS.USER_ID, String(responseData.id));
        localStorage.setItem(
          STORAGE_KEYS.PROFILE_CHECK,
          String(responseData.profileCheck),
        );

        if (responseData?.profileCheck) {
          window.location.href = "/";
        } else {
          window.location.href = "/mypage/profile-create";
        }
      } else {
        throw new Error("로그인에 실패했습니다");
      }
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      setError("root", {
        type: "manual",
        message:
          apiError.response?.status === 403
            ? "탈퇴한 회원입니다."
            : ERROR.SIGNIN,
      });
    }
  };

  const getErrorMessage = () => {
    if (errors.root) return errors.root.message;
    if (errors.email) return errors.email.message;
    if (errors.password) return errors.password.message;
    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="form-control w-full">
        <label htmlFor="signIn-email" className="label">
          <span className="label-text">이메일</span>
        </label>
        <input
          id="signIn-email"
          type="email"
          placeholder="이메일을 입력하세요"
          className="input input-bordered w-full"
          {...register("email")}
        />
      </div>

      <div className="form-control w-full">
        <label htmlFor="signIn-password" className="label">
          <span className="label-text">비밀번호</span>
        </label>
        <div className="relative">
          <input
            id="signIn-password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            className="input input-bordered w-full"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 btn-sm btn-circle"
          >
            {showPassword ? (
              <LuEye className="w-5 h-5" />
            ) : (
              <LuEyeOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="text-right">
        <Link to={"/find"} className="link link-hover">
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      <div className="min-h-[20px] text-error text-xs ">
        {getErrorMessage()}
      </div>

      <button
        type="submit"
        className="btn btn-success text-white w-full"
        disabled={isSubmitting}
      >
        로그인
      </button>

      <div className="divider"></div>

      <div className="text-center">
        <span>아직 회원이 아니신가요? </span>
        <Link to={"/signUp"} className="link link-hover text-custom-green">
          회원가입
        </Link>
      </div>
    </form>
  );
};

export default SignIn;

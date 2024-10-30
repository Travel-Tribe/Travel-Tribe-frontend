import { useState } from "react";
import EyeIcon from "../assets/icons/visibility.svg";
import EyeOffIcon from "../assets/icons/visibility_off.svg";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해 주세요" })
    .email({ message: "올바른 이메일 형식이 아닙니다" }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해 주세요" })
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다" }),
});

type Inputs = z.infer<typeof schema>;

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onSubmit", // 제출 시에만 유효성 검사
    reValidateMode: "onSubmit", // 재검증도 제출 시에만
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const response = await axios.post("/login", data);

      // access 토큰을 응답 헤더에서 가져와서 localStorage에 저장
      const accessToken = response.headers["access"];
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      // 응답 데이터 처리
      const { result, data: responseData } = response.data;

      if (result === "SUCCESS") {
        console.log("로그인 성공:", response.data);

        if (responseData.profileCheck) {
          navigate("/");
        } else {
          navigate("/api/v1/users/${responseData.id}/profile");
        }
      } else {
        throw new Error("로그인에 실패했습니다");
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("root", {
            message:
              error.response.data.errors ||
              "이메일 또는 비밀번호가 올바르지 않습니다",
          });
        } else {
          setError("root", {
            message: "로그인 중 오류가 발생했습니다",
          });
        }
      }
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
        <label className="signIn-password">
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
            <img
              src={showPassword ? EyeIcon : EyeOffIcon}
              alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            />
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
        className="btn bg-custom-green hover:bg-custom-green text-white w-full"
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

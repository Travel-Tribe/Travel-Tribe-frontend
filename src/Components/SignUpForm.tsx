import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import fetchCall from "../Utils/apiFetch";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다" }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/, {
        message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다",
      }),
    passwordConfirm: z.string(),
    username: z.string().min(2, { message: "이름은 2자 이상이어야 합니다" }),
    phone: z.string().regex(/^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/, {
      message: "올바른 전화번호 형식이 아닙니다",
    }),
    nickname: z
      .string()
      .min(2, { message: "닉네임은 2자 이상이어야 합니다" })
      .max(10, { message: "닉네임은 10자 이하여야 합니다" })
      .regex(/^[가-힣a-zA-Z0-9]+$/, {
        message: "닉네임은 한글, 영문, 숫자만 사용 가능합니다",
      }),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type Inputs = z.infer<typeof schema>;

interface ValidationStatus {
  isChecked: boolean;
  isAvailable: boolean;
  isChecking: boolean;
}

interface ApiResponse {
  result: "SUCCESS" | "FAIL";
  errors: null | string;
  data: boolean | string;
}

// Axios 응답 타입 (필요한 필드만 포함)
interface AxiosResponse {
  data: ApiResponse;
}

const SignUp = (): JSX.Element => {
  // 중복 검사 상태
  const [validationStatus, setValidationStatus] = useState<{
    email: ValidationStatus;
    nickname: ValidationStatus;
  }>({
    email: { isChecked: false, isAvailable: false, isChecking: false },
    nickname: { isChecked: false, isAvailable: false, isChecking: false },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange", // 실시간 검사
  });

  const [currentEmail, currentNickname] = watch(["email", "nickname"]);

  // 이메일, 닉네임 변경 시 중복 검사 상태 초기화
  useEffect(() => {
    setValidationStatus(prev => ({
      ...prev,
      email: { ...prev.email, isChecked: false, isAvailable: false },
    }));
  }, [currentEmail]);

  useEffect(() => {
    setValidationStatus(prev => ({
      ...prev,
      nickname: { ...prev.nickname, isChecked: false, isAvailable: false },
    }));
  }, [currentNickname]);

  // 이메일 중복 검사
  const handleDuplicateCheck = async (
    type: "email" | "nickname",
    value: string,
  ) => {
    if (!value || errors[type]) return;

    setValidationStatus(prev => ({
      ...prev,
      [type]: { ...prev[type], isChecking: true },
    }));

    try {
      const response = await fetchCall<ApiResponse>(
        `/api/v1/users/duplicate?type=${type}&query=${encodeURIComponent(value)}`,
        "get",
      );

      console.log("Response:", response.data.data);
      // true면 중복, false면 사용가능
      if (response.data.data) {
        setError(type, {
          type: "manual",
          message: `이미 사용 중인 ${
            type === "email" ? "이메일" : "닉네임"
          }입니다`,
        });
        setValidationStatus(prev => ({
          ...prev,
          [type]: { isChecked: true, isAvailable: false, isChecking: false },
        }));
      } else {
        clearErrors(type);
        setError(type, {
          type: "success",
          message: `사용 가능한 ${
            type === "email" ? "이메일" : "닉네임"
          }입니다`,
        });
        setValidationStatus(prev => ({
          ...prev,
          [type]: { isChecked: true, isAvailable: true, isChecking: false },
        }));
      }
    } catch (error) {
      console.error("중복 검사 중 에러 발생:", error);
      setError(type, {
        type: "manual",
        message: "중복 확인 중 오류가 발생했습니다",
      });
      setValidationStatus(prev => ({
        ...prev,
        [type]: { isChecked: true, isAvailable: false, isChecking: false },
      }));
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    // 모든 필수 검증이 완료되었는지 확인
    const { email, nickname } = validationStatus;
    if (!email.isAvailable || !nickname.isAvailable) {
      alert("이메일 중복 검사와 닉네임 중복 검사를 모두 완료해주세요.");
      return;
    }

    // 필요한 필드만 선택하여 새 객체 생성
    const submitData = {
      email: data.email,
      password: data.password,
      username: data.username,
      phone: data.phone,
      nickname: data.nickname,
    };

    // TODO: 실제 회원가입 API 호출
    try {
      const response = await fetchCall<AxiosResponse>(
        "/api/v1/users",
        "post",
        submitData,
      );

      console.log("회원가입", response);

      if (response.data.result === "SUCCESS") {
        alert("회원가입이 완료되었습니다.");
        navigate("/signIn"); // 로그인 페이지로 이동
      } else {
        throw new Error(
          response.data.errors || "회원가입 처리 중 문제가 발생했습니다.",
        );
      }
    } catch (error) {
      console.error("회원가입 중 에러 발생:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }

    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-control w-full">
        <label htmlFor="signUp-email" className="label">
          <span className="label-text">이메일</span>
          <button
            type="button"
            className="btn btn-xs text-gray-400"
            onClick={() => handleDuplicateCheck("email", currentEmail)}
            disabled={
              !currentEmail ||
              !!errors.email ||
              validationStatus.email.isChecking
            }
          >
            {validationStatus.email.isChecking ? "확인 중..." : "중복검사"}
          </button>
        </label>
        <input
          id="signUp-email"
          type="email"
          autoComplete="username"
          placeholder="이메일을 입력하세요"
          className="input input-bordered w-full"
          {...register("email")}
        />
        <span
          className={`text-xs h-1 mt-1 ${
            errors.email?.type === "success" ? "text-success" : "text-error"
          }`}
        >
          {errors.email && errors.email.message}
        </span>
      </div>

      {/* 비밀번호 */}
      <div className="form-control w-full">
        <label htmlFor="signUp-password" className="label">
          <span className="label-text">비밀번호</span>
        </label>
        <input
          id="signUp-password"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 입력하세요"
          className="input input-bordered w-full"
          {...register("password")}
        />
        <span className="text-error text-xs h-1 mt-1">
          {errors.password && errors.password.message}
        </span>
      </div>

      <div className="form-control w-full">
        <label htmlFor="signUp-password-confirm" className="label">
          <span className="label-text">비밀번호 확인</span>
        </label>
        <input
          id="signUp-password-confirm"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 입력하세요"
          className="input input-bordered w-full"
          {...register("passwordConfirm")}
        />
        <span className="text-error text-xs h-1 mt-1">
          {errors.passwordConfirm && errors.passwordConfirm.message}
        </span>
      </div>

      {/* 이름 */}
      <div className="form-control w-full">
        <label htmlFor="signUp-username" className="label">
          <span className="label-text">이름</span>
        </label>
        <input
          id="signUp-username"
          type="text"
          autoComplete="name"
          placeholder="사용자 이름을 입력하세요"
          className="input input-bordered w-full"
          {...register("username")}
        />
        <span className="text-error text-xs h-1 mt-1">
          {errors.username && errors.username.message}
        </span>
      </div>

      {/* 전화번호 */}
      <div className="form-control w-full">
        <label htmlFor="signUp-phone" className="label">
          <span className="label-text">전화번호</span>
          <button
            className="btn btn-xs bg-custom-pink text-white hover:bg-custom-pink-hover"
            onClick={() => {}}
          >
            인증하기
          </button>
        </label>
        <input
          id="signUp-phone"
          type="tel"
          autoComplete="tel"
          placeholder="예시: 010-1234-5678 ('-' 포함하여 입력)"
          maxLength={13}
          className="input input-bordered w-full"
          {...register("phone")}
        />
        <span className="text-error text-xs h-1 mt-1">
          {errors.phone && errors.phone.message}
        </span>
      </div>

      {/* 닉네임 */}
      <div className="form-control w-full">
        <label htmlFor="signUp-nickname" className="label">
          <span className="label-text">닉네임</span>
          <button
            type="button"
            className="btn btn-xs text-gray-400"
            onClick={() => handleDuplicateCheck("nickname", currentNickname)}
            disabled={
              !currentNickname ||
              !!errors.nickname ||
              validationStatus.nickname.isChecking
            }
          >
            {validationStatus.nickname.isChecking ? "확인 중..." : "중복검사"}
          </button>
        </label>
        <input
          id="signUp-nickname"
          type="text"
          autoComplete="off"
          placeholder="사용할 닉네임을 입력하세요"
          className="input input-bordered w-full"
          {...register("nickname")}
        />
        <span
          className={`text-xs h-1 mt-1 ${
            errors.nickname?.type === "success" ? "text-success" : "text-error"
          }`}
        >
          {errors.nickname && errors.nickname.message}
        </span>
      </div>

      <button
        type="submit"
        className="btn bg-custom-green hover:bg-custom-green text-white w-full"
        disabled={isSubmitting}
      >
        가입하기
      </button>

      <div className="divider"></div>

      <div className="text-center">
        <span>이미 계정이 있으신가요? </span>
        <Link to={"/signIn"} className="link link-hover text-custom-green">
          로그인
        </Link>
      </div>
    </form>
  );
};

export default SignUp;

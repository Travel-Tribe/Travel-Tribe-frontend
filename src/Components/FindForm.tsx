import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const userSchema = z.object({
  nickname: z
    .string()
    .min(1, "닉네임을 입력해주세요")
    .max(20, "닉네임은 20자 이내로 입력해주세요"),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  verificationCode: z
    .string()
    .length(6, "인증번호는 6자리여야 합니다")
    .regex(/^\d+$/, "숫자만 입력 가능합니다")
    .optional(),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다")
      .regex(/[A-Za-z]/, "영문을 포함해야 합니다")
      .regex(/[0-9]/, "숫자를 포함해야 합니다")
      .regex(/[^A-Za-z0-9]/, "특수문자를 포함해야 합니다"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

type UserFormValues = z.infer<typeof userSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const FindForm = () => {
  const [step, setStep] = useState<"verification" | "reset">("verification");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register: userRegister,
    handleSubmit: handleUserSubmit,
    formState: { errors: userErrors, isSubmitting: userIsSubmitting },
    setError: setUserError,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: passwordIsSubmitting },
    setError: setPasswordError,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  // const sendVerificationCode = async (data: UserFormValues) => {
  //   try {
  //     const response = await axios.get("api/v1/users");
  //     const { result, data: userData } = response.data;

  //     if (result === "SUCCESS" && userData) {
  //       if (
  //         userData.nickname === data.nickname &&
  //         userData.email === data.email
  //       ) {
  //         setIsCodeSent(true);
  //       } else {
  //         throw new Error("닉네임 또는 이메일이 일치하지 않습니다");
  //       }
  //     } else {
  //       throw new Error("존재하지 않는 회원정보입니다");
  //     }
  //   } catch (error) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : "인증에 실패했습니다";
  //     setUserError("nickname", { type: "manual", message: errorMessage });
  //   }
  // };

  // 테스트 용도
  const sendVerificationCode = async () => {
    setIsCodeSent(true);
  };

  const onVerificationStep = async (data: UserFormValues) => {
    try {
      if (data.verificationCode) {
        setStep("reset");
      }
    } catch (error) {
      console.error(error);
      setUserError("verificationCode", {
        type: "manual",
        message: "잘못된 인증번호입니다",
      });
    }
  };

  // const onPasswordSubmit = async (data: PasswordFormValues) => {
  //   try {
  //     await axios.post("api/v1/users/password", data);
  //     setSuccess(true);
  //   } catch (error) {
  //     console.error(error);
  //     setPasswordError("password", {
  //       type: "manual",
  //       message: "비밀번호 변경에 실패했습니다.",
  //     });
  //   }
  // };

  // 테스트 용도
  const onPasswordSubmit = () => {
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="card-body items-center text-center">
        <h2 className="card-title text-success">비밀번호 변경 완료!</h2>
        <p>새로운 비밀번호로 로그인해주세요.</p>
        <div className="card-actions">
          <button
            className="btn bg-custom-green text-white hover:bg-custom-green"
            onClick={() => (window.location.href = "/signIn")}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {step === "verification" ? (
        <form
          onSubmit={handleUserSubmit(onVerificationStep)}
          className="space-y-4"
        >
          <div className="form-control w-full">
            <label htmlFor="find-nickname">
              <span className="label-text">닉네임</span>
            </label>
            <input
              id="find-nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              className="input input-bordered w-full"
              {...userRegister("nickname")}
            />
            <span className="text-error text-xs h-1 mt-1">
              {userErrors.nickname?.message}
            </span>
          </div>
          <div className="form-control w-full">
            <label htmlFor="find-email">
              <span className="label-text">이메일</span>
            </label>
            <input
              id="find-email"
              type="email"
              placeholder="이메일을 입력하세요"
              autoComplete="email"
              className="input input-bordered w-full"
              {...userRegister("email")}
            />
            <span className="text-error text-xs h-1 mt-1">
              {userErrors.email?.message}
            </span>
          </div>
          <div className="form-control w-full">
            <label htmlFor="verificationCode">
              <span className="label-text">인증번호</span>
            </label>
            <div className="flex gap-2 items-center">
              <input
                id="verificationCode"
                type="text"
                placeholder="6자리 인증번호"
                maxLength={6}
                className="input input-bordered flex-1"
                disabled={!isCodeSent}
                {...userRegister("verificationCode")}
              />
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleUserSubmit(sendVerificationCode)}
                disabled={userIsSubmitting}
              >
                인증번호 받기
              </button>
            </div>

            <span className="text-xs text-error h-1 mt-1">
              {userErrors.verificationCode?.message}
            </span>
          </div>
          <button
            type="submit"
            className="btn bg-custom-green text-white hover:bg-custom-green w-full"
            disabled={userIsSubmitting || !isCodeSent}
          >
            {userIsSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "다음"
            )}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          <div className="form-control w-full">
            <label className="new-password">
              <span className="label-text">새 비밀번호</span>
            </label>
            <input
              id="new-password"
              type="password"
              placeholder="새 비밀번호"
              autoComplete="password"
              className="input input-bordered w-full"
              {...passwordRegister("password")}
            />
            <span className="text-error text-xs h-1 mt-1">
              {passwordErrors.password?.message}
            </span>
          </div>
          <div className="form-control w-full">
            <label className="new-passwordConfirm">
              <span className="label-text">비밀번호 확인</span>
            </label>
            <input
              id="new-passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              className="input input-bordered w-full"
              {...passwordRegister("confirmPassword")}
            />
            <span className="text-error text-xs h-1 mt-1">
              {passwordErrors.confirmPassword?.message}
            </span>
          </div>

          <button
            type="submit"
            className="btn bg-custom-green text-white hover:bg-custom-green w-full"
            disabled={passwordIsSubmitting}
          >
            {passwordIsSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "비밀번호 변경"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default FindForm;

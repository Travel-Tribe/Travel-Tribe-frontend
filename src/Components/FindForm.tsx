import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";
import { ERROR, VALIDATION } from "../Constants/message";
import { authApi } from "../apis/auth";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(VALIDATION.INVALID_EMAIL),
});

export type UserEmailValues = z.infer<typeof userSchema>;

const FindForm = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<UserEmailValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserEmailValues) => {
    try {
      const response = await authApi.resetPassword(data);

      console.log(response);

      if (response.data.result === "SUCCESS") {
        setSuccess(true);
      } else {
        setError("root", {
          type: "manual",
          message: ERROR.FIND_PASSWORD,
        });
      }
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: ERROR.DEFAULT,
      });
    }
  };

  if (success) {
    return (
      <div className="card-body items-center text-center">
        <h2 className="card-title text-success">임시 비밀번호 발송 완료!</h2>
        <p>이메일로 발송된 임시 비밀번호로 로그인해주세요.</p>
        <div className="card-actions">
          <button
            className="btn bg-custom-green text-white hover:bg-custom-green"
            onClick={() => navigate("/signIn")}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {...register("email", {
            onChange: () => {
              clearErrors("root"); // 입력 변경 시 root 에러 메시지 제거
            },
          })}
        />
        <span className="text-error text-xs h-1 mt-1">
          {errors.email?.message || errors.root?.message}
        </span>
      </div>
      <button
        type="submit"
        className="btn bg-custom-green text-white hover:bg-custom-green w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "임시 비밀번호 발급"
        )}
      </button>
    </form>
  );
};

export default FindForm;

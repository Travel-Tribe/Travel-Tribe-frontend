import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import fetchCall from "../Utils/apiFetch";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
});

type UserEmailValues = z.infer<typeof userSchema>;

interface ApiResponse {
  result: "SUCCESS" | "FAIL";
  errors: null | string;
  data: null | string;
}

const FindForm = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserEmailValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserEmailValues) => {
    try {
      const response = await fetchCall<ApiResponse>(
        "/api/v1/users/reset-password",
        "post",
        data,
      );

      if (response.result === "SUCCESS") {
        setSuccess(true);
      } else if (response.errors) {
        setError("root", {
          type: "manual",
          message: response.errors,
        });
      }
    } catch (error) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: "입력하신 정보와 일치하는 계정을 찾을 수 없습니다.",
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
          {...register("email")}
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

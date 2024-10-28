import { FormEvent, useState } from "react";
import EyeIcon from "../assets/icons/visibility.svg";
import EyeOffIcon from "../assets/icons/visibility_off.svg";

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("이메일을 입력해 주세요.");
      return;
    }

    if (!password) {
      setError("비밀번호를 입력해 주세요.");
      return;
    }
    // TODO: 실제 로그인 로직 구현
    console.log("로그인:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center">
            로그인
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">비밀번호</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <a className="link link-hover">비밀번호를 잊으셨나요?</a>
            </div>

            <div className="text-error text-xs h-3">{error}</div>

            <button
              type="submit"
              className="btn bg-custom-green hover:bg-custom-green text-white w-full"
            >
              로그인
            </button>

            <div className="divider"></div>

            <div className="text-center">
              <span>아직 회원이 아니신가요? </span>
              <a className="link link-hover text-custom-green">회원가입</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

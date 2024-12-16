import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";

const SignIn = (): JSX.Element => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg flex-col">
      <h1 className="text-4xl font-bold mb-8">
        <Link to={"/"}>여행족</Link>
      </h1>
      <div className="card w-full max-w-md bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center">
            로그인
          </h2>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

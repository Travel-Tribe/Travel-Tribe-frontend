import SignUpForm from "../Components/SignUpForm";

const SignUp = (): JSX.Element => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center">
            회원가입
          </h2>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

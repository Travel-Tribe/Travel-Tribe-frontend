import { Link } from "react-router-dom";
import FindForm from "../components/FindForm";

const Find = (): JSX.Element => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg flex-col">
      <h1 className="text-4xl font-bold mb-8">
        <Link to={"/"}>여행족</Link>
      </h1>
      <div className="card w-full max-w-md bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center">
            비밀번호 찾기
          </h2>
          <FindForm />
        </div>
      </div>
    </div>
  );
};

export default Find;

import Preview from "../components/recruitWrite/Preview";
import RecruitForm from "../components/recruitWrite/RecruitForm";

const RecruitWrite = (): JSX.Element => {
  return (
    <div className="flex overflow-hidden h-[100vh]">
      <div className="w-[50%] min-w-[600px] max-w-[50%] mx-auto relative">
        <RecruitForm />
      </div>
      <div className="bg-[#DEDEDE] w-[50%] min-w-[512px] overflow-y-scroll hidden lg:block">
        <Preview />
      </div>
    </div>
  );
};

export default RecruitWrite;

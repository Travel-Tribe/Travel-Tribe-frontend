import Btns from "../Components/RecruitWrite/Btns";
import Preview from "../Components/RecruitWrite/Preview";
import RecruitForm from "../Components/RecruitWrite/RecruitForm";
import { TravelDataProvider } from "../Context/TravelDataProvider";

const RecruitWrite = (): JSX.Element => {
  return (
    <div className="flex overflow-hidden h-[100vh]">
      <TravelDataProvider>
        <div className="w-[50%] min-w-[600px] max-w-[50%]">
          <RecruitForm />
        </div>

        <div className="bg-[#DEDEDE] w-[50%] min-w-[512px] overflow-y-scroll hidden lg:block">
          <Preview />
        </div>

        <Btns />
      </TravelDataProvider>
    </div>
  );
};

export default RecruitWrite;

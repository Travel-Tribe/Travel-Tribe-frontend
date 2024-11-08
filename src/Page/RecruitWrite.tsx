import RecruitForm from "../Components/RecruitWrite/RecruitForm";
import { TravelDataProvider } from "../Context/TravelDataProvider";

const RecruitWrite = (): JSX.Element => {
  return (
    <div className="flex overflow-hidden h-[100vh]">
      <TravelDataProvider>
        <div className="w-[50%]">
          {/* 전체 컨테이너 */}
          <RecruitForm />
          {/* 전체 컨테이너 끝 */}
        </div>

        <div className="bg-[#DEDEDE] w-[50%] min-w-[512px] overflow-y-scroll hidden lg:block">
          {/* 오른쪽 콘텐츠 */}
        </div>

        <div
          className="
				fixed bottom-0 left-0 w-[50%] min-w-[540px] h-[80px] 
				shadow-[0_4px_18px_rgba(0,0,0,0.25)] bg-white
				flex items-center justify-between"
        >
          <div className="invisible ml-[10px]">
            <button className="btn w-[130px] h-[35px] bg-custom-pink text-white mr-[30px]">
              글 삭제하기
            </button>
          </div>
          <div className="mr-[10px]">
            <button className="btn w-[130px] h-[35px] bg-custom-pink text-white mr-[30px]">
              취소하기
            </button>
            <button className="btn w-[130px] h-[35px] bg-custom-green text-white">
              등록하기
            </button>
          </div>
        </div>
      </TravelDataProvider>
    </div>
  );
};

export default RecruitWrite;

import { COUNTRY_DATA } from "../Constants/COUNTRY_DATA";

const RecruitForm = (): JSX.Element => {
  return (
    <div className="flex overflow-hidden h-[100vh]">
      <div className="w-[50%]">
        {/* 전체 컨테이너 */}
        <div
          className="w-[90%] min-w-[512px] mt-[30px] mx-auto overflow-y-scroll"
          style={{ height: "calc(100% - 100px)" }}
        >
          {/* 기본 정보 */}
          <div className="mb-[30px]">
            <h2 className="text-[24px] font-bold">기본 정보</h2>
            <div className="w-full h-[1px] bg-black my-2"></div>

            {/* 제목 입력 */}
            <div className="flex items-center mb-2">
              <p className="text-[18px] mr-2">제목:</p>
              <input
                type="text"
                placeholder="제목을 입력해주세요."
                className="w-[400px] h-[24px] px-2 truncate border border-gray-300 rounded-sm"
              />
            </div>

            {/* 모집인원 */}
            <div className="flex items-center mb-2">
              <p className="text-[18px] mr-2">모집인원:</p>
              <select className="select select-sm  w-[60px] text-[16px] border border-gray-300 rounded-sm px-2">
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* 여행 시작 날짜 */}
            <div className="flex items-center mb-2">
              <p className="text-[18px] mr-2">여행 시작 날짜:</p>
              <select className="select select-sm  w-[80px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2">
                <option value="2024">2024</option>
              </select>
              년
              <select className="select select-sm  w-[60px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2">
                <option value="12">12</option>
              </select>
              월
              <select className="select select-sm w-[60px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2">
                <option value="25">25</option>
              </select>
              일
            </div>

            {/* 여행 종료 날짜 */}
            <div className="flex items-center mb-2">
              <p className="text-[18px] mr-2">여행 종료 날짜:</p>
              <select className="select select-sm  w-[80px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2">
                <option value="2024">2024</option>
              </select>
              년
              <select className="select select-sm  w-[60px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2">
                <option value="12">12</option>
              </select>
              월
              <select className="select select-sm w-[60px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2">
                <option value="25">25</option>
              </select>
              일
            </div>

            {/* 여행지 선택 */}
            <div className="flex items-center mb-2">
              <p className="text-[18px] mr-2">여행지:</p>
              <select className="select select-sm w-[120px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2">
                {Object.keys(COUNTRY_DATA).map(continent => (
                  <option key={continent} value={continent}>
                    {continent}
                  </option>
                ))}
              </select>
              <select className="select select-sm w-[120px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2">
                {Object.keys(COUNTRY_DATA["아시아"]).map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 참여 조건 */}
          <div className="mb-[30px]">
            <h2 className="text-[24px] font-bold">참여 조건</h2>
            <div className="w-full h-[1px] bg-black my-2"></div>

            {/* 나이 */}
            <div className="flex items-center mb-2">
              <p className="text-[18px] mr-2">나이:</p>
              <select className="select select-sm  w-[60px] text-[16px] border border-gray-300 rounded-sm px-2">
                {[...Array(99)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              ~
              <select className="select select-sm  w-[60px] text-[16px] border border-gray-300 rounded-sm px-2">
                {[...Array(99)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* 성별 */}
            <div className="flex items-center mb-2">
              <p className="text-[18px] mr-2">성별 :</p>
              <select className="select select-sm  w-[80px] text-[16px] border border-gray-300 rounded-sm px-2">
                <option value="UNRELATED">무관</option>
                <option value="MALE">남자</option>
                <option value="FEMALE">여자</option>
              </select>
            </div>

            {/* 흡연 여부 */}
            <div className="flex items-center mb-2">
              <p className="text-[18px] mr-2">흡연 여부:</p>
              <select className="select select-sm  w-[100px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2">
                <option value="UNRELATED">무관</option>
                <option value="NO">비흡현자</option>
              </select>
            </div>
          </div>
          {/* 참여 기초 예상 비용 */}
          <div className="mb-[30px]">
            <h2 className="text-[24px] font-bold">예상 비용</h2>
            <div className="w-full h-[1px] bg-black my-2"></div>

            <ul className="list-disc pl-4">
              <li className="mb-[10px]">
                <p className="text-[18px] mr-2">숙박비:</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-sm w-[100px] px-2 text-[16px]"
                />
              </li>
              <li className="mb-[10px]">
                <p className="text-[18px] mr-2">항공권:</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-sm w-[100px] px-2 text-[16px]"
                />
              </li>
              <li className="mb-[10px]">
                <p className="text-[18px] mr-2">기타비용:</p>
                <input
                  type="text"
                  className="border border-gray-300 rounded-sm w-[100px] px-2 text-[16px]"
                />
              </li>
              <p className="text-[18px] mr-2">비용: 계산 금액</p>
            </ul>
          </div>
          {/* 여행 일정 */}
        </div>
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
    </div>
  );
};

export default RecruitForm;

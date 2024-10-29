const MaPage = (): JSX.Element => {
  return (
    <div className="w-[1150px] mx-auto mt-[100px] flex bg-gray-100 p-5">
      {/* 사이드바 */}
      <div className="w-[280px] h-[348px] bg-white border border-black flex flex-col pt-5 mr-2">
        <div className="h-[42px] flex items-center bg-custom-green">
          <span className="ml-5">프로필</span>
        </div>
        <div className="h-[42px] flex items-center">
          <span className="ml-5">다녀온 여행</span>
        </div>
        <div className="h-[42px] flex items-center">
          <span className="ml-5">여행 후기</span>
        </div>
        <div className="h-[42px] flex items-center">
          <span className="ml-5">계정 설정</span>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="w-[860px] ml-2 bg-white">
        <div className="w-[600px] my-5 mx-auto">
          {/* 프로필 조회 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {/* <img className="w-12 h-12 rounded-full" src={profileImg} /> */}
              <div className="w-12 h-12 rounded-full"></div>
              <div className="flex flex-col ml-5 text-xs space-y-1">
                <div className="flex items-center">
                  <span className="mr-1">닉네임</span>님
                </div>
                <div className="flex items-center space-x-5">
                  <span>26세</span>
                  <span>남자</span>
                  {/* <Grade /> */}
                  <span>(4.6/5.0)</span>
                  <span>비흡연</span>
                </div>
              </div>
            </div>
            <div className="w-16 h-5 bg-green-300 text-white text-center text-xs rounded-lg flex items-center justify-center">
              infp
            </div>
          </div>

          <div className="text-sm my-10">
            자기소개를 입력해주세요자기소개를 입력해주세요자기소개를
            입력해주세요자기소개를 입력해주세요자기소개를 입력해주세요자기소개를
            입력해주세요자기소개를 입력해주세요자기소개를 입력해주세요자기소개를
            입력해주세요자기소개를 입력해주세요148
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-bold">가능 언어</h4>
            <div className="flex space-x-2 mt-2">
              <div className="w-16 h-5 text-xs rounded-lg bg-green-300 text-white text-center flex items-center justify-center">
                영어
              </div>
              <div className="w-16 h-5 text-xs rounded-lg bg-green-300 text-white text-center flex items-center justify-center">
                일본어
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-bold">다녀온 국가</h4>
            <div className="flex space-x-2 mt-2">
              <div className="w-16 h-5 text-xs rounded-lg bg-green-300 text-white text-center flex items-center justify-center">
                일본
              </div>
              <div className="w-16 h-5 text-xs rounded-lg bg-green-300 text-white text-center flex items-center justify-center">
                미국
              </div>
            </div>
          </div>

          <div className="flex">
            <button className="w-[560px] h-[42px] mt-8 mb-2 rounded-lg border border-green-300 text-green-300 bg-white mx-auto">
              프로필 수정
            </button>
          </div>

          {/* 모집글 조회 */}
          <div className="border-b border-gray-300 flex justify-between items-center mt-10 mb-4 pb-1.5">
            <div className="flex items-center">
              <h2 className="mr-2">여행 모집</h2>
              <span className="text-lg">4</span>
            </div>
            <button className="w-[120px] h-[38px] bg-custom-green text-white rounded-lg mr-5">
              모집글 작성
            </button>
          </div>
          <ul className="space-y-6">
            <li className="list-none">
              <div className="w-[600px] h-[86px] bg-custom-green rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-white text-xl mt-3.5 ml-2.5">
                    모집글 제목
                  </h3>
                  <span className="text-white text-base mt-[18px] mr-[18px]">
                    마감 7일전
                  </span>
                </div>
                <div className="flex items-center m-2.5 space-x-8">
                  <div className="w-[66px] h-[28px] text-white bg-pink-300 rounded-lg text-center flex items-center justify-center">
                    프랑스
                  </div>
                  <span className="text-white">참여인원 4/6</span>
                  <span className="text-white">
                    2024-10-23(목) ~ 2024-10-30(목)
                  </span>
                </div>
              </div>
            </li>
          </ul>
          {/* 신청글 내역 */}
          <div className="border-b border-gray-300 flex justify-between items-center py-4">
            <div className="flex items-center">
              <h2 className="text-xl mr-2">여행 신청</h2>
              <span className="text-lg">4</span>
            </div>
          </div>

          <ul className="mt-10 space-y-6">
            <li className="list-none">
              <div className="bg-custom-green rounded-lg w-[600px] h-[86px]">
                <div className="flex justify-between mb-2">
                  <h3 className="text-white text-xl mt-3.5 ml-2.5">
                    신청글 제목
                  </h3>
                  <span className="text-white text-base mt-[18px] mr-[18px]">
                    마감 7일전
                  </span>
                </div>
                <div className="flex items-center space-x-4 m-2.5">
                  <div className="bg-pink-300 text-white w-[66px] h-[28px] rounded-lg text-center flex items-center justify-center">
                    프랑스
                  </div>
                  <span className="text-white text-sm">참여인원 4/6</span>
                  <span className="text-white text-sm">
                    2024-10-23(목) ~ 2024-10-30(목)
                  </span>
                  <div className="bg-white text-green-500 border border-green-500 w-[66px] h-[28px] rounded-lg text-center text-sm flex items-center justify-center">
                    모집중
                  </div>
                  <div className="bg-white border border-gray-500 w-[90px] h-[28px] rounded-md text-center flex items-center justify-center">
                    취소하기
                  </div>
                </div>
              </div>
            </li>
            <li className="list-none">
              <div className="bg-custom-green rounded-lg w-[600px] h-[86px]">
                <div className="flex justify-between mb-2">
                  <h3 className="text-white text-xl mt-3.5 ml-2.5">
                    신청글 제목
                  </h3>
                  <span className="text-white text-base mt-[18px] mr-[18px]">
                    마감 7일전
                  </span>
                </div>
                <div className="flex items-center space-x-4 ml-2">
                  <div className="bg-pink-300 text-white w-[66px] h-[28px] rounded-lg text-center flex items-center justify-center">
                    프랑스
                  </div>
                  <span className="text-white text-sm">참여인원 4/6</span>
                  <span className="text-white text-sm">
                    2024-10-23(목) ~ 2024-10-30(목)
                  </span>
                  <div className="bg-white text-red-500 border border-red-500 w-[66px] h-[28px] rounded-lg text-center text-sm flex items-center justify-center">
                    모집 완료
                  </div>
                  <div className="bg-white border border-gray-500 w-[90px] h-[28px] rounded-md text-center  flex items-center justify-center">
                    취소하기
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MaPage;

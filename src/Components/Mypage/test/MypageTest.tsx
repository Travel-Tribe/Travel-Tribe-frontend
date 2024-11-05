import SidebarTest from "./SidebarTest";
import MyRecruitTest from "./MyRecruitTest";
import profileImg from "../../../assets/profileImg.webp";

const MypageTest = () => {
  return (
    <div className="min-h-screen bg-custom-bg">
      <div className="flex max-w-[1240px] mx-auto px-5">
        {/* Sidebar */}
        <SidebarTest />

        <main className="ml-[60px] py-5">
          {/* Profile Card */}
          <section className="w-[660px] p-8 bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center">
                <img className="w-16 h-16 rounded-full" src={profileImg} />
                <div className="ml-5">
                  <span className="block text-lg font-bold">닉네임</span>
                  <div className="flex items-center space-x-5">
                    <span>세</span>
                    <span>남자</span>
                    <span className="flex items-center">
                      {/* <img src={GradeIcon} /> */}⭐
                      <span className="ml-1">
                        (0.0
                        {/* {profileData.ratingAvg === undefined ||
                  profileData.ratingAvg === null
                    ? (0).toFixed(1)
                    : profileData.ratingAvg} */}
                        /5.0)
                      </span>
                    </span>
                    <span>
                      흡연
                      {/* {profileData.smoking === "NO" ? "비흡연" : "흡연"} */}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`py-0.5 px-2 bg-custom-gray text-white text-center text-base rounded-xl flex items-center justify-center`}
              >
                INFP
              </div>
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-5"
              placeholder="안녕하세요."
              readOnly
            />
            <div className="mb-5">
              <h3 className="font-bold mb-2">가능 언어</h3>
              <div className="flex gap-2">
                <span className="badge bg-red-100 text-red-500">영어</span>
                <span className="badge bg-red-100 text-red-500">일본어</span>
                <span className="badge bg-red-100 text-red-500">중국어</span>
              </div>
            </div>
            <div className="mb-5">
              <h3 className="font-bold mb-2">다녀온 국가</h3>
              <div className="flex gap-2">
                <span className="badge bg-purple-100 text-purple-500">
                  일본
                </span>
                <span className="badge bg-blue-100 text-blue-500">스페인</span>
                <span className="badge bg-orange-100 text-orange-500">
                  이집트
                </span>
              </div>
            </div>
            <button className="w-full btn border border-custom-teal-green text-custom-teal-green bg-white hover:text-white hover:bg-custom-teal-green hover:border-none">
              프로필 수정
            </button>
          </section>

          {/* 여행 후기 */}
          <MyRecruitTest />
        </main>
      </div>
    </div>
  );
};
export default MypageTest;

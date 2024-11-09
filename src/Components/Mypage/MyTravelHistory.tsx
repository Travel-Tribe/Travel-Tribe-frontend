import { FC, useState, useEffect } from "react";
import fetchCall from "../../Utils/apiFetch";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";


interface TravelInfo {
  postId: string;
  reviewId: string;
  continent: string;
  country: string;
  region: string;
  title: string;
  contents: string;
  fileAddress: string | null;
  travelStartDate?: string;
  travelEndDate?: string;
}

const MyTravelHistory: FC = () => {
  const [travelInfos, setTravelInfos] = useState<TravelInfo[]>([]);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

  const fetchReviewInfos = async (
    title?: string,
    content?: string,
    continent?: string,
    country?: string,
  ) => {
    try {
      const params = new URLSearchParams();
      if (title) params.append("title", title);
      if (content) params.append("content", content);
      if (continent) params.append("continent", continent);
      if (country) params.append("country", country);
      if (userId) params.append("userId", userId);

      // 쿼리 파라미터를 포함한 URL로 fetchCall 요청
      const reviewResponse = await fetchCall<{ reviews: TravelInfo[] }>(
        `/api/v1/reviews?${params.toString()}`,
        "get",
      );
      
      const reviews = reviewResponse.data.reviews;

      const travelInfosWithDates = await Promise.all(
        reviews.map(async (review: { postId: string }) => {
          const travelResponse = await fetchCall<{
            travelStartDate: string;
            travelEndDate: string;
          }>(`/api/v1/posts/${review.postId}`, "get");

          const travelData = Array.isArray(travelResponse.data)
            ? travelResponse.data[0]
            : travelResponse.data;
          return travelData
            ? {
                ...review,
                travelStartDate: travelData.travelStartDate,
                travelEndDate: travelData.travelEndDate,
              }
            : review;
        }),
      );

      setTravelInfos(travelInfosWithDates);
    } catch (error) {
      console.error("Error fetching user review data:", error);
    }
  };

  useEffect(() => {
    fetchReviewInfos();
  }, []);

  return (
    <main className="flex flex-col w-[660px] ml-[60px] py-5">
      <header className="border-b border-gray-300 flex items-center mt-10 pb-1 space-x-2.5">
        <h2 className="text-3xl">여행 후기</h2>
        <span className="text-lg">{travelInfos.length}</span>
      </header>
      <ul
        className={`mt-10 space-y-6 ${travelInfos.length > 5 ? "w-[680px] h-[660px] overflow-y-auto" : ""}`}
      >
        {travelInfos.map(info => {
          const startDay = info.travelStartDate
            ? week[new Date(info.travelStartDate).getDay()]
            : "";
          const endDay = info.travelEndDate
            ? week[new Date(info.travelEndDate).getDay()]
            : "";

          return (
            <li key={info.reviewId} className="list-none">
              <div className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg">
                <h3 className="text-xl pt-2.5 pl-2.5">{info.title}</h3>
                <div className="flex items-center m-2.5 space-x-8 justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                      <span className="truncate">{info.country}</span>
                    </div>
                    <span>
                      {info.travelStartDate}({startDay}) ~ {info.travelEndDate}(
                      {endDay})
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default MyTravelHistory;

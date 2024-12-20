import { FC, useState, useEffect } from "react";
import fetchCall from "../../apis/fetchCall";
import { STORAGE_KEYS } from "../../constants/STORAGE_KEYS";
import { mappingCountry } from "../../utils/mappingCountry";
import { useNavigate } from "react-router-dom";
import {
  TravelPlanType,
  ApiResponse,
  ReviewType,
  ErrorType,
} from "../../type/types";
import Modal from "../common/Modal";
import { ERROR } from "../../constants/MESSAGE";
import { AxiosError } from "axios";

interface TravelPlanResponse extends ApiResponse<TravelPlanType> {}
interface ReviewResponse extends ApiResponse<{ reviews: ReviewType[] }> {}

const MyTravelHistory: FC = () => {
  const [travelInfos, setTravelInfos] = useState<ReviewType[]>([]);
  const [modalState, setModalState] = useState({ isOpen: false, message: "" });
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const navigate = useNavigate();

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
      const reviewResponse = await fetchCall<ReviewResponse>(
        `/api/v1/reviews?${params.toString()}`,
        "get",
      );

      const reviews = reviewResponse.data.data.reviews;
      const travelInfosWithDates = await Promise.all(
        reviews.map(async review => {
          const travelResponse = await fetchCall<TravelPlanResponse>(
            `/api/v1/posts/${review.postId}`,
            "get",
          );

          const travelData = travelResponse.data.data;

          return {
            ...review,
            travelStartDate: travelData?.travelStartDate,
            travelEndDate: travelData?.travelEndDate,
          };
        }),
      );
      setTravelInfos(travelInfosWithDates);
    } catch (error) {
      console.error(
        "Error fetching user review data:",
        `${ERROR.LOAD_REVIEW} ${(error as AxiosError<ErrorType>).response?.data?.errors[0]?.errorMessage}`,
      );
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

          const travelCountry =
            mappingCountry(info.country, "en") || info.country;

          return (
            <li key={info.reviewId} className="list-none">
              <div
                className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg cursor-pointer"
                onClick={() =>
                  navigate(
                    `/recruitment/${info.postId}/review/${info.reviewId}`,
                  )
                }
              >
                <h3 className="text-xl pt-2.5 pl-2.5">{info.title}</h3>
                <div className="flex items-center m-2.5 space-x-8 justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-custom-red text-white px-[4px] rounded-lg flex items-center justify-center">
                      <span className="truncate">{travelCountry}</span>
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
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        message={modalState.message}
      />
    </main>
  );
};

export default MyTravelHistory;

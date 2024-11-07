import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchCall from "../../Utils/apiFetch";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import Rating from "./Rating";

interface TravelPlan {
  id: string;
  title: string;
  travelStartDate: string;
  travelEndDate: string;
  maxParticipants: number;
  travelCountry: string;
  deadline: string;
}

const MyCompletedTrips = (): JSX.Element => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const [travelInfos, setTravelInfos] = useState<TravelPlan>({
    id: "",
    title: "",
    travelStartDate: "",
    travelEndDate: "",
    maxParticipants: 0,
    travelCountry: "",
    deadline: "",
  });
  // const travelInfos = [
  //   {
  //     travelStartDate: "2024-10-23",
  //     travelEndDate: "2024-10-29",
  //     maxParticipants: 6,
  //     travelCountry: "프랑스",
  //     deadline: "2024-9-28",
  //     title: "도쿄 3박4일 가실 mz들~~",
  //     participantsCount: 6,
  //   },
  //   {
  //     travelStartDate: "2024-10-23",
  //     travelEndDate: "2024-10-29",
  //     maxParticipants: 6,
  //     travelCountry: "프랑스",
  //     deadline: "2024-9-28",
  //     title: "도쿄 3박4일 가실 mz들~~",
  //     participantsCount: 6,
  //   },
  //   {
  //     travelStartDate: "2024-10-23",
  //     travelEndDate: "2024-10-29",
  //     maxParticipants: 6,
  //     travelCountry: "프랑스",
  //     deadline: "2024-9-28",
  //     title: "도쿄 3박4일 가실 mz들~~",
  //     participantsCount: 6,
  //   },
  //   {
  //     travelStartDate: "2024-9-15",
  //     travelEndDate: "2024-9-20",
  //     maxParticipants: 10,
  //     travelCountry: "이탈리아",
  //     deadline: "2024-7-01",
  //     title: "이탈리아 로마투어 같이 가실 분?",
  //     participantsCount: 10,
  //   },
  // ];
  const completedTrips = travelInfos.filter(info => {
    const travelEndDate = new Date(info.travelEndDate);
    return travelEndDate < today;
  });

  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

  useEffect(() => {
    const fetchCompletedTrips = async () => {
      try {
        const response = await fetchCall<TravelPlan>(`/api/v1/posts`, "get");
        console.log("recruit", response);
        setTravelInfos(...response);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchCompletedTrips();
  }, []);

  return (
    <main className="flex flex-col w-[660px] ml-[60px] py-5">
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-3xl mr-2">다녀온 여행들</h2>
          <span className="text-lg">{completedTrips.length}</span>
        </div>
      </div>
      <div>
        <ul
          className={`mt-10 space-y-6 ${
            completedTrips.length > 6 ? "h-[660px] overflow-y-auto" : ""
          }`}
        >
          {completedTrips.map((info, index) => {
            const travelStartDay = new Date(info.travelStartDate).getDay();
            const travelEndDay = new Date(info.travelEndDate).getDay();

            return (
              <li key={index} className="list-none">
                <div className="w-[660px] h-[86px] bg-custom-green rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="text-white text-xl mt-2.5 ml-2.5">
                      {info.title}
                    </h3>
                  </div>
                  <div className="flex items-center m-2.5 space-x-8 justify-between">
                    <div className="flex items-center space-x-4">
                      <div className=" bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                        <span className="truncate">{info.travelCountry}</span>
                      </div>
                      <span className="text-white">
                        참여인원 {info.participantsCount}/{info.maxParticipants}
                      </span>
                      <span className="text-white">
                        {info.travelStartDate}({week[travelStartDay]}) ~{" "}
                        {info.travelEndDate}({week[travelEndDay]})
                      </span>
                    </div>
                    <button
                      className="btn btn-sm rounded-md"
                      onClick={() => setActiveModalIndex(index)}
                    >
                      평점 주기
                    </button>
                    {activeModalIndex === index && (
                      <Rating
                        isOpen={activeModalIndex === index}
                        onClose={() => setActiveModalIndex(null)}
                        participants={info.participantsCount}
                      />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default MyCompletedTrips;

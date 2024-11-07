import { useState, useEffect } from "react";
import fetchCall from "../../Utils/apiFetch";
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
  const [travelInfos, setTravelInfos] = useState<TravelPlan[]>([]);

  const completedTrips = travelInfos.filter((info: TravelPlan) => {
    const travelEndDate = new Date(info.travelEndDate);
    return travelEndDate < today;
  });

  useEffect(() => {
    const fetchCompletedTrips = async () => {
      try {
        const response = await fetchCall<{ post: TravelPlan[] }>(
          `/api/v1/posts`,
          "get",
        );
        setTravelInfos(response.data.post);
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
            completedTrips.length > 6
              ? "w-[680px] h-[660px] overflow-y-auto"
              : ""
          }`}
        >
          {completedTrips.map((info, index) => {
            const travelStartDay = new Date(info.travelStartDate).getDay();
            const travelEndDay = new Date(info.travelEndDate).getDay();

            return (
              <li key={info.id} className="list-none">
                <div className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg">
                  <div className="flex justify-between">
                    <h3 className="text-xl mt-2.5 ml-2.5">{info.title}</h3>
                  </div>
                  <div className="flex items-center m-2.5 space-x-8 justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                        <span className="truncate">{info.travelCountry}</span>
                      </div>
                      <span className="">
                        참여인원 {info.maxParticipants}/{info.maxParticipants}
                      </span>
                      <span className="">
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
                  </div>
                </div>
                {activeModalIndex === index && (
                  <Rating
                    isOpen={activeModalIndex === index}
                    onClose={() => setActiveModalIndex(null)}
                    participants={info.maxParticipants}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default MyCompletedTrips;

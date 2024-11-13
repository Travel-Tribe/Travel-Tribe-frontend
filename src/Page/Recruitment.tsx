import React, { useEffect, useState } from "react";
import fetchCall from "../Utils/apiFetch";
import { TravelPlan } from "../mocks/mockData";
import Post from "../Components/Common/Post";
import { useRecruitPostStore } from "../store/recruitPostStore";

const Recruitment = React.memo((): JSX.Element => {
  const [recruitData, setRecruitData] = useState<TravelPlan[]>([]);
  const { clearTravelData } = useRecruitPostStore();
  useEffect(() => {
    const getRecruitData = async () => {
      try {
        const data: { data: { content: TravelPlan[] } } = await fetchCall(
          "/api/v1/posts",
          "get",
        );

        setRecruitData(data.data.content);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getRecruitData();
    clearTravelData();
  }, []);

  return (
    <div className="flex flex-wrap gap-[35px]">
      {recruitData.map(plan => (
        <Post key={plan.postId} plan={plan} />
      ))}
    </div>
  );
});

export default Recruitment;

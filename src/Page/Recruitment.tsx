import React, { useEffect, useState } from "react";
import fetchCall from "../Utils/apiFetch";
import { TravelPlan } from "../mocks/mockData";
import Post from "../Components/Common/Post";

const Recruitment = React.memo((): JSX.Element => {
  const [recruitData, setRecruitData] = useState<TravelPlan[]>([]);

  useEffect(() => {
    const getRecruitData = async () => {
      try {
        const data: { data: { post: TravelPlan[] } } = await fetchCall(
          "/api/v1/posts",
          "get",
        );

        setRecruitData(data.data.post);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getRecruitData();
  }, []);

  return (
    <div className="flex flex-wrap gap-[35px]">
      {recruitData.map(plan => (
        <Post key={plan.id} plan={plan} />
      ))}
    </div>
  );
});

export default Recruitment;

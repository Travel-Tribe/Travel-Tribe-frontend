import React, { useEffect } from "react";
import Age from "./CrewCondition/Age";
import Gender from "./CrewCondition/Gender";
import Smoke from "./CrewCondition/Smoke";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import { useUserProfile } from "../../Hooks/userQueries";
import { AxiosError } from "axios";
import { ErrorType } from "../../type/types";
import { useRecruitPostStore } from "../../store/recruitPostStore";
import { calculateAge } from "../../Utils/calculateAge";

const CrewCondition = React.memo((): JSX.Element => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);

  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

  const {
    data: userProfile,
    isError: isProfileError,
    error,
  } = useUserProfile(userId!);

  useEffect(() => {
    console.log(userProfile);
    if (userProfile) {
      updateTravelData("limitMinAge", calculateAge(userProfile.birth));
      updateTravelData("limitSex", userProfile.gender);
      updateTravelData("limitSmoke", userProfile.smoking);
    }
  }, [updateTravelData, userProfile]);

  if (isProfileError) {
    console.error(
      "에러",
      (error as AxiosError<ErrorType>).response?.data?.errors[0]?.errorMessage,
    );
    return (
      <>
        {
          (error as AxiosError<ErrorType>).response?.data?.errors[0]
            ?.errorMessage
        }
      </>
    );
  }

  return (
    <div className="mb-[30px]">
      <h2 className="text-[24px] font-bold">참여 조건</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>
      <Age />
      <Gender />
      <Smoke />
    </div>
  );
});

export default CrewCondition;

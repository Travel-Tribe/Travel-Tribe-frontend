import { create } from "zustand";
import { TravelPlanType } from "../type/types";

interface RecruitStoreType {
  postData: TravelPlanType;
  updateTravelData: (
    key: keyof TravelPlanType,
    value: number | string | unknown[] | void,
  ) => void;
  setTravelData: (data: TravelPlanType) => void;
  clearTravelData: () => void;
  updateDays: (numberOfDays: number) => void;
}

export const useRecruitPostStore = create<RecruitStoreType>(set => ({
  postData: {
    title: "",
    travelStartDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    travelEndDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    deadline: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    maxParticipants: 1,
    travelCountry: "선택",
    continent: "선택",
    region: "",
    accommodationFee: 0,
    otherExpenses: 0,
    airplaneFee: 0,
    limitMaxAge: 1,
    limitMinAge: 1,
    limitSex: "무관",
    limitSmoke: "무관",
    days: [
      {
        dayDetails: [{ title: "", description: "", fileAddress: "" }],
        itineraryVisits: [{ latitude: 0, longitude: 0, orderNumber: 0 }],
      },
    ],
    mbti: "",
    nickname: "",
    profileFileAddress: "",
  },
  updateTravelData: (
    key: string | number | symbol,
    value: number | string | void | unknown[],
  ) =>
    set(state => ({
      postData: {
        ...state.postData,
        [key]: value,
      },
    })),
  setTravelData: data => set({ postData: { ...data } }),
  clearTravelData: () =>
    set({
      postData: {
        title: "",
        travelStartDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
        travelEndDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
        deadline: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
        maxParticipants: 1,
        travelCountry: "선택",
        continent: "선택",
        region: "",
        accommodationFee: 0,
        otherExpenses: 0,
        airplaneFee: 0,
        limitMaxAge: 1,
        limitMinAge: 1,
        limitSex: "무관",
        limitSmoke: "무관",
        days: [
          {
            dayDetails: [{ title: "", description: "", fileAddress: "" }],
            itineraryVisits: [{ latitude: 0, longitude: 0, orderNumber: 0 }],
          },
        ],
        mbti: "",
        nickname: "",
        profileFileAddress: "",
      },
    }),
  updateDays: numberOfDays =>
    set(state => {
      let updatedDays = state.postData.days;

      if (numberOfDays < state.postData.days.length) {
        updatedDays = state.postData.days.slice(0, numberOfDays);
      } else if (numberOfDays > state.postData.days.length) {
        const newDays = Array.from(
          { length: numberOfDays - state.postData.days.length },
          () => ({
            dayDetails: [{ title: "", description: "", fileAddress: "" }],
            itineraryVisits: [{ latitude: 0, longitude: 0, orderNumber: 0 }],
          }),
        );
        updatedDays = [...state.postData.days, ...newDays];
      }
      console.log(numberOfDays, updatedDays);
      return {
        postData: {
          ...state.postData,
          days: updatedDays, // postData 내부의 days 업데이트
        },
      };
    }),
}));

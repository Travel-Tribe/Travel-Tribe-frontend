import { create } from "zustand";
import { TravelPlan } from "../mocks/mockData";

interface RecruitPostType {
  postData: TravelPlan;
  updateTravelData: (
    key: keyof TravelPlan,
    value: number | string | unknown[] | void,
  ) => void;
  setTravelData: (data: TravelPlan) => void;
}

export const useRecruitPostStore = create<RecruitPostType>(set => ({
  postData: {
    title: "",
    travelStartDate: `${new Date().getFullYear()}-01-01`,
    travelEndDate: `${new Date().getFullYear()}-01-01`,
    deadline: `${new Date().getFullYear()}-01-01`,
    maxParticipants: 1,
    travelCountry: "",
    continent: "",
    region: "",
    accommodationFee: 0,
    otherExpenses: 0,
    airplaneFee: 0,
    limitMaxAge: 1,
    limitMinAge: 1,
    limitSex: "UNRELATED",
    limitSmoke: "UNRELATED",
    days: [],
  },
  updateTravelData: (key, value) =>
    set(state => ({
      postData: {
        ...state.postData,
        [key]: value,
      },
    })),
  setTravelData: data => set({ postData: data }),
}));

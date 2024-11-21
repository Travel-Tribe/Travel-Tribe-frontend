import { create } from "zustand";
import { TravelPlan } from "../mocks/mockData";

interface RecruitPostType {
  postData: TravelPlan;
  updateTravelData: (
    key: keyof TravelPlan,
    value: number | string | unknown[] | void,
  ) => void;
  setTravelData: (data: TravelPlan) => void;
  clearTravelData: () => void;
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
    limitSex: "무관",
    limitSmoke: "무관",
    days: [],
  },
  updateTravelData: (key: string, value: any) =>
    set(state => ({
      postData: {
        ...state.postData,
        [key]: value,
      },
    })),
  setTravelData: data => set({ postData: data }),
  clearTravelData: () =>
    set({
      postData: {
        title: "",
        travelStartDate: `${new Date().getFullYear()}-1-1`,
        travelEndDate: `${new Date().getFullYear()}-1-1`,
        deadline: `${new Date().getFullYear()}-1-1`,
        maxParticipants: 1,
        travelCountry: "",
        continent: "",
        region: "",
        accommodationFee: 0,
        otherExpenses: 0,
        airplaneFee: 0,
        limitMaxAge: 1,
        limitMinAge: 1,
        limitSex: "무관",
        limitSmoke: "무관",
        days: [],
      },
    }),
}));

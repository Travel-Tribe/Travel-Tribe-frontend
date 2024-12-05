import { create } from "zustand";
import { TravelPlanType } from "../type/types";

interface RecruitPostType {
  postData: TravelPlanType;
  updateTravelData: (
    key: keyof TravelPlanType,
    value: number | string | unknown[] | void,
  ) => void;
  setTravelData: (data: TravelPlanType) => void;
  clearTravelData: () => void;
}

export const useRecruitPostStore = create<RecruitPostType>(set => ({
  postData: {
    title: "",
    travelStartDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    travelEndDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    deadline: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
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
  setTravelData: data => set({ postData: data }),
  clearTravelData: () =>
    set({
      postData: {
        title: "",
        travelStartDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
        travelEndDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
        deadline: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
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

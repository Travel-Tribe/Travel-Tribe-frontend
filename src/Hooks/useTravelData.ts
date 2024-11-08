import { useContext } from "react";
import { TravelDataContext } from "../Context/TravelDataProvider";

export const useTravelData = () => {
  const context = useContext(TravelDataContext);
  if (!context) {
    throw new Error("없는 변수입니다.");
  }
  return context;
};

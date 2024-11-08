import { createContext, useState, ReactNode } from "react";
import { TravelPlan } from "../mocks/mockData";

interface TravelDataContextType {
  travelData: TravelPlan;
  updateTravelData: (key: keyof TravelPlan, value: any) => void;
}

export const TravelDataContext = createContext<
  TravelDataContextType | undefined
>(undefined);

// Provider 컴포넌트
export const TravelDataProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [travelData, setTravelData] = useState<TravelPlan>({
    title: "",
    travelStartDate: "",
    travelEndDate: "",
    maxParticipants: 0,
    travelCountry: "",
    continent: "",
    region: "",
    accommodationFee: 0,
    ectFee: 0,
    airplaneFee: 0,
    limitMaxAge: 0,
    limitMinAge: 0,
    limitSex: "",
    limitSmoke: "",
    preferenceType: "",
    deadline: "",
    days: [],
  });

  const updateTravelData = (key: keyof TravelPlan, value: any) => {
    setTravelData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <TravelDataContext.Provider value={{ travelData, updateTravelData }}>
      {children}
    </TravelDataContext.Provider>
  );
};

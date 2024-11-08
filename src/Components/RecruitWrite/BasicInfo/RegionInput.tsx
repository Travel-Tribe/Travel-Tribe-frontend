import React, { useState } from "react";
import { useTravelData } from "../../../Hooks/useTravelData";
import CreatableSelect from "react-select/creatable";

const RegionInput = React.memo((): JSX.Element => {
  const [cities, setCities] = useState<string[]>([]);
  const { updateTravelData } = useTravelData();

  const handleOnItemAdded = (newValue: any) => {
    const newCity = newValue.map(item => item.value);
    setCities(newCity);
    updateTravelData("region", newCity.join(" "));
  };

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">도시:</p>
      <CreatableSelect
        isMulti
        value={cities.map(city => ({
          label: city,
          value: city,
        }))}
        onChange={handleOnItemAdded}
        placeholder="enter키를 통해 연속입력이 가능합니다."
        className="w-[350px]"
      />
    </div>
  );
});

export default RegionInput;

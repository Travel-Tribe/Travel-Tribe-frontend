import React, { useCallback, useState } from "react";
import { useTravelData } from "../../../Hooks/useTravelData";

const RegionInput = React.memo((): JSX.Element => {
  const { updateTravelData } = useTravelData();
  const [cities, setCities] = useState<string[]>([""]);

  const handleCityChange = useCallback(
    (index: number, newCity: string) => {
      const newCities = [...cities];
      newCities[index] = newCity;
      setCities(newCities);
      updateTravelData("region", newCities.join(" "));
    },
    [cities, updateTravelData],
  );

  const handleAddCity = () => {
    setCities([...cities, ""]);
  };

  const handleRemoveCity = (index: number) => {
    const newCities = cities.filter((_, i) => i !== index);
    setCities(newCities);
    updateTravelData("region", newCities.join(","));
  };

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">도시:</p>
      {cities.map((city, index) => (
        <div key={index} className="flex items-center mr-2">
          <input
            type="text"
            className="input input-sm w-[100px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
            placeholder="City"
            value={city}
            onChange={e => handleCityChange(index, e.target.value)}
          />
          <button
            className="flex items-center justify-center text-[16px] w-[20px] h-[20px] mh-auto"
            onClick={() => handleRemoveCity(index)}
          >
            Del
          </button>
        </div>
      ))}
      <button onClick={handleAddCity}>Add</button>
    </div>
  );
});

export default RegionInput;

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { COUNTRY_DATA } from "../../../Constants/COUNTRY_DATA";
import { useTravelData } from "../../../Hooks/useTravelData";
import { mappingContinent } from "../../../Utils/mappingContinent";

const DestinationSelect = React.memo(() => {
  const { updateTravelData } = useTravelData();

  const [continent, setContinent] = useState<string>("아시아");
  const [country, setCountry] = useState<string>("한국");

  useEffect(() => {
    updateTravelData("continent", mappingContinent[continent]);
    updateTravelData("travelCountry", country);
  }, []);

  const availableCountries = useMemo(() => {
    return Object.keys(COUNTRY_DATA[continent]);
  }, [continent]);

  const handleContinentChange = useCallback(
    (selectedContinent: string) => {
      setContinent(selectedContinent);
      const firstCountry = Object.keys(COUNTRY_DATA[selectedContinent])[0];
      setCountry(firstCountry);
      updateTravelData("continent", mappingContinent[selectedContinent]);
      updateTravelData("travelCountry", firstCountry);
    },
    [updateTravelData],
  );

  const handleCountryChange = useCallback(
    (selectedCountry: string) => {
      setCountry(selectedCountry);
      updateTravelData("travelCountry", selectedCountry);
    },
    [updateTravelData],
  );

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">여행지:</p>
      <select
        className="select select-sm focus:outline-custom-green w-[120px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
        value={continent}
        onChange={e => handleContinentChange(e.target.value)}
      >
        {Object.keys(COUNTRY_DATA).map(continentOption => (
          <option key={continentOption} value={continentOption}>
            {continentOption}
          </option>
        ))}
      </select>

      <select
        className="select select-sm focus:outline-custom-green w-[120px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
        value={country}
        onChange={e => handleCountryChange(e.target.value)}
      >
        {availableCountries.map(countryOption => (
          <option key={countryOption} value={countryOption}>
            {countryOption}
          </option>
        ))}
      </select>
    </div>
  );
});

export default DestinationSelect;
